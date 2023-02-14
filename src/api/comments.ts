import { client } from '../utils/fetchClient';
import { Comment } from '../types/comment';

export const getComments = (page: number, sort: string) => {
  return client.get<Comment[]>(`/comments?page=${page}&sort=${sort}`);
};

export const postComment = (newComment: Omit<Comment, 'id' | 'childrenComments' | 'user' | 'createdAt' | 'userId'>) => {
  return client.post<Comment>('/comments', newComment);
};
