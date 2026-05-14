import createServer from '../server/index.js';

const PORT = process.env.PORT ?? 3000;
const app  = createServer();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});