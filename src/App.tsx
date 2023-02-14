import React, { useCallback, useEffect, useState } from 'react';
import './App.scss';
import { Comment } from './types/comment';
import { getComments } from './api/comments';
import { CommentList } from './components/CommentList/CommentList';
import { Pagination } from './components/Pagination/Pagination';
import { SortType } from './types/SortType';
import { SortBar } from './components/SortBar/SortBar';
import { Loader } from './components/Loader';
import { ReplyForm } from './components/ReplyForm/ReplyForm';

export const App: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [totalCommentsCount, setTotalCommentsCount] = useState(0);
  const [commentIdToReply, setCommentIdToReply] = useState<number | null>(null);
  const [sortType, setSortType] = useState(SortType.byDateDesc);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isCommentAdded, setIsCommentAdded] = useState(false);
  const perPage = 25;

  const loadComments = useCallback(async () => {
    try {
      setIsLoading(true);
      const dataFromServer = await getComments(currentPage, sortType);

      setComments(await dataFromServer.items);
      setTotalCommentsCount(Number(await dataFromServer.serverItemsCount));
      setIsLoading(false);
      setIsCommentAdded(false);
    } catch {
      setIsLoading(false);
      setIsCommentAdded(false);
      throw new Error('Error loading comments');
    }
  }, [sortType, currentPage]);

  useEffect(() => {
    loadComments().then();
  }, [sortType, currentPage, isCommentAdded]);

  return (
    <div className="container">
      <div className="mb-5"></div>
      <div className="text-center">
        <h1 className="fs-3">Add new comment</h1>
      </div>
      <div className="px-5">
        <div className="container border p-2 bg-light">
          <ReplyForm
            commentIdToReply={null}
            setCommentIdToReply={setCommentIdToReply}
            setIsCommentAdded={setIsCommentAdded}
          />
        </div>
      </div>

      <div className="comments container mb-5">
        <SortBar sortType={sortType} setSortType={setSortType} />

        {isLoading
          ? <Loader />
          : (
            <>
              <CommentList
                comments={comments}
                commentIdToReply={commentIdToReply}
                setCommentIdToReply={setCommentIdToReply}
                setIsCommentAdded={setIsCommentAdded}
              />

              <Pagination
                total={totalCommentsCount}
                perPage={perPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </>
          )}
      </div>
    </div>
  );
};
