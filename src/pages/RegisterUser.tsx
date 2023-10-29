import RegistrationForm from "../services/UserRegistrationFrom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const RegisterUser = () => {
  const [error, setError] = useState<string | null>(null);
  interface UpdatedProfile {
    first_name: string;
    last_name: string;
    username: string;
    password: string;
    confirm_password: string;
    email: string;
  }
  const apiUrl: string = "http://localhost:8000/api";

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
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.error || "An error occurred");
      }
    }
  };

  return (
    <div>
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
