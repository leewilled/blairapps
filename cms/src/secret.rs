use rand::{rngs::OsRng, RngCore};

pub fn create_secret() -> String {
    let mut secret = [0u8; 32];
    OsRng.fill_bytes(&mut secret);
    base64::encode(&secret)
}
