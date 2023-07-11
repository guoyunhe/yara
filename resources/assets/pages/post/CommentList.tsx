import { memo } from 'react';
import Comment from '../../types/models/Comment';
import CommentView from './CommentView';

export interface CommentListProps {
  comments: Comment[];
  parentId: number | null;
  onUpdate: (comment: Comment) => void;
  onCreate: (comment: Comment) => void;
  onDelete: (comment: Comment) => void;
}

function CommentList({ comments, parentId, onCreate, onDelete, onUpdate }: CommentListProps) {
  return comments
    .filter((comment) => parentId === comment.parentId)
    .map((comment) => (
      <CommentView
        key={comment.id}
        comment={comment}
        onCreate={onCreate}
        onDelete={onDelete}
        onUpdate={onUpdate}
      >
        <CommentList
          comments={comments}
          parentId={comment.id}
          onCreate={onCreate}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      </CommentView>
    ));
}

export default memo(CommentList);
