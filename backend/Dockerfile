FROM node:16 as builder

COPY / /workspace
WORKDIR /workspace

ENV TZ Asia/Seoul
EXPOSE 8080 8081
VOLUME ["/logs"]

RUN yarn && yarn build

ENV NODE_ENV production
USER node

FROM node:16 as runner

COPY --chown=node:node --from=builder /workspace/node_modules ./node_modules
COPY --chown=node:node --from=builder /workspace/dist ./dist

CMD ["node", "dist/main"]
