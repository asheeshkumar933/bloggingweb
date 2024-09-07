import config from "../cofigVarbale/config.js"; // Ensure correct path and filename
import { Client, Account, ID } from "appwrite";

export class AuthService {
  Client = new Client();

  constructor() {
    this.Client.setEndpoint(config.appWriteUrl).setProject(
      config.appWriteProjectId
    );

    this.Account = new Account(this.Client);
  }

  async CreateAccount({ name, email, password }) {
    try {
      const userAccount = await this.Account.create(
        ID.unique(),
        email, // Correct order of parameters: email first, then name
        password,
        name
      );

      if (userAccount) {
        return this.Login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.error("Error creating account:", error);
      throw error;
    }
  }

  async Login({ email, password }) {
    try {
      return await this.Account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.Account.get();
    } catch (error) {
      throw error;
    }
  }
  async logout() {
    try {
      return await this.Account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;
