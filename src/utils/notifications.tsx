import { Notification } from "../types";
import fetchData from "./makeRequest";
import AuthToken from "./AuthToken";

const url: string = "http://localhost:8000/api";
const accessToken: string = AuthToken();

export function getNotifications(): Promise<Notification[]> {
  return fetchData(`${url}/notifications`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + String(accessToken),
    },
  });
}

interface ClearNotification {
  message: string;
}

export function ClearNotificationCount(): Promise<ClearNotification> {
  return fetchData(`${url}/clear-unread-notifications/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + String(accessToken),
    },
  });
}
