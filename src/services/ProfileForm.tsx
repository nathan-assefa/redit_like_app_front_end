import { useReducer } from "react";

type ProfileFormProps = {
  isLoading: boolean;
  isError: boolean;
  onSubmit: (formData: {
    bio: string;
    website: string;
    location: string;
    birthdate: string;
    phone_number: string;
  }) => Promise<void>;
  initialValue: {
    bio: string;
    website: string;
    location: string;
    birthdate: string;
    phone_number: string;
  };
  autoFocus: boolean;
};

const ProfileForm: React.FC<ProfileFormProps> = ({
  isLoading,
  isError,
  onSubmit,
  initialValue = {
    bio: "",
    website: "",
    location: "",
    birthdate: "",
    phone_number: "",
  },
  autoFocus = false,
}) => {
  type PostState = {
    bio: string;
    website: string;
    location: string;
    birthdate: string;
    phone_number: string;
  };

  type PostAction =
    | { type: "setBio"; payload: string }
    | { type: "setWebsite"; payload: string }
    | { type: "setLocation"; payload: string }
    | { type: "setBirthDate"; payload: string }
    | { type: "setPhoneNumber"; payload: string };

  const reducer = (state: PostState, action: PostAction) => {
    switch (action.type) {
      case "setBio":
        return { ...state, bio: action.payload };
      case "setWebsite":
        return { ...state, website: action.payload };
      case "setLocation":
        return { ...state, location: action.payload };
      case "setBirthDate":
        return { ...state, birthdate: action.payload };
      case "setPhoneNumber":
        return { ...state, phone_number: action.payload };
    }
  };

  const [{ bio, website, location, birthdate, phone_number }, dispatch] =
    useReducer(reducer, {
      bio: initialValue.bio,
      website: initialValue.website,
      location: initialValue.location,
      birthdate: initialValue.birthdate,
      phone_number: initialValue.phone_number,
    });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit({ bio, website, location, birthdate, phone_number });
    // .then(() => {
    //   e.currentTarget.reset();
    // });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="profile-form-row">
        <input
          className="profile-input profile-title"
          autoFocus={autoFocus}
          value={bio}
          onChange={(e) =>
            dispatch({ type: "setBio", payload: e.target.value })
          }
        />
        <input
          className=" profile-input profile-content"
          autoFocus={autoFocus}
          value={website}
          onChange={(e) =>
            dispatch({ type: "setWebsite", payload: e.target.value })
          }
        />
        <input
          className=" profile-input profile-content"
          autoFocus={autoFocus}
          value={location}
          onChange={(e) =>
            dispatch({ type: "setLocation", payload: e.target.value })
          }
        />
        <input
          className=" profile-input profile-content"
          autoFocus={autoFocus}
          value={birthdate}
          onChange={(e) =>
            dispatch({ type: "setBirthDate", payload: e.target.value })
          }
        />
        <input
          className=" profile-input profile-content"
          autoFocus={autoFocus}
          value={phone_number}
          onChange={(e) =>
            dispatch({ type: "setPhoneNumber", payload: e.target.value })
          }
        />

        <button className="profile-submit" type="submit" disabled={isLoading}>
          {isLoading ? "cancel" : "Update"}
        </button>
      </div>
      <div className="error" style={{ color: "red" }}>
        {isError}
      </div>
    </form>
  );
};

export default ProfileForm;
