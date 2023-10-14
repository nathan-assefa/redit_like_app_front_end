import { useState } from "react";

type CommunityFormProps = {
  isLoading: boolean;
  isError: boolean;
  onSubmit: (name: string) => Promise<void>;
  initialValue?: string;
  autoFocus?: boolean;
};

const CommunityForm: React.FC<CommunityFormProps> = ({
  isLoading,
  isError,
  onSubmit,
  initialValue = "",
  autoFocus = false,
}) => {
  const [name, setName] = useState(initialValue);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(name).then(() => setName(""));
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="community-form-row">
        <textarea
          className="community-name"
          placeholder="Community name"
          autoFocus={autoFocus}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="community-submit" type="submit" disabled={isLoading}>
          {isLoading ? "cancel" : "Create"}
        </button>
      </div>
      <div className="error" style={{ color: "red" }}>
        {isError}
      </div>
    </form>
  );
};

export default CommunityForm;
