import winston from 'winston';

const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  sql: 3,
};

// 给标签上色
winston.addColors({
  error: 'red',
  warn: 'yellow',
  info: 'green',
  sql: 'blue',
});

declare module 'winston' {
  interface Logger {
    sql: winston.LeveledLogMethod;
  }
}

const consoleFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message }) => {
    // 颜色代码
    const reset = '\x1B[0m';
    const gray = '\x1B[90m'; // 灰色（时间）
    const red = '\x1B[31m'; // 红色（error）
    const green = '\x1B[32m'; // 绿色（info）
    const yellow = '\x1B[33m'; // 黄色（warn）
    const blue = '\x1B[34m'; // 蓝色（sql）

    // 时间永远灰色
    const timeStr = `${gray}[${timestamp}]${reset}`;

    // 根据级别渲染颜色
    if (level === 'error') {
      return `${timeStr} ${red}[error] ${message}${reset}`;
    }
    if (level === 'info') {
      return `${timeStr} ${green}[info] ${message}${reset}`;
    }
    if (level === 'warn') {
      return `${timeStr} ${yellow}[warn]${reset} ${message}`;
    }
    if (level === 'sql') {
      return `${timeStr} ${blue}[sql]${reset} ${message}`;
    }

    return `${timeStr} [${level}] ${message}`;
  })
);

const logger = winston.createLogger({
  levels: logLevels,
  level: 'sql',
  transports: [new winston.transports.Console({ format: consoleFormat })],
});

export default logger;
