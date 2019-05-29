import winston from 'winston';

export const logger = winston.createLogger({
  level: 'info',
  exitOnError: false,
  format: winston.format.combine(winston.format.simple()),
  transports: [new winston.transports.Console()]
});
