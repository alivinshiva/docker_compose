FROM node:22-alpine

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .


RUN npm install

COPY . .

ENV DATABASE_URL="postgresql://neondb_owner:npg_Uj0Ziuw1gKJE@ep-holy-flower-adyr4kvx-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

RUN npm run migrate --silent     
RUN npm run prisma:generate
RUN npm run build
CMD ["npm", "start"]


