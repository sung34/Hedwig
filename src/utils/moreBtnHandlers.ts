import { deleteComment, updateComment } from '@/apis/Comment';
import { deletePost, updatePost } from '../apis/Post';

export const POST_TYPE = 'POST';
export const COMMENT_TYPE = 'COMMENT';

export interface handleData {
  content: string
  img?: File
}

export function handleUpdate(type: typeof POST_TYPE | typeof COMMENT_TYPE, id: number, { content, img }: handleData) {
  switch (type) {
    case POST_TYPE:
      return updatePost(id, content, img);
    case COMMENT_TYPE:
      return updateComment(id, content);
    default:
      throw new Error(`Unsupported type: ${type}`);
  }
}

export function handleDelete(type: typeof POST_TYPE | typeof COMMENT_TYPE, id: number) {
  switch (type) {
    case POST_TYPE:
      return deletePost(id);
    case COMMENT_TYPE:
      return deleteComment(id);
    default:
      throw new Error(`Unsupported type: ${type}`);
  }
}
