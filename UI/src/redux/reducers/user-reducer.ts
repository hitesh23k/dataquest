import { AnyAction } from 'redux'

interface UserState {
  userWalletAddress: string,
  userLoggedIn:boolean
}

const initialState: UserState = {
  userWalletAddress:'Aditya-Wallet',
  userLoggedIn:false
}

export const userReducer = (state = initialState, action: AnyAction ) => {
  switch (action.type) {
    case "ADD_USER_ADDRESS":
      return { ...state, userWalletAddress:action.payload };
    case "LOGGED_IN":
      return {...state,userLoggedIn:action.payload};  
    default:
      return state;
  }
};
