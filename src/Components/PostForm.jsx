import React, { useState } from "react";

import { MyButton } from "./UI/button/MyButton";

import { MyInput } from "./UI/input/MyInput";

export function PostForm({ create }) {
  const [post, setPost] = useState({ title: "", description: "" });

  function addNewPost(e) {
    e.preventDefault();
    const newPost = { ...post, id: Date.now() };
    create(newPost);
    setPost({ title: "", description: "" });
  }

  return (
    <div>
      <form>
        <MyInput
          type="text"
          placeholder="Название поста"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
        />
        <MyInput
          type="text"
          placeholder="Описание поста"
          value={post.description}
          onChange={(e) => setPost({ ...post, description: e.target.value })}
        />
        <MyButton onClick={addNewPost}>Добавить</MyButton>
      </form>
    </div>
  );
}
