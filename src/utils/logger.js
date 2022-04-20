const { createLogger, format, transports } = require('winston');

const _logger = createLogger({
  level: process.env.KOA_LOG_LEVEL || 'info',
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.label(),
    //format.align(),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [new transports.Console()],
  exceptionHandlers: [
    new transports.Console({
      format: format.errors(),
    }),
  ],
  rejectionHandlers: [new transports.Console()],
});

const koaLogger = (logger) => async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;

  let logLevel;
  const status = ctx.status;
  if (status >= 500) {
    logLevel = 'error';
  }
  if (status >= 400 && status < 500) {
    logLevel = 'warn';
  }
  if (status >= 100 && status < 400) {
    logLevel = 'info';
  }

  const msg = `${ctx.method} ${ctx.originalUrl} ${status} ${ms}ms`;

  logger.log(logLevel, msg);
};

module.exports = {
  _logger,
  koaLogger,
};
