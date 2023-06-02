//  8 ~ 10 char combination of number + alaphabet
export const checkPasswordValid = (password) => {
  var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/;
  const result = regExp.test(password);
  return result;
};

export const checkPhoneNumberValid = (phoneNumber) => {
  var regExp = /^\d{3}-\d{3,4}-\d{4}$/;
  const result = regExp.test(phoneNumber);
  return result;
};

//validate email
export const checkEmailValid = (email) => {
  var regExp = /^[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  const result = regExp.test(email);
  return result;
};
