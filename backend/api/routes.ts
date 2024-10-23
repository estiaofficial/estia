import { Application } from 'express';
import projectsRouter from './controllers/projects/router';
import usersRouter from './controllers/users/router';
import commentsRouter from './controllers/comments/router';
import commentInteractionsRouter from './controllers/commentInteractions/router';

export default function routes(app: Application): void {
  app.use('/api/v1/projects', projectsRouter);
  app.use('/api/v1/users', usersRouter);
  app.use('/api/v1/comments', commentsRouter);
  app.use('/api/v1/commentInteractions', commentInteractionsRouter)
}
