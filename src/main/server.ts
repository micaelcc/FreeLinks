import express from 'express';

const app = express();

app.listen(4040, () => {
  console.log(`Server running at http://localhost:4040`);
});
