# syntax=docker/dockerfile:1
ARG IMAGE_NAME=docker-proxy.repo.esoft.tech/alpine
ARG IMAGE_TAG=20231219
FROM ${IMAGE_NAME}:${IMAGE_TAG}

ARG ALPINE_REPO_PROXY_PREFIX="repo.esoft.tech/repository/"

ENV ALPINE_REPO_PROXY_PREFIX=${ALPINE_REPO_PROXY_PREFIX}

RUN \
    sed -i "s|//|//${ALPINE_REPO_PROXY_PREFIX}|" /etc/apk/repositories \
    && apk add --no-cache curl \
    && apk upgrade libcrypto3 libssl3
