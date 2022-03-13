import { entropyToMnemonic } from "bip39";

const createMnemonic = (entropy) => {
  //! alidate and pad entropy
  // console.log(entropy.toString(16));
  // const encode = hexEncode(entropy);
  // console.log(encode);
  // console.log(hexDecode(encode));
  // console.log(binEncode(encode));

  return "a";
  const mnemonic = entropyToMnemonic(entropy);
  return mnemonic;
};
export default createMnemonic;

const hexEncode = (str) => {
  var hex, i;

  var result = "";
  for (i = 0; i < str.length; i++) {
    hex = str.charCodeAt(i).toString(16);
    result += ("000" + hex).slice(-4);
  }

  return result;
};

const hexDecode = (str) => {
  var j;
  var hexes = str.match(/.{1,4}/g) || [];
  var back = "";
  for (j = 0; j < hexes.length; j++) {
    back += String.fromCharCode(parseInt(hexes[j], 16));
  }

  return back;
};

const binEncode = (str) => {
  let output = "";
  for (var i = 0; i < str.length; i++) {
    output += str[i].charCodeAt(0).toString(2) + " ";
  }
  return output;
};
