import { Comment } from "../types";
import SingleComment from "./Comment";

const Comments = ({ comments }: { comments: Comment[] }) => {
  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id}>
          <SingleComment comment={comment} />
        </div>
      ))}
    </div>
  );
};

export default Comments;
