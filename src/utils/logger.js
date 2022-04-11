import log4js from 'log4js'

log4js.configure({
  appenders: {
    consola: { type: 'console' },
    archivoErrores: { type: 'file', filename: './log/errores.log' },
    archivoDebug: { type: 'file', filename: './log/debug.log' },
    archivoWarn: { type: 'file', filename: './log/warn.log' },
    loggerConsola: {
      type: 'logLevelFilter',
      appender: 'consola',
      level: 'info',
    },
    loggerArchivoErrores: {
      type: 'logLevelFilter',
      appender: 'archivoErrores',
      level: 'error',
    },
    loggerArchivoDebug: {
      type: 'logLevelFilter',
      appender: 'archivoDebug',
      level: 'debug',
    },
    loggerArchivoWarn: {
      type: 'logLevelFilter',
      appender: 'archivoWarn',
      level: 'warn',
    },
  },
  categories: {
    default: {
      appenders: ['loggerConsola','loggerArchivoErrores', 'loggerArchivoWarn', 'loggerArchivoDebug'],
      level: 'all',
    },
    prod: {
      appenders: ['loggerArchivoErrores', 'loggerArchivoWarn'],
      level: 'all',
    },
  },
})

let logger = null

if (process.env.NODE_ENV === 'PROD') {
  logger = log4js.getLogger('prod')
} else {
  logger = log4js.getLogger()
}

export default logger