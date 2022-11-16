FROM node:latest

WORKDIR /app

ENV PGUSER=xwxkepfzogadhh
ENV PGPASSWORD=17e6276c5dd824a3a3c1e1e57ce566c5324993b0f5a8f5cfe571b86fdbdd44a8
ENV PGDATABASE=db9ccbldikovr1
ENV PGHOSTADDR=postgres://xwxkepfzogadhh:17e6276c5dd824a3a3c1e1e57ce566c5324993b0f5a8f5cfe571b86fdbdd44a8@ec2-34-252-216-149.eu-west-1.compute.amazonaws.com:5432/db9ccbldikovr1
ENV PGHOST=ec2-34-252-216-149.eu-west-1.compute.amazonaws.com
ENV PGPORT=5432
ENV SECRET_PASSWORD=1poafsd8fahj2!F?Aefcv35

COPY ./server/package.json .

RUN npm install

COPY . .

RUN npm run seed

CMD ["node", "./server/index.js"]