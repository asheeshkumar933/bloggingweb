import config from "../cofigVarbale/config.js"; // Adjust path as needed
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Services {
  Client = new Client();
  databases;
  storage;

  constructor() {
    this.Client.setEndpoint(config.appWriteUrl).setProject(
      config.appWriteProjectId
    );
    this.databases = new Databases(this.Client);
    this.storage = new Storage(this.Client);
  }

  async createPost({ title, slug, content, featuredImg, Status, userId }) {
    try {
      return await this.databases.createDocument(
        config.appWriteDbId,
        config.appWriteCollectionId, // Correct spelling
        slug,
        {
          title,
          content,
          featuredImg,
          Status,
          userId,
        }
      );
    } catch (error) {
      console.error("Appwrite service :: createPost :: error", error.message);
    }
  }

  async updatePost(slug, { title, content, featuredImg, Status }) {
    try {
      return await this.databases.updateDocument(
        config.appWriteDbId,
        config.appWriteCollectionId, // Correct spelling
        slug,
        {
          title,
          content,
          featuredImg,
          Status,
        }
      );
    } catch (error) {
      console.error("Appwrite service :: updatePost :: error", error.message);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        config.appWriteDbId,
        config.appWriteCollectionId, // Correct spelling
        slug
      );
      return true;
    } catch (error) {
      console.error("Appwrite service :: deletePost :: error", error.message);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        config.appWriteDbId,
        config.appWriteCollectionId, // Correct spelling
        slug
      );
    } catch (error) {
      console.error("Appwrite service :: getPost :: error", error.message);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("Status", "active")]) {
    try {
      return await this.databases.listDocuments(
        config.appWriteDbId,
        config.appWriteCollectionId, // Correct spelling
        queries
      );
    } catch (error) {
      console.error("Appwrite service :: getPosts :: error", error.message);
      return false;
    }
  }

  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        config.appWriteBucketId, // Ensure this is correctly set
        ID.unique(),
        file
      );
    } catch (error) {
      console.error("Appwrite service :: uploadFile :: error", error.message);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(config.appWriteBucketId, fileId);
      return true;
    } catch (error) {
      console.error("Appwrite service :: deleteFile :: error", error.message);
      return false;
    }
  }

  getFilePreview(fileId) {
    try {
      return this.storage.getFilePreview(config.appWriteBucketId, fileId);
    } catch (error) {
      console.error(
        "Appwrite service :: getFilePreview :: error",
        error.message
      );
    }
  }
}

const services = new Services();
export default services;
