import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Messages } from "../types";
import { useParams } from "react-router-dom";
import { getMessages, sendMessage } from "../utils/messages";
import MessageList from "./ListMessage";
import MessageForm from "./MessageForm";

const UserMessages = () => {
  const { id: userId } = useParams();

  const {
    data: messages,
    isLoading,
    isError,
  } = useQuery<Messages[]>(["messages"], () => getMessages(userId!), {
    initialData: [],
  });

  const sendMessageMutation = useMutation((content: string) => {
    return sendMessage(userId, content);
  });

  const queryClient = useQueryClient();

  const handleMessageSend = async (content: string): Promise<void> => {
    try {
      await sendMessageMutation.mutateAsync(content);
      queryClient.invalidateQueries(["messages"]);
    } catch (error) {
      Promise.reject(error);
    }
  };

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (isError) {
    return (
      <div>
        <p>Can't fetch notifications</p>
      </div>
    );
  }

  return (
    <div className="all-user-messages">
      <div className="user-messages">
        <div className="user-messages-list">
          {messages.map((message, index) => (
            <MessageList message={message} key={index} />
          ))}
        </div>
      </div>
      <section>
        <div>
          <MessageForm
            isLoading={sendMessageMutation.isLoading}
            isError={sendMessageMutation.isError}
            autoFocus={true}
            onSubmit={handleMessageSend}
          />
        </div>
      </section>
    </div>
  );
};

export default UserMessages;
