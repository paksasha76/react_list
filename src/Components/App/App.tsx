import { useState, useMemo, useEffect, useCallback, FC } from "react";
import axios from "axios";
import PostList from "../PostList/PostList";
import PostForm from "../PostForm/PostForm";
import PostFilter from "../PostFilter/PostFilter";
import MyModal from "../UI/MyModal/MyModal";
import MyLoader from "../Skeleton/Skeleton";
import SkeletonTitle from "../Skeleton/SkeletonTitle";
import NotFound from "../NotFound/NotFound";
import { MyButton } from "../UI/button/MyButton";
import { newContext } from "../Context/Context";
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

  const [posts, setPosts]: [Array<Post>, Function] = useState<[]>([]);

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
    [key: string]: any;
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

  const createPost = useCallback(
    (newPost: Post): void => {
      setPosts([newPost, ...posts]);
      setModal(false);
    },
    [posts]
  );

  const removePostHandler = useCallback(
    (post: Post): void => {
      setPosts(
        [...posts].filter((p) => {
          return p.id !== post.id;
        })
      );
    },
    [posts]
  );

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
          <newContext.Provider
            value={{
              posts: sortedAndSearchedPosts,
              title: "СПИСОК ПОСТОВ",
              remove: removePostHandler,
              isLoading: isLoading,
              createdAt: date,
            }}
          >
            <PostList />
          </newContext.Provider>
        )
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default App;
