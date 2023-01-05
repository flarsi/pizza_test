import 'reflect-metadata';
import express from 'express';
import  mongoose from 'mongoose'
import {runPipeline} from './controllers/pipline/pipline.controllers'

export const app = express();
const port = process.env.PORT || 3000;

export const init = (async () => {
await  mongoose.connect('mongodb://127.0.0.1:27017/pizza_test')
    .then(()=>{
  console.log('connect to DB')
      })
    .catch((err)=>{
      console.log(err)})

  app.use(express.json());
  app.post('/new-pipeline', (req, res) => runPipeline(req, res));
  app.get('/', (req, res) => res.json({ message: 'Welcome' }));
  app.use((req, res) => res.status(404).json({ message: 'No route found' }));
    app.listen(port, () => {
        console.log(`Server run at at http://localhost:${port}`);
    });
})();
