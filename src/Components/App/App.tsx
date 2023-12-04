import { useState, useMemo, useEffect, FC } from "react";
import axios from "axios";
import PostList from "../PostList/PostList";
import PostForm from "../PostForm/PostForm";
import PostFilter from "../PostFilter/PostFilter";
import MyModal from "../UI/MyModal/MyModal";
import MyLoader from "../Skeleton/Skeleton";
import SkeletonTitle from "../Skeleton/SkeletonTitle";
import { MyButton } from "../UI/button/MyButton";
import "./App.css";

const App: FC = () => {
  
  const currentDate = new Date();
  const createdAt = currentDate.toLocaleString("ru-RU", {
    month: "long",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const [date, setDate] = useState<string>(createdAt);

  const [posts, setPosts]: any = useState<[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const [fetching, setFetching] = useState<Boolean>(true);

  const [modal, setModal] = useState<Boolean>(false);

  const [filter, setFilter] = useState<Filter>({
    sort: "",
    query: "",
  });

  const [isLoading, setIsLoading] = useState<Boolean>(true);

  useEffect(() => {
    if (fetching) {
      axios
        .get(
          `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${currentPage}`
        )
        .then((res) => {
          setPosts([...posts, ...res.data]);
          setCurrentPage((prevState) => prevState + 1);
          setIsLoading(false);
        })
        .finally(() => {
          setFetching(false);
        });
    }
  }, [fetching, currentPage, posts]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const scrollHandler = (e: Event) => {
    if (
      (e.target as Document).documentElement.scrollHeight -
        ((e.target as Document).documentElement.scrollTop +
          window.innerHeight) <
      150
    ) {
      setFetching(true);
    }
  };

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

  const createPost = (newPost: Post): void => {
    setPosts([newPost, ...posts]);
    setModal(false);
  };

  const removePost = (post: Post): void => {
    setPosts(
      [...posts].filter((p) => {
        return p.id !== post.id;
      })
    );
  };

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
        <PostForm create={createPost} setDate={setDate} />
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
            createdAt={date}
          />
        )
      ) : (
        <h1 style={{ textAlign: "center" }}>Посты не найдены</h1>
      )}
    </div>
  );
};

export default App;
