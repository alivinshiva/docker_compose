FROM node:22-alpine

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .


RUN npm install

COPY . .

ENV DATABASE_URL="postgresql://neondb_owner:.................."

RUN npm run migrate --silent     
RUN npm run prisma:generate
RUN npm run build
CMD ["npm", "start"]


