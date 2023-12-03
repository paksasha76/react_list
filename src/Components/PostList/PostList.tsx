import { FC } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Post } from "../Post/Post";

interface Props {
  posts: PostItem[];
  title: string;
  remove: Function;
  isLoading?: Boolean;
  date: any;
}

interface PostItem {
  body: string;
  id: number;
  title: string;
  userId: number;
}

const PostList: FC<Props> = ({ posts, title, remove, date}) => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{title}</h1>
      <h2>Дата создания  последнего поста: {date.toString()} </h2>
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
