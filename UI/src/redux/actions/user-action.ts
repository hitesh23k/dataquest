export const addUserWalletAddress = (address: string) => {
  return {
    type: 'ADD_USER_ADDRESS',
    payload: address,
  };
};

export const checkUserLogin = (isLogin: boolean) => {
  return {
    type: 'LOGGED_IN',
    payload: isLogin,
  };
};
