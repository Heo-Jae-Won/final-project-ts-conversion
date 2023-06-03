import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
interface BirthState {
  birth: string;
  changeBirth: (newBirth: string) => void;
}
export const useBirthStore = create<BirthState>()(
  persist(
    (set) => ({
      birth: "",
      changeBirth: (newBirth) =>
        set((state) => ({
          ...state, //if only one variables, u can delete this line.
          birth: newBirth,
        })),
    }),
    {
      name: "birth", // unique name
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
