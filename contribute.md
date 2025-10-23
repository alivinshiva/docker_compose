## Manual installation
- clone the repo
- install node js
- run npm install int root dir
- start db locally (i.e postgres) or get a db from neon db
- replace .env from your connection string.
- run npx prisma migrate 
- run npx prisma generate 
- run mpn run build 
- run npm start 


## Docker installation

- install docker
- start postgres if db is locally or use neon db.
- build the image ` docker build -t <image-name> .`
- start the image `docker run -p 3000:3000 <image name>`

## Docker compose installation 
- install docker compose
- Run `Docker-compose up` from root dir.