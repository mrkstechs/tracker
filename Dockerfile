FROM node:latest

WORKDIR /app

ENV PGUSER=cshbrqjfrocjuu
ENV PGPASSWORD=e2718e620019ff67091b8a8bd0a1c72ae9b075f8cf72d66f6fa9b6311842dcca
ENV PGDATABASE=d6sp2un6a41pur
ENV PGHOSTADDR=postgres://cshbrqjfrocjuu:e2718e620019ff67091b8a8bd0a1c72ae9b075f8cf72d66f6fa9b6311842dcca@ec2-54-246-185-161.eu-west-1.compute.amazonaws.com:5432/d6sp2un6a41pur
ENV PGPORT=5432
ENV SECRET_PASSWORD=1poafsd8fahj2!F?Aefcv35

COPY ./server/package.json ./server

RUN npm install

COPY . .

RUN npm run seed

CMD ["node", "./server/index.js"]