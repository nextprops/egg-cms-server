

/**
 * Add X-Response-Time header field.
 *
 * @return {Function}
 * @api public
 */

function responseTime() {
  return function responseTime(ctx, next) {
    const start = Date.now();
    return next().then(function() {
      const delta = Math.ceil(Date.now() - start);
      ctx.set('X-Response-Time', delta + 'ms');
    });
  };
}

module.exports = responseTime;
