# Yara

Yara is a self-hosting Reddit alternative.

## Requirements

- GNU/Linux
- Nginx
- Node.js 16+
- MySQL/MariaDB/Postgres
- Python 3
- [Certbot](https://certbot.eff.org/)

## Install

```bash
# configure environment variables
cp .env.example .env
vi .env

# install dependencies
npm install

# migrate database structure
node ace migration:run

# build the server
node ace build --production

# daemon process manager to keep your app always online
sudo npm i -g pm2
pm2 startup
pm2 start pm2.config.js
pm2 save
```

TODO: Nginx and certbot

## Update

```bash
# update code
git pull

# install dependencies
npm install

# migrate database structure
node ace migration:run

# build the server
node ace build --production

# restart daemon process
pm2 restart all
```
