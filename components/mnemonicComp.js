import { useState } from "react";
import createMnemonic from "../utils/createMnemonic";

function MnemonicComp() {
  const [seed, setSeed] = useState("");
  const [mnemonic, setMnemonic] = useState(null);

  return (
    <div>
      <input
        className="mneu"
        type="text"
        value={seed}
        onChange={(e) => {
          setSeed(e.target.value);
        }}
      />
      <button
        className="login-btn"
        disabled={!!mnemonic}
        onClick={() => {
          if (!seed) {
            return alert("Seed cant be empty");
          }
          const mnemonic = createMnemonic(seed);
          setMnemonic(mnemonic);
        }}
      >
        {mnemonic ?? "Create mnemonic"}
      </button>
    </div>
  );
}

export default MnemonicComp;
