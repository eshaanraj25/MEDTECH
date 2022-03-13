import React from "react";
import ConnectMetamask from '../components/connectMetamask';
import MnemonicComp from '../components/mnemonicComp';
import loginImg from '../assets/bg-01.png'

function LoginUser() {
  return (
    <div >
    LOGIN
        <MnemonicComp />
        <br />
        <ConnectMetamask />
    
    
    </div>
  )
}
export default LoginUser;