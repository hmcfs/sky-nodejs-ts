export default {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '123',
  database: 'sky_take_out',
  connectionLimit: 10, //连接池最大数
  waitForConnections: true, // 无连接时排队等待
  queueLimit: 0, // 排队无限
};
