import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import * as dataService from './dataService';

const app = express();
app.use(bodyParser.json());

// Connect to the database
createConnection().then(() => {
  console.log('Connected to the database');

  // GET all posts
  app.get('/posts', async (req: Request, res: Response) => {
    const posts = await dataService.fetchPosts();
    res.json(posts);
  });

  // POST a new post
  app.post('/posts', async (req: Request, res: Response) => {
    const newPost = await dataService.createPost(req.body);
    res.json(newPost);
  });

  // PUT update a post
  app.put('/posts/:id', async (req: Request, res: Response) => {
    const updatedPost = await dataService.updatePost(Number(req.params.id), req.body);
    res.json(updatedPost);
  });

  // PATCH update part of a post
  app.patch('/posts/:id', async (req: Request, res: Response) => {
    const patchedPost = await dataService.patchPost(Number(req.params.id), req.body);
    res.json(patchedPost);
  });

  // DELETE a post
  app.delete('/posts/:id', async (req: Request, res: Response) => {
    const deletedPost = await dataService.deletePost(Number(req.params.id));
    res.json(deletedPost);
  });

  // Start the server
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch(error => console.log('Error connecting to the database', error));
