FROM rustlang/rust:nightly AS build
COPY / /build
WORKDIR /build
RUN cargo build --release

FROM ubuntu:20.04 AS release
WORKDIR /root
COPY --from=build /build/target/release/cms ./cms
CMD [ "./cms", "-r" ]

