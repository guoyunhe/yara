# Development

## Requirements

- Docker
- Git
- Node.js 16+

## Setup

```bash
# fork & clone repo
git clone git@github.com:guoyunhe/yara.git
cd yara

# start docker containers for mysql, etc.
docker compose up

# configure environment variables
cp .env.example .env

# install dependencies
npm install

# migrate database schema
node ace migration:fresh --seed

# start server with auto-reload
node ace serve --watch
```

Visit http://localhost:3333/
