'use strict';

const fs = require('fs');

/**
 * Logger overwrites for better control
 * @param module {Module}
 */
module.exports = (module) => {
  const logger = new console.Console(process.stdout, process.stderr);
  logger.persist = (message, logFileName = process.env.LOG_FILE || 'logfile') => {
    return new Promise((resolve, reject) => {
      fs.writeFile(
        logFileName,
        message.concat('\n'), {
          flag: 'a',
        }, (error) => {
          if (error) {
            reject();
            return;
          }
          resolve();
        });
    });
  };
  logger.persistSync = (message, logFileName = process.env.LOG_FILE || 'logfile') => {
    fs.writeFileSync(
      logFileName,
      message.concat('\n'), {
        flag: 'a',
      }
    );
  };
  return logger;
};
