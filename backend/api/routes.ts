import { Application } from 'express';
import projectsRouter from '../../backend/server/api/controllers/projects/router';
import usersRouter from '../../backend/server/api/controllers/users/router';
import commentsRouter from '../../backend/server/api/controllers/comments/router';
import commentInteractionsRouter from '../../backend/server/api/controllers/commentInteractions/router';

export default function routes(app: Application): void {
  app.use('/api/v1/projects', projectsRouter);
  app.use('/api/v1/users', usersRouter);
  app.use('/api/v1/comments', commentsRouter);
  app.use('/api/v1/commentInteractions', commentInteractionsRouter)
}
