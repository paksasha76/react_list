import React, { useState, useMemo } from "react";

import "./App.css";

import { PostList } from "./Components/PostList";

import { PostForm } from "./Components/PostForm";

import { MyInput } from "./Components/UI/input/MyInput";

import MySelect from "./Components/UI/select/MySelect";
import { MyModel } from "./Components/UI/MyModal/MyModal";
import { MyButton } from "./Components/UI/button/MyButton";

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Javascript",
      description:
        "Мультипарадигменный и интерпретируемый язык программирования с динамической типизацией",
    },
    { id: 2, title: "Java", description: "Просто мусор" },
    { id: 3, title: "C#", description: "Просто мусор" },
    { id: 4, title: "C", description: "Просто мусор" },
    { id: 5, title: "C++", description: "Просто мусор" },
  ]);

  const [selectedSort, setSelectedSort] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  const [modal, setModal] = useState(false);

  const sortedPosts = useMemo(() => {
    if (selectedSort) {
      return [...posts].sort((a, b) => {
        return a[selectedSort].localeCompare(b[selectedSort]);
      });
    }
    return posts;
  }, [selectedSort, posts]);

  function createPost(newPost) {
    setPosts([newPost, ...posts]);
    setModal(false);
  }

  function removePost(post) {
    setPosts(
      [...posts].filter((p) => {
        return p.id !== post.id;
      })
    );
  }

  function sortPosts(sort) {
    setSelectedSort(sort);
  }

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter((post) => {
      return post.title.includes(searchQuery);
    });
  }, [searchQuery, sortedPosts]);

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
      <MyModel visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModel>
      <div>
        <hr style={{ margin: "15px 0" }}></hr>
        <MyInput
          placeholder="Поиск"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <MySelect
          value={selectedSort}
          onChange={sortPosts}
          defaultValue={"Сортировка"}
          options={[
            { value: "title", name: "По названию" },
            { value: "description", name: "По описанию" },
          ]}
        />
      </div>
      {sortedAndSearchedPosts.length !== 0 ? (
        <PostList
          posts={sortedAndSearchedPosts}
          title={"СПИСОК ПОСТОВ"}
          remove={removePost}
        />
      ) : (
        <h1 style={{ textAlign: "center" }}>Посты не найдены</h1>
      )}
    </div>
  );
}

export default App;
