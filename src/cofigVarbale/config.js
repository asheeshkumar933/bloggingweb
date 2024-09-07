// Ensure this file is correctly named and located
const config = {
  appWriteUrl: import.meta.env.VITE_APPWRITE_URL,
  appWriteProjectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  appWriteDbId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  appWriteCollectionId: import.meta.env.VITE_APPWRITE_COLLECTION_ID,
  appWriteBucketId: import.meta.env.VITE_APPWRITE_BUCKET_ID,
};

export default config;
