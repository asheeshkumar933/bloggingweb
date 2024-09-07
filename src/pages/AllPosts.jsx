import React, { useEffect, useState } from "react";
import services from "../service/dbConfig";
import { PostCard, Container } from "../components/index.js";

export default function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    services.getPosts([]).then((data) => {
      if (data) {
        setPosts(data.documents);
      }
    });
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {posts.map((post) => (
            <div key={post.$id} className="p-2">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
 
