extern crate proc_macro;
#[macro_use]
extern crate quote;

use proc_macro2::*;
use std::fmt::Debug;

#[derive(Debug)]
struct Row(Ident, Ident, Ident, Ident);

fn api_route_inner(item: TokenStream) -> TokenStream {
    let iterator = item.into_iter().clone().collect::<Vec<TokenTree>>();
    let name = iterator[0].clone();
    let name_literal = &iterator[0].clone().to_string();
    let name_dir = format!("/{}", name_literal);
    let name_add = format!("/{}/add", name_literal);
    let name_upd = format!("/{}/upd", name_literal);
    let name_del = format!("/{}/del", name_literal);
    let name_api = format!("/<lang>/{}", name_literal);
    let name_redir = format!("/ui/{}", name_literal);

    let value_group = iterator[1].clone();

    let (delim, stream) = match value_group {
        TokenTree::Group(g) => (g.delimiter(), g.stream()),
        n => panic!("Incorrect syntax at brace => {:?}", n),
    };

    assert_eq!(delim, Delimiter::Brace);
    let splitted = &mut stream.into_iter().clone().collect::<Vec<TokenTree>>()[..]
        .split(|token| {
            if let TokenTree::Punct(p) = token.clone() {
                p.as_char() == ',' && p.spacing() == Spacing::Alone
            } else {
                false
            }
        })
        .map(Vec::from)
        .collect::<Vec<Vec<TokenTree>>>();

    splitted.pop();

    let mut rows: Vec<Row> = vec![];

    for vecs in splitted.into_iter() {
        let mut vals_iter = vecs.split(|token| {
            if let TokenTree::Punct(p) = token.clone() {
                p.as_char() == ':' && p.spacing() == Spacing::Alone
            } else {
                false
            }
        });

        let name = vals_iter.next().unwrap().to_vec();
        let vals = vals_iter.next().unwrap().to_vec();
        let (brack, val_stream) = match vals.get(0).unwrap() {
            TokenTree::Group(g) => (g.delimiter(), g.stream()),
            n => panic!("Incorrect syntax at parenthesis => {:?}", n),
        };
        assert_eq!(brack, Delimiter::Parenthesis);
        assert_eq!(name.len(), 1);
        let name = match name.get(0).unwrap() {
            TokenTree::Ident(g) => g,
            n => panic!("Incorrect syntax at name => {:?}", n),
        };

        let vals = &val_stream.into_iter().clone().collect::<Vec<TokenTree>>()[..]
            .split(|token| {
                if let TokenTree::Punct(p) = token.clone() {
                    p.as_char() == ',' && p.spacing() == Spacing::Alone
                } else {
                    false
                }
            })
            .map(|x| match x.to_vec().get(0).unwrap().clone() {
                TokenTree::Ident(i) => i,
                n => panic!("Incorrect syntax at group => {:?}", n),
            })
            .collect::<Vec<Ident>>();
        rows.push(Row(
            name.clone(),
            vals.get(0).unwrap().clone(),
            vals.get(1).unwrap().clone(),
            vals.get(2).unwrap().clone(),
        ));
    }

    let names_vec = rows
        .iter()
        .map(|x| TokenTree::Ident(x.0.clone()))
        .collect::<Vec<TokenTree>>();

    let schema_value = rows
        .iter()
        .map(|x| TokenTree::Ident(x.1.clone()))
        .collect::<Vec<TokenTree>>();

    let get_value = rows
        .iter()
        .map(|x| TokenTree::Ident(x.2.clone()))
        .collect::<Vec<TokenTree>>();

    let put_value = rows
        .iter()
        .map(|x| TokenTree::Ident(x.3.clone()))
        .collect::<Vec<TokenTree>>();

    let impl_value = rows
        .iter()
        .map(|x| {
            if x.2.to_string() == x.3.to_string() {
                let s = x.0.clone();
                quote! {
                    #s: self.#s,
                }
            } else {
                let s = x.0.clone();
                quote! {
                    #s: *self.#s,
                }
            }
        })
        .collect::<Vec<TokenStream>>()
        .into_iter()
        .map(|x| x.into_iter().collect::<Vec<TokenTree>>())
        .flatten()
        .collect::<Vec<TokenTree>>();

    let impls = quote! {

        impl Post {
            fn convert(self) -> Create {
                Create {
                    lang: self.lang,
                    #(#impl_value)*
                }
            }
        }

        impl Update {
            fn convert(self) -> Create {
                Create {
                    lang: self.lang,
                    #(#impl_value)*
                }
            }
        }
    };

    let schema = quote! {

        pub mod schema {
            table! {
                use diesel::sql_types::*;

                #name (id) {
                    id -> Integer,
                    lang -> Text,
                    #(#names_vec -> #schema_value,)
                    *
                }
            }
        }
    };

    let structs = quote! {

        use schema::#name;

        #[derive(Debug, Clone, Queryable, Serialize)]
        pub struct Get {
            pub id: i32,
            pub lang: String,
            #(pub #names_vec: #get_value),
            *
        }

        #[derive(Debug, AsChangeset, Insertable)]
        #[table_name = #name_literal]
        pub struct Create {
            pub lang: String,
            #(pub #names_vec: #get_value),
            *
        }

        #[derive(Debug, FromForm)]
        pub struct Post {
            pub lang: String,
            #(pub #names_vec: #put_value),
            *
        }

        #[derive(Debug, FromForm)]
        pub struct Update {
            pub id: i32,
            pub lang: String,
            #(pub #names_vec: #put_value),
            *
        }

        #[derive(Debug, FromForm)]
        pub struct Delete {
            pub id: i32,
        }
    };

    let imports = quote! {
        use crate::data::{defs::*, Lang};
        use crate::auth::Token;
        use ::chrono::naive::*;
        use ::diesel::{prelude::*, Insertable, Queryable};
        use ::rocket::{http::Status, request::Form, response::Redirect, State};
        use ::rocket_contrib::{json::Json, templates::Template};
        use ::serde::Serialize;
        use ::std::{collections::*, sync::Mutex};
    };

    let endpoints = quote! {

        pub fn create(conn: &PgConnection, create: Create) -> Result<Get, diesel::result::Error> {
            diesel::insert_into(#name::table)
                .values(&create)
                .get_result(conn)
        }

        pub fn get(conn: &PgConnection, lg: Lang) -> Result<Vec<Get>, diesel::result::Error> {
            use schema::#name::dsl::*;

            #name.filter(lang.eq(lg.0)).load::<Get>(conn)
        }

        pub fn get_all(conn: &PgConnection) -> Result<Vec<Get>, diesel::result::Error> {
            use schema::#name::dsl::*;
            #name.load::<Get>(conn)
        }

        pub fn update(
            conn: &PgConnection,
            idn: i32,
            create: Create,
        ) -> Result<Get, diesel::result::Error> {
            use schema::#name::dsl::*;
            diesel::update(#name.find(idn))
                .set(&create)
                .get_result::<Get>(conn)
        }

        pub fn delete(conn: &PgConnection, idn: i32) -> Result<usize, diesel::result::Error> {
            use schema::#name::dsl::*;
            diesel::delete(#name.find(idn)).execute(conn)
        }

        #[get(#name_api)]
        pub fn api(pg: State<Mutex<PgConnection>>, lang: Lang) -> Result<Json<Vec<Get>>, Status> {
            Ok(Json(
                get(&*(pg.lock().unwrap()), lang).map_err(|_| Status::InternalServerError)?,
            ))
        }

        #[post(#name_add, data = "<form>")]
        pub fn add(_token: Token, pg: State<Mutex<PgConnection>>, form: Form<Post>) -> Result<Redirect, Status> {
            match create(&*(pg.lock().unwrap()), form.into_inner().convert()) {
                Ok(_) => Ok(Redirect::to(#name_redir)),
                Err(_) => Err(Status::InternalServerError),
            }
        }

        #[post(#name_del, data = "<form>")]
        pub fn del(_token: Token, pg: State<Mutex<PgConnection>>, form: Form<Delete>) -> Result<Redirect, Status> {
            match delete(&*(pg.lock().unwrap()), form.id) {
                Ok(_) => Ok(Redirect::to(#name_redir)),
                Err(_) => Err(Status::InternalServerError),
            }
        }

        #[post(#name_upd, data = "<form>")]
        pub fn upd(_token: Token, pg: State<Mutex<PgConnection>>, form: Form<Update>) -> Result<Redirect, Status> {
            match update(&*(pg.lock().unwrap()), form.id, form.into_inner().convert()) {
                Ok(_) => Ok(Redirect::to(#name_redir)),
                Err(_) => Err(Status::InternalServerError),
            }
        }

        #[get(#name_dir)]
        pub fn ui(_token: Token, pg: State<Mutex<PgConnection>>) -> Result<Template, Status> {
            let ctx = get_all(&*(pg.lock().unwrap()))
                .map_err(|_| Status::InternalServerError)?
                .iter()
                .map(|x| (x.id, x.clone()))
                .collect::<HashMap<i32, Get>>();
            Ok(Template::render(#name_literal, &ctx))
        }
    };

    let tok = quote! {
        pub mod #name {
            #imports
            #schema
            #structs
            #impls
            #endpoints
        }
    };

    tok.into()
}

#[proc_macro]
pub fn api_route(item: proc_macro::TokenStream) -> proc_macro::TokenStream {
    api_route_inner(TokenStream::from(item)).into()
}
