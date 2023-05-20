import { instance } from "./axios.util";

export const getProductBoardList = (page, num, searchType, keyword) => {
  return instance({
    url: "/productBoard",
    method: "get",
    params: {
      page,
      num,
      searchType,
      keyword,
    },
  });
};

export const getProductBoardRead = (productCode) => {
  return instance({
    url: `/productBoard/${productCode}`,
    method: "get",
  });
};

export const extractProductBoardRead = (productCode) => {
  return instance({
    url: "/productBoard/data/" + productCode,
    method: "get",
  });
};

export const insertProductBoard = (formData) => {
  return instance({
    url: "/productBoard",
    method: "post",
    data: formData,
  });
};

export const updateProductBoard = (formData) => {
  return instance({
    url: "/productBoard/update",
    method: "put",
    data: formData,
  });
};

export const deleteProductBoard = (productCode) => {
  return instance({
    url: "/productBoard/" + productCode,
    method: "delete",
  });
};

export const getProductBoardLikeByUser = (productCode, userNickname) => {
  return instance({
    url: `/productBoard/like/${productCode}/${userNickname}`,
    method: "get",
  });
};


export const onClickLike = (Object) => {
  return instance({
    url: "/productBoard/user/like",
    method: "patch",
    data: Object,
  });
};

export const onClickDislike = (Object) => {
  return instance({
    url: "/productBoard/user/dislike",
    method: "patch",
    data: Object,
  });
};
