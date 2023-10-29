import { BookMark } from "../types";
import fetchData from "./makeRequest";
import AuthToken from "./AuthToken";

const url: string = "http://localhost:8000/api";
const accessToken: string = AuthToken();

export function createBookMark(postId: string): Promise<BookMark> {
  return fetchData(`${url}/create_bookmark/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + String(accessToken),
    },
    data: { post_id: postId },
  });
}
