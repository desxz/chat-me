const session = require('express-session');
const redis = require('redis');
const redisStore = require('connect-redis')(session);
const client = redis.createClient();

module.exports= new redisStore({
    client,
    host:process.env.REDIS_HOST,
    port:process.env.REDIS_PORT,
    pass:process.env.REDIS_PASS,
})