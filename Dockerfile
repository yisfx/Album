FROM docker.io/wangsaihaizai/node:v1
WORKDIR /app
COPY dist/release/ .
RUN yarn install --production


FROM docker.io/wangsaihaizai/node:v1
RUN yarn install --production
# USER node
WORKDIR /app
COPY /dist/release /app
EXPOSE 9000
ENV NODE_ENV=production
ENV GLOBCONFIG=/global/global.setting.json
CMD ["yarn" ]
