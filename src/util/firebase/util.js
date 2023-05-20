import {
  addDoc,
  collection,
  limit,
  orderBy,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

export const getFirebaseQuery = (db, loginUserId) => {
  return query(
    collection(db, `chatroom`),
    where("who", "array-contains", loginUserId),
    limit(100)
  );
};

export const getFirebaseSubQuery = async (db, chattingId) => {
  return query(
    collection(db, `chatRoom/${chattingId}/messageList`),
    orderBy("date", "asc"),
    limit(100)
  );
};

export const addFirebaseChatRoom = async (
  docRef,
  myId,
  otherId,
  productCode,
  productImage
) => {
  await addDoc(docRef, {
    who: [myId, otherId],
    date: new Intl.DateTimeFormat("kr", {
      dateStyle: "full",
      timeStyle: "full",
    }).format(new Date()),
    productCode: productCode,
    productImage: productImage,
  });
};

export const getOnSnapShotChatRoom = async (query, myId, chatId) => {
  return onSnapshot(query, (snapshot) => {
    snapshot.forEach(async (doc) => {
      const li = document.createElement("li");

      li.className = "list-group-item non-click";

      li.innerHTML = `
              <h6>
              ${myId === doc.data().who[0] ? "판매자ㅡ" : "구매자ㅡ"}
                      ${
                        myId === doc.data().who[0]
                          ? doc.data().who[1]
                          : doc.data().who[0]
                      }</h6>
                      <div class='text-small'>${doc.id}</div>
                      <p class='text-small1'>${doc.data().productCode}</p>
                      <img src=${JSON.stringify(
                        doc.data().productImage
                      )} width=70 height=70/>
              `;

      //채팅방 중복 생성 방지
      if (chatId.includes("init")) {
        document.getElementsByClassName("list-group chat-list")[0].append(li);
      }
    });
  });
};

export const addFireBaseChatMessage = async (
  colRef,
  message,
  myId,
  myNickname,
  myProfile
) => {
  return await addDoc(colRef, {
    text: message,
    date: new Date().getTime(),
    userId: myId,
    userNickname: myNickname,
    userProfile: myProfile,
  });
};

export const getOnSnapShotChatMessage = async (query, array) => {
  return onSnapshot(query, (snapshot) => {
    snapshot.forEach((doc) => {
      array.push({
        id: doc.id,
        userId: doc.data().uid,
        text: doc.data().text,
        date: doc.data().date,
        userNickname: doc.data().userNickname,
        userProfile: doc.data().userProfile,
      });
    });
  });
};

export const getOnSnapShotProductCode = async (query, array) => {
  return onSnapshot(query, (snapshot) => {
    snapshot.forEach((doc) => {
      array.push(doc.data().productCode);
    });
  });
};
