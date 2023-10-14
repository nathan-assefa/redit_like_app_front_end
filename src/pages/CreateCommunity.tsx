import { createCommunity } from "../utils/communities";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CommunityForm from "../services/CommunityForm";

const CreateCommunity = () => {
  const createCommunityMutation = useMutation((name: string) => {
    return createCommunity(name);
  });

  const queryClient = useQueryClient();

  // Function to handle form submission
  const handelCommunitySubmit = async (name: string): Promise<void> => {
    try {
      await createCommunityMutation.mutateAsync(name);
      queryClient.invalidateQueries(["post"]);
    } catch (error) {
      Promise.reject(error);
    }
  };

  return (
    <div>
      <CommunityForm
        isLoading={createCommunityMutation.isLoading}
        isError={createCommunityMutation.isError}
        autoFocus={true}
        onSubmit={handelCommunitySubmit}
      />
    </div>
  );
};

export default CreateCommunity;
