import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index.js";
import services from "../../service/dbConfig.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  // Correct destructuring
  console.log("Post Data:", post); // Debugging statement

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.user);
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const submit = async (data) => {
    let fileId = null;

    if (data.featuredImg?.[0]) {
      const file = await services.uploadFile(data.featuredImg[0]);
      fileId = file.$id;
    }

    if (post) {
      if (fileId && post.featuredImg) {
        await services.deleteFile(post.featuredImg);
      }

      const update_blog = await services.updatePost(post.$id, {
        ...data,
        featuredImg: fileId || post.featuredImg, // Use existing file if not uploading new
      });

      if (update_blog) {
        navigate(`/post/${update_blog.$id}`);
      }
    } else {
      const create_blog = await services.createPost({
        ...data,
        userId: userData.$id,
        featuredImg: fileId,
      });

      if (create_blog) {
        navigate(`/post/${create_blog.$id}`);
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-") // Replace multiple spaces with a single hyphen
        .replace(/[^a-z0-9\-]/g, ""); // Remove non-alphanumeric characters except hyphens
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe(); // Proper cleanup
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("featuredImg", { required: !post })}
        />
        {post && post.featuredImg && (
          <div className="w-full mb-4">
            <img
              src={services.getFilePreview(post.featuredImg)} // Ensure correct preview URL
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
