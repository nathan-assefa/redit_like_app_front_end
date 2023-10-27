import { Messages } from "../types";
import fetchData from "./makeRequest";
import AuthToken from "./AuthToken";

const url: string = "http://localhost:8000/api";
const accessToken: string = AuthToken();

export function sendMessage(
  recipientId: string | undefined,
  content: string
): Promise<Messages> {
  return fetchData(`${url}/send_message/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + String(accessToken),
    },
    data: { recipient: recipientId, content: content },
  });
}

export function getMessages(recipientId: string): Promise<Messages[]> {
  return fetchData(`${url}/get-user-messages/${recipientId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + String(accessToken),
    },
  });
}

export function mostRecentMessages(): Promise<Messages[]> {
  return fetchData(`${url}/most_recent_messages/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + String(accessToken),
    },
  });
}

type ClearMessage = {
  message: string;
};

export function ClearMessageCount(): Promise<ClearMessage> {
  return fetchData(`${url}/clear-unread-messages-count/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + String(accessToken),
    },
  });
}
