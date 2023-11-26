import React, { useState, useMemo, useEffect, FC } from "react";

import "./App.css";

import { PostList } from "./Components/PostList";
import { PostForm } from "./Components/PostForm";

import { MyModal } from "./Components/UI/MyModal/MyModal";
import { MyButton } from "./Components/UI/button/MyButton";

import { PostFilter } from "./Components/PostFilter/PostFilter";

import { MyLoader } from "./Components/Skeleton/Skeleton";
import { SkeletonTitle } from "./Components/Skeleton/SkeletonTitle";

const App: FC = () => {
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((res) => {
        setPosts(res);
        setIsLoading(false);
      });
  }, []);

  interface Post {
    body: string;
    id: number;
    title: string;
    userId: number
  }

  const [posts, setPosts]: any = useState<[]>([]);

  const [modal, setModal] = useState<Boolean>(false);

  const [filter, setFilter] = useState<{ sort: string; query: string }>({
    sort: "",
    query: "",
  });

  const [isLoading, setIsLoading] = useState<Boolean>(true);

  const sortedPosts = useMemo(() => {
    if (filter.sort) {
      return [...posts].sort((a, b) => {
        return a[filter.sort].localeCompare(b[filter.sort]);
      });
    }
    return posts;
  }, [filter.sort, posts]);

  function createPost(newPost: Post): void {
    setPosts([newPost, ...posts]);
    setModal(false);
  }

  function removePost(post: Post): void {
    setPosts(
      [...posts].filter((p) => {
        return p.id !== post.id;
      })
    );
  }

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter((post: Post) => {
      return post.title.includes(filter.query);
    });
  }, [filter.query, sortedPosts]);

  return (
    <div className="App">
      <MyButton
        style={{ marginTop: "30px" }}
        onClick={() => {
          setModal(true);
        }}
      >
        Создать пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <PostFilter filter={filter} setFilter={setFilter} />
      {isLoading && <SkeletonTitle />}
      {sortedAndSearchedPosts.length !== 0 || isLoading ? (
        isLoading ? (
          [...new Array(6)].map((_, index) => <MyLoader key={index} />)
        ) : (
          <PostList
            posts={sortedAndSearchedPosts}
            title={"СПИСОК ПОСТОВ"}
            remove={removePost}
            isLoading={isLoading}
          />
        )
      ) : (
        <h1 style={{ textAlign: "center" }}>Посты не найдены</h1>
      )}
    </div>
  );
};

export default App;
