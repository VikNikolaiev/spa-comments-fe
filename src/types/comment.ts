import { User } from './user';

export interface Comment {
  id: string;
  userId: string;
  parrentId: number | null;
  text: string;
  file: string;
  createdAt: string;
  childrenComments: Comment[];
  user:User;
  token?: string | null | undefined;
}
