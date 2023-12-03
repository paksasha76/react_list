import { Post } from "../Post/Post";

import { TransitionGroup, CSSTransition } from "react-transition-group";

import { FC } from "react";

interface Props {
  posts: PostItem[];
  title: string;
  remove: Function;
  isLoading?: Boolean;
}

interface PostItem {
  body: string;
  id: number;
  title: string;
  userId: number;
}

export const PostList: FC<Props> = ({ posts, title, remove }) => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{title}</h1>
      <TransitionGroup>
        {posts.map((post: PostItem, index: number) => {
          return (
            <CSSTransition key={post.id} timeout={500} classNames="post">
              <Post
                title={post.title}
                id={post.id}
                description={post.body}
                number={index + 1}
                remove={() => {
                  return remove(post);
                }}
              />
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </div>
  );
};
