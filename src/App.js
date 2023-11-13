import React, { useState } from "react";

import "./App.css";

import { PostList } from "./Components/PostList";

import { PostForm } from "./Components/PostForm";

import MySelect from "./Components/UI/select/MySelect";

function App() {
  let [posts, setPosts] = useState([
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

  const [selectedSort, setSelectedSort] = useState("")

  function createPost(newPost) {
    setPosts([...posts, newPost]);
  }

  function removePost(post) {
    setPosts(
      [...posts].filter((p) => {
        return p.id !== post.id;
      })
    );
  }

  function sortPosts(sort) {
    setSelectedSort(sort)
    setPosts([...posts].sort((a,b) => {return a[sort].localeCompare(b[sort])}))
  }

  return (
    <div className="App">
      <PostForm create={createPost} />
      <div>
        <hr style={{ margin: "15px 0" }}></hr>
        <MySelect
         value={selectedSort}
         onChange={sortPosts}
          defaultValue={"Сортировка"}
          options={[
            { value: 'title', name: "По названию" },
            { value: 'description', name: "По описанию" },
          ]}
        />
      </div>
      {posts.length !== 0 ? (
        <PostList posts={posts} title={"СПИСОК ПОСТОВ"} remove={removePost} />
      ) : (
        <h1 style={{ textAlign: "center" }}>Посты не найдены</h1>
      )}
    </div>
  );
}

export default App;
