import React, { useState, useMemo, useEffect, FC } from "react";

import "./App.css";

import { PostList } from "../PostList/PostList";
import { PostForm } from "../PostForm/PostForm";

import { MyModal } from "../UI/MyModal/MyModal";
import { MyButton } from "../UI/button/MyButton";

import { PostFilter } from "../PostFilter/PostFilter";

import { MyLoader } from "../Skeleton/Skeleton";
import { SkeletonTitle } from "../Skeleton/SkeletonTitle";

import axios from "axios"

const App: FC = () => {

  const [posts, setPosts]: any = useState<[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1)

  const [fetching, setFetching] = useState<Boolean>(true)

  const [modal, setModal] = useState<Boolean>(false);

  const [filter, setFilter] = useState<Filter>({
    sort: "",
    query: "",
  });

  const [isLoading, setIsLoading] = useState<Boolean>(true);

  useEffect(() => {
    if(fetching) {
    axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${currentPage}`)
      .then((res) => {
        setPosts([...posts, ...res.data]);
        setCurrentPage(prevState => prevState+1)
        setIsLoading(false);
      }).finally(() => {setFetching(false)})
  }}, [fetching]);


  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    return function() {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  function scrollHandler(e: any) {
    if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
      setFetching(true)
    }
  }

  interface Post {
    body: string;
    id: number;
    title: string;
    userId: number;
  }

  interface Filter {
    sort: string;
    query: string;
  }

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
          [...new Array(10)].map((_, index) => <MyLoader key={index} />)
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
