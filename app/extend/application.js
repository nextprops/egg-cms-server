'use strict';

module.exports = {
  generateJWT(id, username) {
    const { config } = this;
    const token = this.jwt.sign({ id, username }, config.jwt.secret);
    return token;
  },
  verifyToken(ctx) {
    const { config } = this;
    const token = config.jwt.getToken(ctx);
    if (!token) return null;
    return this.jwt.verify(token, config.jwt.secret);
  },
  getToken(ctx) {
    const { config } = this;
    const token = config.jwt.getToken(ctx);
    return token;
  },
};

