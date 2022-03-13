import { useRouter } from "next/router";
import { useEffect } from "react";
import ConnectMetamask from "../components/connectMetamask";
import MnemonicComp from "../components/mnemonicComp";
import { useWeb3Context } from "../context/Web3Context";

export default function Home() {
  const { currentAccount } = useWeb3Context();
  const router = useRouter();

  useEffect(() => {
    console.log("currentAccount", currentAccount);
    if (currentAccount) {
      router.push("/patient");
    }
  }, [currentAccount]);

  return (
    <div className="container">
      <div className="wrapper">
        <form>
          <h1>Login</h1>
          <MnemonicComp />
          <hr />
          <ConnectMetamask />
        </form>
      </div>
    </div>
  );
}
