use cms_macro::api_route;
use rocket::{
    http::{RawStr, Status},
    request::FromParam,
};
use std::borrow::Cow;

pub struct Lang<'a>(Cow<'a, str>);

fn valid_lang(lang: &str) -> bool {
    lang.chars().all(|c| (c >= 'a' && c <= 'z')) && lang.chars().count() == 2
}

impl<'a> FromParam<'a> for Lang<'a> {
    type Error = Status;
    fn from_param(param: &'a RawStr) -> Result<Lang<'a>, Status> {
        match valid_lang(param) {
            true => Ok(Lang(Cow::Borrowed(param))),
            false => Err(Status::InternalServerError),
        }
    }
}

pub mod defs {
    use chrono::naive::NaiveDate;
    use rocket::{http::RawStr, request::FromFormValue};
    use std::ops::Deref;

    #[derive(Debug)]
    pub struct DateForm(NaiveDate);

    impl Deref for DateForm {
        type Target = NaiveDate;

        fn deref(&self) -> &NaiveDate {
            &self.0
        }
    }

    impl<'v> FromFormValue<'v> for DateForm {
        type Error = ();

        fn from_form_value(value: &'v RawStr) -> Result<DateForm, ()> {
            let value_uri = match value.url_decode() {
                Ok(n) => n,
                Err(_) => return Err(()),
            };
            let naivedate = NaiveDate::parse_from_str(&value_uri[..], "%m/%d/%Y");
            match naivedate {
                Ok(n) => Ok(DateForm(n)),
                Err(_) => Err(()),
            }
        }
    }
}

api_route! {
    events {
        title: (Text, String, String),
        location: (Text, String, String),
        text: (Text, String, String),
        event_date: (Date, NaiveDate, DateForm),
    }
}

