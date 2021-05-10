FROM harbor.newegg.org/base/node:12-alpine as build
WORKDIR /app
COPY dist/release/ .
RUN yarn config set registry https://a.newegg.org/artifactory/api/npm/newegg-npm && yarn --production


FROM harbor.newegg.org/base/node:12-alpine
RUN apk update && apk add --no-cache tzdata
# USER node
WORKDIR /app
COPY --from=build /app /app
EXPOSE 9000
ENV NODE_ENV=production
    GLOBCONFIG=/global/global.setting.json
CMD [ "node", "--max-http-header-size=262144", "./server.js" ]
