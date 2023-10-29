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
    // <form onSubmit={handleSubmit}>
    //   <div className="community-form-row">
    //     <textarea
    //       className="community-name"
    //       placeholder="Community name"
    //       autoFocus={autoFocus}
    //       value={name}
    //       onChange={(e) => setName(e.target.value)}
    //     />
    //     <textarea
    //       className="community-description community-name"
    //       placeholder="describe your community"
    //       autoFocus={autoFocus}
    //     />
    //     <button className="community-submit" type="submit" disabled={isLoading}>
    //       {isLoading ? "cancel" : "Create"}
    //     </button>
    //   </div>
    //   <div className="error" style={{ color: "red" }}>
    //     {isError}
    //   </div>
    // </form>
    <form onSubmit={handleSubmit}>
      <div className="community-form-row">
        <div className="input-wrapper">
          <label className="label-for-c-name" htmlFor="community-name">
            Community Name:
          </label>
          <textarea
            id="community-name"
            className="community-name insert-c-name"
            placeholder="Community name"
            autoFocus={autoFocus}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <label
            className="label-for-c-description"
            htmlFor="community-description"
          >
            Community Description: <span>(Optional)</span>
          </label>
          <textarea
            id="community-description"
            className="community-description community-name"
            placeholder="Describe your community"
            autoFocus={autoFocus}
          />
        </div>
        <button className="community-submit" type="submit" disabled={isLoading}>
          {isLoading ? "Cancel" : "Create"}
        </button>
      </div>
      <div className="error" style={{ color: "red" }}>
        {isError}
      </div>
    </form>
  );
};

export default CommunityForm;
