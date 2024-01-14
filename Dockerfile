FROM node:lts-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS build
RUN pnpm install --prefer-offline --ignore-scripts --frozen-lockfile
RUN pnpm store prune

FROM base AS prod
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/ /app

CMD pnpm start