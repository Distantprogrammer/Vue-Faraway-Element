import Cookies from "js-cookie";
const TokenKey = "saber-access-token";
const RefreshTokenKey = "saber-refresh-token";
class auth {
  getToken() {
    return Cookies.get(TokenKey);
  }
  setToken(token) {
    return Cookies.set(TokenKey, token);
  }
  getRefreshToken() {
    return Cookies.get(RefreshTokenKey);
  }
  setRefreshToken(token) {
    return Cookies.set(RefreshTokenKey, token);
  }
  removeToken() {
    return Cookies.remove(TokenKey);
  }
  removeRefreshToken() {
    return Cookies.remove(RefreshTokenKey);
  }
}
export default new auth();
