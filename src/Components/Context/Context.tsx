import { createContext } from "react";

interface Post {
  body: string;
  id: number;
  title: string;
  userId: number;
  [key: string]: any;
}

export const newContext = createContext({
  posts: {},
  title: "",
  remove: (post: Post) => {},
  isLoading: false,
  createdAt: "",
});
