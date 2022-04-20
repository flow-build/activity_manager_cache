const jwt = require('koa-jwt');
const jwksRsa = require('jwks-rsa');

const jwt_config = {
  secret: jwksRsa.koaJwtSecret({
    jwksUri: `${process.env.API_DOMAIN}/${process.env.API_BASE_PATH}/jwt/jwks.json`,
  }),
  algorithms: ['RS256'],
  debug: process.env.NODE_ENV === 'development',
};

const jwtMiddleware = jwt(jwt_config);

module.exports = jwtMiddleware;
