import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthStorage {
  constructor(namespace = "auth") {
    this.namespace = namespace;
  }

  async getAccessToken() {
    //Get the access token saved.
    const accessToken = await AsyncStorage.getItem(
      `${this.namespace}:accessToken`
    );
    return accessToken ? JSON.parse(accessToken) : null;
  }

  async setAccessToken(accessToken) {
    //Add an accessToken to the storage.
    await AsyncStorage.setItem(
      `${this.namespace}:accessToken`,
      JSON.stringify(accessToken)
    );
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}:accessToken`);
  }

  async setUserInfo(userInfo) {
    await AsyncStorage.setItem(
      `${this.namespace}:userInfo`,
      JSON.stringify(userInfo)
    );
  }

  async getUserInfo() {
    const userInfo = await AsyncStorage.getItem(`${this.namespace}:userInfo`);
    return userInfo ? JSON.parse(userInfo) : null;
  }

  async removeUserInfo() {
    await AsyncStorage.removeItem(`${this.namespace}:userInfo`);
  }
}

export default AuthStorage;
