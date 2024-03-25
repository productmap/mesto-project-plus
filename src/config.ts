import 'dotenv/config';

export default {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,
  basePath: process.env.BASE_PATH || '',
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 27017,
    database: process.env.DB_DATABASE || 'mestodb',
  },
  jwt: {
    secret: process.env.JWT_SECRET || '2j34k2j34kj2k4j2134j2k3j4k4jtj45nhdsfjgsuf4g9jdf9',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  logsDir: process.env.LOGS_DIR || 'logs',
};
