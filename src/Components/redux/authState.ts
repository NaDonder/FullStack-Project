import OnlineUser from "../model/onlineUser";
import UserDetails from "../model/UserDetails";
import jwtDecode from "jwt-decode";

//our redux state
export class AuthState{
    public loginUser:OnlineUser = new OnlineUser();
}

//action types
export enum AuthActionType{
    LoginUser = "LoginUser",
    LogoutUser = "LogoutUser",
    RegisterUser = "RegisterUser",
    LoginUserString = "LoginUserString",
}

//action declaration
export interface AuthAction{
    type:AuthActionType,
    payload?:any,
}

//action functions
export function loginUser(user : OnlineUser):AuthAction{
    return {type: AuthActionType.LoginUser, payload:user}
}

export function logoutUser():AuthAction{
    return {type: AuthActionType.LogoutUser, payload: null}
}

export function registerUser(newUser:UserDetails):AuthAction{
    return {type: AuthActionType.RegisterUser, payload:newUser}
}

export function loginUserString(token:string):AuthAction{
    return {type: AuthActionType.LoginUserString, payload:token}
}

//reducer 
export function authReducer(currentState: AuthState = new AuthState(), action:AuthAction):AuthState{
    const newState = {...currentState};

    switch(action.type){
        case AuthActionType.LoginUser:
            newState.loginUser = action.payload;
            //insert token with value of the token into local storage
            localStorage.setItem("token",action.payload);

            
        break;
        case AuthActionType.LogoutUser:   
            newState.loginUser = new OnlineUser();
            //remove the token from local storage
            localStorage.removeItem("token");
            localStorage.removeItem("clientType")
        break;
        case AuthActionType.RegisterUser:
            //axios->login->data->loginUser

        break;
        case AuthActionType.LoginUserString:
            //get the string, extract the client type, and update the authState
            //save the data to local storage
            newState.loginUser.token = action.payload;
            localStorage.setItem("token",newState.loginUser.token);

            newState.loginUser.clientType = jwtDecode<OnlineUser>(newState.loginUser.token).clientType;
            localStorage.setItem("clientType",newState.loginUser.clientType);

            console.log(newState.loginUser.clientType);

        break;
    }

    return newState;
}
