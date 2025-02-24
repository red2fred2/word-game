import express, { Request, Response } from 'express';

const app = express();

app.use(express.static('frontend'));

app.listen(7070);
