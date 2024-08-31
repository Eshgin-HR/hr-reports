import store from "@/store"
import {verifyToken, getToken, getRole, removeToken} from '../tokenService/TokenService';

export const userService = {
  pullUserRole: () => {
    let role = getRole();
    store.dispatch("user/updateUserRole", role)
  },
  userRole: () => {
    return getRole();
  },
  isAuthenticated: async () => {
    let token = getToken();
    if (token) {
      let isValid = await verifyToken(token);
      if (!isValid)
        removeToken();
      return true;
    }
    return false;
  },
}
