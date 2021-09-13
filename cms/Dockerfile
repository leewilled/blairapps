FROM rustlang/rust:nightly AS build
COPY / /build
WORKDIR /build
RUN cargo build --release

FROM ubuntu:20.04 AS release
WORKDIR /root
RUN apt-get update --fix-missing && \
    apt-get install --noconfirm -y build-essential checkinstall zlib1g-dev openssl
RUN apt-get -y install gcc
RUN apt-get -y remove openssl
RUN DEBIAN_FRONTEND=noninteractive apt-get -q update && apt-get -qy install wget make \
    && wget https://www.openssl.org/source/openssl-1.0.2g.tar.gz \
    && tar -xzvf openssl-1.0.2g.tar.gz \
    && cd openssl-1.0.2g \
    && ./config \
    && make install \
    && ln -sf /usr/local/ssl/bin/openssl 'which openssl'

COPY --from=build /build/target/release/cms ./cms
CMD [ "./cms", "-r" ]

