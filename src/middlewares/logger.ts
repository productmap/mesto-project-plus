import winston from 'winston';
import expressWinston from 'express-winston';
import 'winston-daily-rotate-file';
import config from '../config';

const transportAccess = new winston.transports.DailyRotateFile({
  filename: `${config.logsDir}/access-%DATE%.log`,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxFiles: 14,
});

const transportError = new winston.transports.DailyRotateFile({
  filename: `${config.logsDir}/error-%DATE%.log`,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxFiles: 14,
});

// логер запросов
export const accessLogger = expressWinston.logger({
  transports: [
    transportAccess,
    // new winston.transports.Console({
    //   format: winston.format.json(),
    // }),
  ],
  format: winston.format.json(),
});

// логер ошибок
export const errorLogger = expressWinston.errorLogger({
  transports: [
    transportError,
    // new winston.transports.Console({
    //   format: winston.format.simple(),
    // }),
  ],
  format: winston.format.json(),
});
