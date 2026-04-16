import { Sequelize } from 'sequelize';
import dbConfig from '../config/sequelize.config';

const sequelize = new Sequelize(dbConfig);
(async () => {
  try {
    await sequelize.authenticate();
    console.log(' sequelize 连接成功');
  } catch (err) {
    console.log(' sequelize 连接失败', err);
  }
})();
export default sequelize;
