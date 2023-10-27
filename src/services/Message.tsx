import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Messages } from "../types";
import { useParams } from "react-router-dom";
import { getMessages, sendMessage } from "../utils/messages";
import MessageList from "./ListMessage";
import MessageForm from "./MessageForm";
import RecentMessages from "./RecentMessages";
import { useEffect } from "react";

const UserMessages = () => {
  const { id: userId } = useParams();

  const queryClient = useQueryClient();

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

  const handleMessageSend = async (content: string): Promise<void> => {
    try {
      await sendMessageMutation.mutateAsync(content);
      queryClient.invalidateQueries(["messages"]);
    } catch (error) {
      Promise.reject(error);
    }
  };

  // Using useEffect, here I fetch messages whenever the userId changes
  useEffect(() => {
    const fetchMessages = async () => {
      await queryClient.prefetchQuery(["messages"], () => getMessages(userId!));
    };

    fetchMessages();
  }, [userId, queryClient]);

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (isError) {
    return (
      <div>
        <p>Can't fetch messages</p>
      </div>
    );
  }

  return (
    <div className="all-user-messages">
      <div className="user-messages">
        <div className="m-list">
          <RecentMessages />
        </div>
        <div className="user-messages-list">
          {messages.map((message, index) => (
            <MessageList message={message} key={index} />
          ))}
        </div>
      </div>
      <section className="user-msg-form-section">
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
