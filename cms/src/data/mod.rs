use rocket::{
    http::{RawStr, Status},
    request::FromParam,
};
use std::borrow::Cow;

use cms_macro::api_route;

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
    use chrono::naive::{NaiveDate, NaiveTime};
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

    #[derive(Debug)]
    pub struct TimeForm(NaiveTime);

    impl Deref for TimeForm {
        type Target = NaiveTime;

        fn deref(&self) -> &NaiveTime {
            &self.0
        }
    }

    impl<'v> FromFormValue<'v> for TimeForm {
        type Error = ();

        fn from_form_value(value: &'v RawStr) -> Result<TimeForm, ()> {
            let value_uri = match value.url_decode() {
                Ok(n) => n,
                Err(_) => return Err(()),
            };
            // 3:15 PM 
            // 5:18 AM
            let naivedate = NaiveTime::parse_from_str(&value_uri[..], "%I:%M %p");
            match naivedate {
                Ok(n) => Ok(TimeForm(n)),
                Err(_) => Err(()),
            }
        }
    }


    #[derive(Debug)]
    pub struct EmailList(Vec<String>);

    impl Deref for EmailList {
        type Target = Vec<String>;

        fn deref(&self) -> &Vec<String> {
            &self.0
        }
    }

    impl<'v> FromFormValue<'v> for EmailList {
        type Error = ();
        fn from_form_value(value: &'v RawStr) -> Result<EmailList, ()> {
            let mut value_uri = match value.url_decode() {
                Ok(n) => n,
                Err(_) => return Err(()),
            };

            Ok(EmailList((&mut value_uri[..])
                .split(|x| x == ' ')
                .map(String::from)
                .collect::<Vec<String>>().clone()))
        }
    }

    #[derive(Debug)]
    pub struct Image(String);

    impl Deref for Image {
        type Target = String;

        fn deref(&self) -> &String {
            &self.0
        }
    }

    impl<'v> FromFormValue<'v> for Image {
        type Error = ();

        fn from_form_value(value: &'v RawStr) -> Result<Image, ()> {
            /*
            println!("{:?}", value);
            let file = NamedFile::open(value.to_string()); 
            println!("{:?}", file);

            Ok(Image(String::from("pepega")))
            */

            let value_uri = match value.url_decode() {
                Ok(n) => n,
                Err(_) => return Err(()),
            };
            Ok(Image(value_uri))

        }
    }

}

api_route! {
    events {
        title: (Text, String, String),
        location: (Text, String, String),
        text: (Text, String, String),
        event_date: (Date, NaiveDate, DateForm),
        name: (Text, String, String),
        emails: (Text, String, String),
    }
}

api_route! {
    teachers {
        name: (Text, String, String),
        emails: (Array<Text>, Vec<String>, EmailList),
    }
}

api_route! {
    announcements {
        message: (Text, String, String),
        teacher: (Text, String, String),
        date: (Date, NaiveDate, DateForm),
        time: (Time, NaiveTime, TimeForm),
    }
}

api_route! {
    clubs {
        name: (Text, String, String),
        meeting: (Text, String, String),
        link: (Text, String, String),
        sponsor: (Text, String, String),
    }
}

api_route! {
    lunch_events {
        title: (Text, String, String),
        text: (Text, String, String),
        location: (Text, String, String),
        time: (Time, NaiveTime, TimeForm),
    }
}

api_route! {
    ssl_ops {
        title: (Text, String, String),
        text: (Text, String, String),
        location: (Text, String, String),
        teacher: (Text, String, String),
        time: (Time, NaiveTime, TimeForm),
    }
}

api_route! {
    calendar {
        time: (Time, NaiveTime, TimeForm),
    }
}

api_route! {
    polls {
        url: (Text, String, String),
    }
}

api_route! {
    new {
        image: (Text, String, Image),
        name: (Text, String, String),
        new_date: (Date, NaiveDate, DateForm),
    }
}

api_route! {
    important {
        image: (Text, String, Image),
        text: (Text, String, String),
    }
}
