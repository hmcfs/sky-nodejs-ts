import { hashPassword, verifyPassword } from '../utils/bcript';

(async function () {
  const password = '123456';
  const hashedPassword = await hashPassword(password);
  console.log('hashedPassword', hashedPassword);
})();

(async function () {
  const hashedPassword = '$2b$10$0lFReLH3N4fVR/SG9ydmOefJQVQdDdRPu9Y79z2T/68R6c2vHLjVW';
  const isValid = await verifyPassword('123456', hashedPassword);
  console.log('isValid', isValid);
})();
