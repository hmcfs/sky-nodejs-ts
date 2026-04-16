export default {
  url: 'redis://localhost:6379',
  socket: {
    reconnectStrategy: (retries: number) => Math.min(retries * 100, 3000), // 断线重连策略
  },
};
