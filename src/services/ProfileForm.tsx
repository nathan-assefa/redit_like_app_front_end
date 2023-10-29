import { useReducer, useState } from "react";

type ProfileFormProps = {
  isLoading: boolean;
  isError: boolean;
  onSubmit: (formData: {
    bio: string;
    website: string;
    location: string;
    phone_number: string;
    profile_picture: File | null;
  }) => Promise<void>;
  initialValue: {
    bio: string;
    website: string;
    location: string;
    phone_number: string;
    profile_picture: File | null;
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
    phone_number: "",
    profile_picture: null,
  },
  autoFocus = false,
}) => {
  type PostState = {
    bio: string;
    website: string;
    location: string;
    phone_number: string;
    // profile_picture: File | null;
  };

  const [profilePicture, setProfilePicture] = useState<File | null>(
    initialValue.profile_picture
  );

  // Function to handle profile picture change
  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      setProfilePicture(e.target.files[0]);
    }
  };

  type PostAction =
    | { type: "setBio"; payload: string }
    | { type: "setWebsite"; payload: string }
    | { type: "setLocation"; payload: string }
    | { type: "setPhoneNumber"; payload: string };
  // | { type: "setProfilePicture"; payload: File | null };

  const reducer = (state: PostState, action: PostAction) => {
    switch (action.type) {
      case "setBio":
        return { ...state, bio: action.payload };
      case "setWebsite":
        return { ...state, website: action.payload };
      case "setLocation":
        return { ...state, location: action.payload };
      case "setPhoneNumber":
        return { ...state, phone_number: action.payload };
      // case "setProfilePicture":
      //   return { ...state, profile_picture: action.payload };
    }
  };

  const [{ bio, website, location, phone_number }, dispatch] = useReducer(
    reducer,
    {
      bio: initialValue.bio,
      website: initialValue.website,
      location: initialValue.location,
      phone_number: initialValue.phone_number,
      // profile_picture: initialValue.profile_picture,
    }
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit({
      bio,
      website,
      location,
      phone_number,
      profile_picture: profilePicture,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="profile-form-row">
        <div>
          <label htmlFor="bio">Bio:</label>
          <input
            id="bio"
            className="profile-input profile-bio"
            autoFocus={autoFocus}
            value={bio}
            onChange={(e) =>
              dispatch({ type: "setBio", payload: e.target.value })
            }
          />
        </div>
        <div>
          <label className="website-format" htmlFor="website">
            Website: <span>Please start with https:// or http://</span>
          </label>
          <input
            id="website"
            className="profile-input profile-content"
            autoFocus={autoFocus}
            value={website}
            onChange={(e) =>
              dispatch({ type: "setWebsite", payload: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            id="location"
            className="profile-input profile-content"
            autoFocus={autoFocus}
            value={location}
            onChange={(e) =>
              dispatch({ type: "setLocation", payload: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="phone_number">Phone Number:</label>
          <input
            id="phone_number"
            className="profile-input profile-content"
            autoFocus={autoFocus}
            value={phone_number}
            onChange={(e) =>
              dispatch({ type: "setPhoneNumber", payload: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="profile_picture">Profile Picture:</label>
          <input
            type="file"
            id="profile_picture"
            accept="image/*"
            onChange={handleProfilePictureChange}
          />
        </div>

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

/*
import { useReducer } from "react";

type ProfileFormProps = {
  isLoading: boolean;
  isError: boolean;
  onSubmit: (formData: {
    bio: string;
    website: string;
    location: string;
    phone_number: string;
  }) => Promise<void>;
  initialValue: {
    bio: string;
    website: string;
    location: string;
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
    phone_number: "",
  },
  autoFocus = false,
}) => {
  type PostState = {
    bio: string;
    website: string;
    location: string;
    phone_number: string;
  };

  type PostAction =
    | { type: "setBio"; payload: string }
    | { type: "setWebsite"; payload: string }
    | { type: "setLocation"; payload: string }
    | { type: "setPhoneNumber"; payload: string };

  const reducer = (state: PostState, action: PostAction) => {
    switch (action.type) {
      case "setBio":
        return { ...state, bio: action.payload };
      case "setWebsite":
        return { ...state, website: action.payload };
      case "setLocation":
        return { ...state, location: action.payload };
      case "setPhoneNumber":
        return { ...state, phone_number: action.payload };
    }
  };

  const [{ bio, website, location, phone_number }, dispatch] = useReducer(
    reducer,
    {
      bio: initialValue.bio,
      website: initialValue.website,
      location: initialValue.location,
      phone_number: initialValue.phone_number,
    }
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit({ bio, website, location, phone_number });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="profile-form-row">
        <div>
          <label htmlFor="bio">Bio:</label>
          <input
            id="bio"
            className="profile-input profile-bio"
            autoFocus={autoFocus}
            value={bio}
            onChange={(e) =>
              dispatch({ type: "setBio", payload: e.target.value })
            }
          />
        </div>
        <div>
          <label className="website-format" htmlFor="website">
            Website: <span>Please start with https:// or http://</span>
          </label>
          <input
            id="website"
            className="profile-input profile-content"
            autoFocus={autoFocus}
            value={website}
            onChange={(e) =>
              dispatch({ type: "setWebsite", payload: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            id="location"
            className="profile-input profile-content"
            autoFocus={autoFocus}
            value={location}
            onChange={(e) =>
              dispatch({ type: "setLocation", payload: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="phone_number">Phone Number:</label>
          <input
            id="phone_number"
            className="profile-input profile-content"
            autoFocus={autoFocus}
            value={phone_number}
            onChange={(e) =>
              dispatch({ type: "setPhoneNumber", payload: e.target.value })
            }
          />
        </div>

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

*/
