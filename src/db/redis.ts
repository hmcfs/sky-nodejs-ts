import { createClient } from 'redis';
import redisConfig from '../config/redis.config';
const redisCli = createClient(redisConfig);
// 2. 监听连接事件（日志+异常处理）
redisCli.on('connect', () => {
  console.log('✅ Redis 连接成功');
});
redisCli.on('error', err => {
  console.error('❌ Redis 连接错误:', err);
});

redisCli.on('end', () => {
  console.log('⚠️ Redis 连接断开');
});
// 3. 主动连接（项目启动时执行）
redisCli.connect().catch(err => {
  console.error('❌ Redis 启动连接失败:', err);
});

export default redisCli;
