import React from "react";
import appwriteService from "../service/dbConfig";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImg }) {
  // console.log("featuredImage", featuredImg);

  return (
    // When user clicks on the card, it redirects to /post/$id
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4 flex flex-col justify-between">
        <div className="w-full h-48 flex items-center justify-center mb-4 overflow-hidden rounded-xl">
          <img
            src={appwriteService.getFilePreview(featuredImg)}
            alt={title}
            className="object-cover w-full h-full"
          />
        </div>
        <h2 className="text-xl font-bold mb-2 line-clamp-2 overflow-hidden">
          {title}
        </h2>
      </div>
    </Link>
  );
}

export default PostCard;
