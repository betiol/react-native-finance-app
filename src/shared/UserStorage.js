import { AsyncStorage } from "react-native";

class UserStorage {
  async getUser() {
    let storageUser = await AsyncStorage.getItem("user");
    storageUser = storageUser.trim();
    let user = await JSON.parse(storageUser);
    return user;
  }

  async getToken(): string {
    let token = await AsyncStorage.getItem("token");
    return token;
  }

  async updateUser(user) {
    if (user) {
      AsyncStorage.setItem("user", JSON.stringify(user));
      AsyncStorage.setItem("token", user.access_token);
    } else {
      AsyncStorage.setItem("user", "null");
      AsyncStorage.setItem("token", "null");
    }
  }

  async clearAll() {
    this.updateUser(null);
  }
}

const storage = new UserStorage();
export default storage;
