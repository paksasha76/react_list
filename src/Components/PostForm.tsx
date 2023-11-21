import React, { useState} from "react";

import { MyButton } from "./UI/button/MyButton";

import { MyInput } from "./UI/input/MyInput";

export function PostForm({ create }: any) {
  const [post, setPost] = useState<{title: string, body: string}>({ title: "", body: "" });

  function addNewPost(e: any) {
    e.preventDefault();
    const newPost = { ...post, id: Date.now() };
    create(newPost);
    setPost({ title: "", body: "" });
  }

  return (
    <div>
      <form>
        <MyInput
          type="text"
          placeholder="Название поста"
          value={post.title}
          onChange={(e: any) => setPost({ ...post, title: e.target.value })}
        />
        <MyInput
          type="text"
          placeholder="Описание поста"
          value={post.body}
          onChange={(e: any) => setPost({ ...post, body: e.target.value })}
        />
        <MyButton onClick={addNewPost}>Добавить</MyButton>
      </form>
    </div>
  );
}
