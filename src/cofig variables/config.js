const config = {
  appWriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appWriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID), // Fix key to match environment variable
  appWriteDbId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appWriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID), // Fix key to match environment variable
  appWriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID), // Fix key to match environment variable
};

export default config;
