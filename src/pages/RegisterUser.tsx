import RegistrationForm from "../services/UserRegistrationFrom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterUser = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  interface UpdatedProfile {
    first_name: string;
    last_name: string;
    username: string;
    password: string;
    confirm_password: string;
    email: string;
  }
  // const apiUrl: string = "http://localhost:8000/api";
  const apiUrl: string = "https://redditclone.pythonanywhere.com/api";

  const UserRegisterMutation = useMutation(
    async (updatedPost: UpdatedProfile) => {
      const {
        username,
        password,
        confirm_password,
        first_name,
        last_name,
        email,
      } = updatedPost;
      const url = `${apiUrl}/register/`;
      const headers = {
        "Content-Type": "application/json",
      };
      const data = {
        username,
        password,
        confirm_password,
        first_name,
        last_name,
        email,
      };

      try {
        const response = await axios.post(url, data, { headers });
        console.log(response);
        return response.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  );

  const onRegistratingUser = async (formData: {
    first_name: string;
    last_name: string;
    username: string;
    password: string;
    confirm_password: string;
    email: string;
  }): Promise<void> => {
    try {
      await UserRegisterMutation.mutateAsync({
        username: formData.username,
        password: formData.password,
        confirm_password: formData.confirm_password,
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
      });

      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.error || "An error occurred");
      }
    }
  };

  return (
    <div className="registration-container">
      <RegistrationForm
        isLoading={UserRegisterMutation.isLoading}
        isError={UserRegisterMutation.isError}
        autoFocus={true}
        onSubmit={onRegistratingUser}
      />
      {error && (
        <p className="error-while-registration">
          <div style={{ color: "red" }}>{error}</div>
        </p>
      )}
    </div>
  );
};

export default RegisterUser;
