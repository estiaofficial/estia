import CommentInteractionsService from '../../services/commentInteractions.service';
import { Request, Response } from 'express';
import { RequestParams } from './types';
import { CommentInteraction } from '../../../../common/types';

export class Controller {
  // Create
  create(req: Request<RequestParams, unknown, CommentInteraction>, res: Response): void {
    // #swagger.tags = ['CommentInteractions']
    const commentId = req.params.commentId;
    const commentInteraction = req.body;

    try {
      CommentInteractionsService.create(commentInteraction, commentId).then((r) => {
        res.status(201).location(`/api/v1/commentInteractions/${r?.commentId}`).json(r);
      });
    } catch (error) {
      res.status(500).json({ message: 'Error creating comment', error });
    }
  }

  // Read
  all(req: Request, res: Response): void {
    // #swagger.tags = ['CommentInteractions']
    const commentId = req.params.commentId;

    try {
      CommentInteractionsService.getAll(commentId).then((r) => {
        res.json(r);
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching comments', error });
    }
  }


  get(req: Request<RequestParams>, res: Response): void {
    // #swagger.tags = ['CommentInteractions']
    const commentId = req.params.commentId;
    const userId = req.params.userId;

    try {
      CommentInteractionsService.getInteraction(commentId, userId).then((r) => {
        if (r) res.json(r);
        else res.status(404).json({ message: 'Comment not found' });
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching comment', error });
    }
  }

  // Update
  update(req: Request<RequestParams, unknown, Partial<CommentInteraction>>, res: Response): void {
    // #swagger.tags = ['CommentInteractions']
    const commentId = req.params.commentId;
    const userId = req.params.userId;
    const commentInteraction = req.body;
    
    try {
      CommentInteractionsService.update(commentId, userId, commentInteraction).then((r) => {
        if (r) res.json(r);
        else res.status(404).json({ message: 'Comment not found' });
      });
    } catch (error) {
      res.status(500).json({ message: 'Error updating comment', error });
    }
  }

  // Delete
  delete(req: Request<RequestParams>, res: Response): void {
    // #swagger.tags = ['CommentInteractions']
    const commentId = req.params.commentId;
    const userId = req.params.userId;

    try {
      CommentInteractionsService.delete(commentId, userId).then((r) => {
        if (r) res.status(204).end();
        else res.status(404).json({ message: 'Comment not found' });
      });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting comment', error });
    }
  }
}

export default new Controller();