FROM node:latest

WORKDIR /app

ENV PGUSER=tracker
ENV PGPASSWORD=toptracker
ENV PGDATABASE=tracker_db
ENV PGHOST=db
ENV PGPORT=5432
ENV SECRET_PASSWORD=${1poafsd8fahj2!F?Aefcv35}

COPY .server/package.json .

RUN npm install

COPY . .

RUN npm run seed

CMD ["node", "./server/index.js"]