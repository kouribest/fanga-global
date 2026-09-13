FROM node:24-alpine

WORKDIR /app

ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=8080

# Le site est statique et le serveur utilise uniquement les modules natifs Node.js.
COPY --chown=node:node server.mjs ./server.mjs
COPY --chown=node:node dist/ ./dist/

USER node

EXPOSE 8080

CMD ["node", "server.mjs"]
