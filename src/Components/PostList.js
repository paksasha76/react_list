import React, {useState} from "react";

import { Post } from "./Post";

export function PostList({ posts, title, remove}) {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{title}</h1>
      {posts.map((post, index) => {
        return (
          <Post
            key={post.id}
            title={post.title}
            id={post.id}
            description={post.description}
            number={index+1}
            remove={() => {remove(post)}}
          />
        );
      })}
    </div>
  );
}
