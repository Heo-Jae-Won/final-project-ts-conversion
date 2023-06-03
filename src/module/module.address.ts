import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
interface AddressState {
  address: string;
  changeAddress: (event: React.ChangeEvent<HTMLElement>) => void;
}
export const useAddressStore = create<AddressState>()(
  persist(
    (set) => ({
      address: "",
      changeAddress: (event: React.ChangeEvent<HTMLElement>) =>
        set({
          address: (event.target as HTMLInputElement).value,
        }),
    }), //Cannot use 'in' operator to search for 'getStorage' in undefined. persist()안에 persiste option을 넣어야 왼쪽 오류가 나지 않는다.
    {
      name: "address", // unique name
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
