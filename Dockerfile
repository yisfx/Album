FROM node:latest
WORKDIR /app
COPY dist/release/ .
RUN yarn --production


FROM node:latest
RUN apk update && apk add --no-cache tzdata
# USER node
WORKDIR /app
COPY --from=build /app /app
EXPOSE 9000
ENV NODE_ENV=production
ENV GLOBCONFIG=/global/global.setting.json
CMD [ "node", "--max-http-header-size=262144", "./server.js" ]
