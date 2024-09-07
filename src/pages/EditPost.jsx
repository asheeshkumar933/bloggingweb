import React, { useEffect, useState } from "react";
import services from "../service/dbConfig";
import { Container, LoadingSpinner, PostForm } from "../components/index.js";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPost() {
  const navigate = useNavigate();
  const [post, setPost] = useState([]);
  const { slug } = useParams(); // we get slug from url
  useEffect(() => {
    if (slug) {
      console.log("slug", slug);

      services.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}
