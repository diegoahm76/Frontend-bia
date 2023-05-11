FROM node:18.15-alpine
USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY --chown=node . .
RUN yarn install
CMD ["yarn", "start"]