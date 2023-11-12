import React, { useState } from "react";

import "./App.css";

import { PostList } from "./Components/PostList";

import { PostForm } from "./Components/PostForm";

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

  function createPost(newPost) {
    setPosts([...posts, newPost]);
  }

  function removePost(post) {
    setPosts([...posts].filter((p) => {
      return p.id !== post.id 
    }))
  }

  return (
    <div className="App">
      <PostForm create={createPost} />
      <PostList posts={posts} title={"СПИСОК ПОСТОВ"} remove={removePost}/>
    </div>
  );
}

export default App;
