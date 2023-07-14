const { basename } = require('path');

module.exports = {
  apps: [
    {
      name: basename(__dirname),
      script: './build/server.js',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      env: {
        ENV_PATH: `${__dirname}/.env`,
      },
    },
  ],
};
