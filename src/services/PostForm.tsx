import { useReducer } from "react";

type PostFormProps = {
  isLoading: boolean;
  isError: boolean;
  onSubmit: (formData: { title: string; content: string }) => Promise<void>;
  initialValue?: string;
  autoFocus?: boolean;
};

const PostForm: React.FC<PostFormProps> = ({
  isLoading,
  isError,
  onSubmit,
  initialValue = "",
  autoFocus = false,
}) => {
  type PostState = {
    title: string;
    content: string;
  };

  type PostAction =
    | { type: "setTitle"; payload: string }
    | { type: "setContent"; payload: string };
  const reducer = (state: PostState, action: PostAction) => {
    switch (action.type) {
      case "setTitle":
        return { ...state, title: action.payload };
      case "setContent":
        return { ...state, content: action.payload };
    }
  };

  const [{ title, content }, dispatch] = useReducer(reducer, {
    title: initialValue,
    content: initialValue,
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit({ title, content })
      .then(() => dispatch({ type: "setTitle", payload: "" }))
      .then(() => dispatch({ type: "setContent", payload: "" }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="post-form-row">
        <textarea
          className="post-input post-title"
          autoFocus={autoFocus}
          value={title}
          onChange={(e) =>
            dispatch({ type: "setTitle", payload: e.target.value })
          }
        />
        <textarea
          className=" post-input post-content"
          autoFocus={autoFocus}
          value={content}
          onChange={(e) =>
            dispatch({ type: "setContent", payload: e.target.value })
          }
        />
        <button className="post-submit" type="submit" disabled={isLoading}>
          {isLoading ? "cancel" : "Post"}
        </button>
      </div>
      <div className="error" style={{ color: "red" }}>
        {isError}
      </div>
    </form>
  );
};

export default PostForm;
