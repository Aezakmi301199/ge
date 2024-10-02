FROM repo-docker-proxy.esoft.tech/node:20-alpine AS build
LABEL authors="PROMETHEUS"

WORKDIR /app

# Приложение
COPY . .

ARG REGISTRY_TOKEN

ARG VITE_APP_ENV
ARG VITE_BITRIX_URL
ARG VITE_BITRIX_CDN
ARG VITE_ESOFT_CDN
ARG VITE_LASTNAME
ARG VITE_TEMP_TOKEN

ENV VITE_APP_ENV=${VITE_APP_ENV}
ENV VITE_BITRIX_URL=${VITE_BITRIX_URL}
ENV VITE_BITRIX_CDN=${VITE_BITRIX_CDN}
ENV VITE_ESOFT_CDN=${VITE_ESOFT_CDN}
ENV VITE_LASTNAME=${VITE_LASTNAME}
ENV VITE_TEMP_TOKEN=${VITE_TEMP_TOKEN}

RUN echo @esoft.tech:registry=https://git.esoft.tech/api/v4/projects/1290/packages/npm/ >> .npmrc
RUN echo //git.esoft.tech/api/v4/projects/1290/packages/npm/:_authToken=${REGISTRY_TOKEN} >> .npmrc

RUN npm ci
RUN npm run build
RUN npm prune --production

FROM repo-docker-proxy.esoft.tech/nginx:1.25.5-alpine

WORKDIR /app

COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
