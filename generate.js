import { randomBytes } from 'crypto';

const secretApiKey = randomBytes(32).toString('hex');
console.log(secretApiKey);
