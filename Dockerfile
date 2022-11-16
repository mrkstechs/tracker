FROM node:latest

WORKDIR /app

COPY ./server/package.json .

RUN npm install

COPY . .

RUN npm run seed

CMD ["node", "./server/index.js"]