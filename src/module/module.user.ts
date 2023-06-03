import { create } from "zustand";
import { getUserInfo } from "../util/axios/basis";
import { createJSONStorage, persist } from "zustand/middleware";
interface UserState {
  loginUserId: string;
  loginUserNickname: string;
  loginUserProfile: string;
  fetchLoginUser: (userId: string) => Promise<void>;
  resetLoginUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      loginUserId: "",
      loginUserNickname: "",
      loginUserProfile: "",
      fetchLoginUser: async (userId: string) => {
        const result = (await getUserInfo(userId)).data;
        set({
          loginUserId: result.userId,
          loginUserNickname: result.userNickname,
          loginUserProfile: result.loginUserProfile,
        });
      },
      resetLoginUser: () =>
        set({
          loginUserId: "",
          loginUserNickname: "",
          loginUserProfile: "",
        }),
    }),
    {
      name: "user", // unique name
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
