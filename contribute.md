## Contributing / Running locally

These instructions will get the project running on your machine for development and testing.

Prerequisites
- Node.js (v18+ recommended)
- npm
- A Postgres database (local or hosted, e.g. Neon)

1) Clone and install

```bash
git clone https://github.com/alivinshiva/docker_compose.git
cd docker_compose
npm install
```

2) Provide database credentials
- Create a `.env` in the project root (do not commit this file). Use `.env.example` as a template.
- Example:

```ini
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require"
```

3) Run database migrations and generate Prisma client

```bash
# Creates (or updates) migrations and applies them to the DB
npx prisma migrate dev --name init

# Generate the Prisma client (also run automatically on npm install via `prepare` if enabled)
npx prisma generate
```

4) Build and run the app

```bash
npm run build   # compile TypeScript to ./dist
npm start       # run the compiled app
```

Notes
- Do NOT commit `.env` with real credentials. Add it to `.gitignore` (this repo already ignores `.env`).
- In CI / production, provide `DATABASE_URL` as an environment variable instead of `.env`.

## Running with Docker

Build and run a containerized image. The Dockerfile in this repo includes migration/generate steps, but you may prefer to run migrations outside the container in some workflows.

1) Build the image

```bash
docker build -t my-app-image .
```

2) Run the container (set DATABASE_URL via env or Dockerfile)

```bash
docker run -p 3000:3000 \
	-e DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require" \
	my-app-image
```

Notes for Docker
- Ensure the container build runs `prisma generate` and that `node_modules` inside the image contains the generated client. If you mount your project over `/app` at runtime, you may overwrite `node_modules` — avoid mounting the whole project onto the container's app folder unless you rebuild inside the container.

## Running with Docker Compose

If you prefer docker-compose, add a service for the app and Postgres, then run:

```bash
docker compose up --build
```

## Troubleshooting
- Error: `@prisma/client did not initialize yet` — make sure `prisma generate` ran inside the environment where the app is executed (image or host). Do not overwrite `node_modules` at runtime.
- Error: `Missing required environment variable: DATABASE_URL` — set `DATABASE_URL` in `.env` or in the environment before starting.
- If migrations report drift, either:
	- restore the missing migration files, or
	- run `npx prisma migrate reset` (WARNING: drops data), or
	- mark migrations with `npx prisma migrate resolve` if you know they were applied manually.

## Quick checklist
- [ ] Create `.env` from `.env.example`
- [ ] Run `npm install`
- [ ] Run `npx prisma migrate dev` and `npx prisma generate`
- [ ] Build and start: `npm run build && npm start`

If you want, I can add a short `README.md` or update CI/CD instructions to automate migrations and Prisma client generation.