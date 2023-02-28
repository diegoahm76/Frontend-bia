import { type Dispatch } from "react"
import { login_post } from "../request/authRequest"
import { checking_credentials, login, logout } from "./authSlice"

export const checking_authentication: any = (email: string, password: string) =>{
  return async (dispatch: Dispatch<any>) => {
    dispatch(checking_credentials())

    const resp = await login_post({email, password})

    // podemos enviar mensaje de error al dispatch
    if(resp.ok === false) { 
      dispatch(logout({error_message: resp.error_message}))
      return
    }
    
    dispatch(login(resp.userinfo));
  }
}
