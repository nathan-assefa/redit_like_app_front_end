import { useState } from "react";

type CommentFormProps = {
  isLoading: boolean;
  isError: boolean;
  onSubmit: (content: string) => Promise<void>;
  initialValue?: string;
  autoFocus?: boolean;
};

const CommentForm: React.FC<CommentFormProps> = ({
  isLoading,
  isError,
  onSubmit,
  initialValue = "",
  autoFocus = false,
}) => {
  const [content, setContent] = useState(initialValue);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(content).then(() => setContent(""));
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="comment-form-row">
        <textarea
          className="message-input"
          autoFocus={autoFocus}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button className="" type="submit" disabled={isLoading}>
          {isLoading ? "cancel" : "Comment"}
        </button>
      </div>
      <div className="error" style={{ color: "red" }}>
        {isError}
      </div>
    </form>
  );
};

export default CommentForm;
