FROM node:18.17.1

ARG NODE_APP_PORT=3000

RUN mkdir -p /home/node/app/node_modules && chown -R node:node ./home
WORKDIR /home/node/app
USER node
COPY package.json package-lock.json* ./
RUN npm ci && npm cache clean --force
COPY --chown=node:node . .

EXPOSE ${NODE_APP_PORT}

RUN npm run build:server
RUN npm run build:app

CMD [ "node", "build/index.js" ]