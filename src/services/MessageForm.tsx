import { useState } from "react";
import SendIcon from "../icons/SendIcon";

type MessageFormProps = {
  isLoading: boolean;
  isError: boolean;
  onSubmit: (content: string) => Promise<void>;
  initialValue?: string;
  autoFocus?: boolean;
};

const MessageForm: React.FC<MessageFormProps> = ({
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
        <input
          className="user-message-input"
          autoFocus={autoFocus}
          value={content}
          placeholder="Write a message"
          onChange={(e) => setContent(e.target.value)}
        />
        {content && (
          <button className="send-message" type="submit" disabled={isLoading}>
            {<SendIcon />}
          </button>
        )}
      </div>
      <div className="error" style={{ color: "red" }}>
        {isError}
      </div>
    </form>
  );
};

export default MessageForm;
