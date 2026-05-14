import createServer from './server/index.js';

const port = process.env.PORT;
const host = process.env.HOST;

const app = createServer();

app.listen(port, () => {
  console.log(`Server running at http://${host}:${port}`);
});