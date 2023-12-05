FROM node:18.16.0-slim
RUN apt-get update && \
    apt-get install -y locales curl \
    procps \
    --no-install-recommends
RUN locale-gen ja_JP.UTF-8
RUN localedef -f UTF-8 -i ja_JP ja_JP
ENV LANG=ja_JP.UTF-8
ENV TZ=Asia/Tokyo

RUN  npm i -g @nestjs/cli

WORKDIR /backend

COPY . .