import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
export const useAddressStore = create(
  persist(
    (set) => ({
      address: "",
      changeAddress: (newAddress) =>
        set({
          address: newAddress,
        }),
    }), //Cannot use 'in' operator to search for 'getStorage' in undefined. persist()안에 persiste option을 넣어야 왼쪽 오류가 나지 않는다.
    {
      name: "address", // unique name
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
