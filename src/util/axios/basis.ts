import { instance } from "./axios.util";

export const getUserInfo = (userId) => {
  return instance({
    url: `/user/${userId}`,
    method: "get",
  });
};

export const getProductBoardBest = () => {
  return instance({
    url: `/productBoard/best`,
    method: "get",
  });
};
