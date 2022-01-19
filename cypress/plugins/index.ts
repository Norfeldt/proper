const http = require('http');
const next = require('next');
const nock = require('nock');

// start the Next.js server when Cypress starts
module.exports = async (on, config) => {
  const app = next({ dev: true });
  const handleNextRequests = app.getRequestHandler();
  await app.prepare();

  const customServer = new http.Server(async (req, res) => {
    return handleNextRequests(req, res);
  });

  await new Promise<void>((resolve, reject) => {
    customServer.listen(3000, err => {
      if (err) {
        return reject(err);
      }
      console.log('> Ready on http://localhost:3000');
      resolve();
    });
  });

  on('task', {
    clearNock() {
      nock.restore();
      nock.clearAll();

      return null;
    },

    async nock({ hostname, method, path, statusCode, body }) {
      nock.activate();

      console.log({ hostname, method, path, statusCode, body });

      method = method.toLowerCase();
      nock(hostname)[method][path].reply(statusCode, body);

      return null;
    },
  });

  return config;
};
