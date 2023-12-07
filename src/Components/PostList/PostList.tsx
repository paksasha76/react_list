import { FC, useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Post } from "../Post/Post";

interface Props {
  posts: PostItem[];
  title: string;
  remove: Function;
  isLoading?: Boolean;
  createdAt: string;
}

interface PostItem {
  body: string;
  id: number;
  title: string;
  userId: number;
}

const PostList: FC<Props> = ({ posts, title, remove, createdAt }) => {
  return (
    <div>
      <h1
        style={{ textAlign: "center", fontStyle: "italic", fontSize: "40px" }}
      >
        {title}
      </h1>
      <p
        style={{
          marginTop: "30px",
          marginBottom: "30px",
          marginLeft: "15px",
          fontSize: "20px",
        }}
      >
        Дата последнего создания поста: {createdAt}
      </p>
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

export default PostList;
