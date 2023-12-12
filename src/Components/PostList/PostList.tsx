import { useContext, memo, FC } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Post } from "../Post/Post";

import { newContext } from "../Context/Context";

interface PostItem {
  body: string;
  id: number;
  title: string;
  userId: number;
}

const PostList: FC = memo(() => {
  const data: any = useContext(newContext);
  return (
    <div>
      <h1
        style={{ textAlign: "center", fontStyle: "italic", fontSize: "40px" }}
      >
        {data.title}
      </h1>
      <p
        style={{
          marginTop: "30px",
          marginBottom: "30px",
          marginLeft: "15px",
          fontSize: "20px",
        }}
      >
        Дата последнего создания поста: {data.createdAt}
      </p>
      <TransitionGroup>
        {data.posts.map((post: PostItem, index: number) => {
          return (
            <CSSTransition key={post.id} timeout={500} classNames="post">
              <Post
                title={post.title}
                id={post.id}
                description={post.body}
                number={index + 1}
                remove={() => {
                  return data.remove(post);
                }}
              />
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </div>
  );
});

export default PostList;
