import React, { FC } from 'react';
import classNames from 'classnames';
import { Comment } from '../../types/comment';
import { CommentItem } from '../CommentItem/CommentItem';

interface Props {
  comments: Comment[];
  isChild?: boolean;
  commentIdToReply: number | null,
  setCommentIdToReply: (id: number | null) => void,
  setIsCommentAdded: (flag: boolean) => void,
}

export const CommentList: FC<Props> = ({
  comments,
  isChild = false,
  commentIdToReply,
  setCommentIdToReply,
  setIsCommentAdded,
}) => {
  return (
    <div className={classNames(
      'comments__thread',
      { ' ps-5': isChild },
    )}
    >
      {comments.map(comment => (
        <div
          key={comment.id}
          className="comments__post"
        >
          <CommentItem
            comment={comment}
            commentIdToReply={commentIdToReply}
            setCommentIdToReply={setCommentIdToReply}
            setIsCommentAdded={setIsCommentAdded}
          />
          {comment.childrenComments && (
            <CommentList
              comments={comment.childrenComments}
              isChild
              commentIdToReply={commentIdToReply}
              setCommentIdToReply={setCommentIdToReply}
              setIsCommentAdded={setIsCommentAdded}
            />
          )}
        </div>
      ))}
    </div>
  );
};
