// src/config/db.config.ts
import { Options } from 'sequelize';
import logger from '../utils/logger';

const dbConfig: Options = {
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123',
  database: 'sky_take_out',
  timezone: '+08:00',
  logging: sql => logger.sql(sql),
  define: {
    timestamps: false,
    freezeTableName: true,
    underscored: true,
  },
};

export default dbConfig;
