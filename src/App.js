import React, { useState } from "react";
import helper from "./helper/index";
import { textToBin, binToText } from "./helper/converter"
import { checkPass, generatePass } from "./helper/passwordChecker";

const App = () => {

  const [plainText, setPlainText] = useState("");
  const [auxPlainText, setAuxPlainText] = useState("");
  const [mainKey, setMainKey] = useState("");
  const [auxMainKey, setAuxMainKey] = useState("");
  const [text, setText] = useState("");
  const [cipheredBit1, setCipheredBit1] = useState("");
  const [cipheredBit8, setCipheredBit8] = useState("");
  const [cipheredBit16, setCipheredBit16] = useState("");
  const [cipheredBit32, setCipheredBit32] = useState("");
  const [cipheredText1, setCipheredText1] = useState("");
  const [cipheredText8, setCipheredText8] = useState("");
  const [cipheredText16, setCipheredText16] = useState("");
  const [cipheredText32, setCipheredText32] = useState("");
  const [deCipheredBit1, setDeCipheredBit1] = useState("");
  const [deCipheredBit8, setDeCipheredBit8] = useState("");
  const [deCipheredBit16, setDeCipheredBit16] = useState("");
  const [deCipheredBit32, setDeCipheredBit32] = useState("");
  const [deCipheredText1, setDeCipheredText1] = useState("");
  const [deCipheredText8, setDeCipheredText8] = useState("");
  const [deCipheredText16, setDeCipheredText16] = useState("");
  const [deCipheredText32, setDeCipheredText32] = useState("");
  const [cipheredText_1, setCipheredText_1] = useState("");
  const [cipheredText_8, setCipheredText_8] = useState("");
  const [cipheredText_16, setCipheredText_16] = useState("");
  const [cipheredText_32, setCipheredText_32] = useState("");
  const [keys1, setKeys1] = useState([]);
  const [keys8, setKeys8] = useState([]);
  const [keys16, setKeys16] = useState([]);
  const [keys32, setKeys32] = useState([]);
  const [changes1, setChanges1] = useState(0);
  const [changes8, setChanges8] = useState(0);
  const [changes16, setChanges16] = useState(0);
  const [changes32, setChanges32] = useState(0);
  const [weakKey, setWeakKey] = useState("");
  const [keys_32, setKeys_32] = useState([]);
  const [message, setMessage] = useState("");
  const [isAutogenerate, setIsAutogenerate] = useState(false)
  const [isShowBit, setIsShowBit] = useState(false)

  const setCipheredText = () => {
    console.log(auxMainKey)
    if(!auxMainKey || !auxPlainText){
      alert("No keys generated")
      return
    }
    const auxBits1 = helper.DES(auxPlainText, keys1, 1, auxPlainText.length)
    const auxBits8 = helper.DES(auxPlainText, keys8, 8, auxPlainText.length)
    const auxBits16 = helper.DES(auxPlainText, keys16, 16, auxPlainText.length)
    const auxBits32 = helper.DES(auxPlainText, keys32, 32, auxPlainText.length)
    setCipheredBit1(auxBits1);
    setCipheredBit8(auxBits8);
    setCipheredBit16(auxBits16);
    setCipheredBit32(auxBits32);
    setCipheredText1(binToText(auxBits1))
    setCipheredText8(binToText(auxBits8))
    setCipheredText16(binToText(auxBits16))
    setCipheredText32(binToText(auxBits32))
  }

  const setDeCipheredText = () => {
    keys1.reverse();
    keys8.reverse();
    keys16.reverse();
    keys32.reverse();
    const auxBits1 = helper.DES(cipheredBit1, keys1, 1, cipheredBit1.length)
    const auxBits8 = helper.DES(cipheredBit8, keys8, 8, cipheredBit8.length)
    const auxBits16 = helper.DES(cipheredBit16, keys16, 16, cipheredBit16.length)
    const auxBits32 = helper.DES(cipheredBit32, keys32, 32, cipheredBit32.length)
    setDeCipheredBit1(auxBits1);
    setDeCipheredBit8(auxBits8);
    setDeCipheredBit16(auxBits16);
    setDeCipheredBit32(auxBits32);
    setDeCipheredText1(binToText(auxBits1))
    setDeCipheredText8(binToText(auxBits8))
    setDeCipheredText16(binToText(auxBits16))
    setDeCipheredText32(binToText(auxBits32))
    keys1.reverse();
    keys8.reverse();
    keys16.reverse();
    keys32.reverse();
  }
  
  const generateKeys = () => {

    // AUTOGENERATE OR VALIDATE COMPLEXITY KEY
    let tempPass = ""
    if(isAutogenerate) {
      do {
        tempPass = generatePass(plainText.length)
        // console.log(tempPass)
        // console.log(checkPass(tempPass).level)
      } while (checkPass(tempPass).level < 3)
      setMainKey(tempPass)

      if(!plainText.length) {
        alert("Plain Text & Key can´t be empty.");
        return
      }

      if(plainText.length > 16 || tempPass.length > 16 || tempPass.length !== plainText.length){
        alert("Plain Text & Key Length must be less than 16 characters and with the same length.")
        return 
      }
    } else {
      let validateResponse = checkPass(mainKey) 

      if(validateResponse.level < 3) {
        alert(`Your Key is ${validateResponse.complexity}, please use a stronger Key.`)
        return
      }

      if(!plainText.length || !mainKey.length) {
        alert("Plain Text & Key can´t be empty.");
        return
      }

      if(plainText.length > 16 || mainKey.length > 16 || mainKey.length !== plainText.length){
        alert("Plain Text & Key Length must be less than 16 characters and with the same length.")
        return 
      }
    }

    let finalKey = ""
    let finalBitText = ""
    if(plainText.length <= 4){
      finalKey = textToBin(isAutogenerate ? tempPass : mainKey, 32)
      finalBitText = textToBin(plainText, 32)
    } else if (plainText.length <= 8) {
      finalKey = textToBin(isAutogenerate ? tempPass : mainKey, 64)
      finalBitText = textToBin(plainText, 64)
    } else {
      finalKey = textToBin(isAutogenerate ? tempPass : mainKey, 128)
      finalBitText = textToBin(plainText, 128)
    }
    setAuxMainKey(finalKey)
    setAuxPlainText(finalBitText)
    
    setKeys1(helper.generate_keys(1, finalBitText.length, "", finalKey));
    setKeys8(helper.generate_keys(8, finalBitText.length, "", finalKey));
    setKeys16(helper.generate_keys(16, finalBitText.length, "", finalKey));
    setKeys32(helper.generate_keys(32, finalBitText.length, "", finalKey));
  }

  const printKeys = (props, index) => {
      return <div key={index}> <b> Key For Round {index + 1} </b> = {props} </div>
  }

  const diff = (a,b) => {
    let count = 0, i = 0;
    while (i<a.length)
    {
      if(a[i] !== b[i]) count++;
      i++;
    }
    return count;
  }

  const showEffect = () => {
    const text1 = helper.DES(text, keys1, 1, text.length);
    const text8 = helper.DES(text, keys8, 8, text.length);
    const text16 = helper.DES(text, keys16, 16, text.length);
    const text32 = helper.DES(text, keys32, 32, text.length);
    setCipheredText_1(text1);
    setCipheredText_8(text8);
    setCipheredText_16(text16);
    setCipheredText_32(text32);
    setChanges1(diff(text1, cipheredBit1));
    setChanges8(diff(text8, cipheredBit8));
    setChanges16(diff(text16, cipheredBit16));
    setChanges32(diff(text32, cipheredBit32));
  }

  const generate_Keys = () => {
    setKeys_32(helper.generate_keys(32, weakKey.length, weakKey, auxMainKey));
    const keys = helper.generate_keys(32, weakKey.length, weakKey, auxMainKey);
    let i = 0;
    let st = new Set();
    for (i = 0; i <= keys.length; i++) st.add(keys[i]);
    if(st.size <= 16) setMessage("Given Key is Weak");
    else setMessage("Given key is not Weak");
    console.log(st.size);
  }

  return (
    <div className="text-center mb-5 mt-5">

      {/* HEADING */}
      <h1> DES </h1>

      <form>

        {/* TAKING INPUT FOR PLAIN TEXT */}
        <input className="mt-3 customInput" type = "text" value = {plainText} onChange = {(e) => setPlainText(e.target.value)} placeholder = "Enter Plain Text (max: 16 characters)." />

        {/* TAKING INPUT FOR KEY */}
        <input className="mt-3 customInput" type = "text" disabled={isAutogenerate} value={mainKey} onChange = {(e) => setMainKey(e.target.value)} placeholder = "Enter Key (max: 16 characters)." />

        {/* TAKING CHECKBOX TO GENERATE KEY */}
        <div className="custom-control custom-switch mt-3">
          <input type="checkbox" className="custom-control-input" id="generatePass" name="generatePass" value={isAutogenerate} onChange={() => {
            setIsAutogenerate(!isAutogenerate)
            setMainKey("")
            setAuxMainKey("")
          } }/> 
          <label className="custom-control-label" htmlFor="generatePass">Auto-generate Password</label>
        </div>

      </form>
      
      {/* GENERATING KEYS */}
      <div> <button className="btn btn-dark mt-2" onClick={() => generateKeys()}> Generate & Print Keys </button> </div>

      {/* PRINTING KEYS */}
      <div className="mt-3 block"> {(keys32.length > 0) ? keys32.map(printKeys) : <span> No Keys Generated </span>} </div>

      <div className="custom-control custom-switch">
        <input onChange={() => setIsShowBit(!isShowBit)} value={isShowBit} type="checkbox" className="custom-control-input" id="customSwitch1"/>
        <label className="custom-control-label" htmlFor="customSwitch1">Show in bits format</label>
      </div>
      {/* ENCRYPTING THE PLAIN TEXT */}
      <div> <button className="btn btn-dark mt-2" onClick={() => setCipheredText()}> Cipher It </button> </div>
      {
        isShowBit ? <div className="block">
          <div className="mt-2"> <b> Ciphered Bit for Number of rounds equal to 1 = {cipheredBit1} </b> </div>
          <div className="mt-2"> <b> Ciphered Bit for Number of rounds equal to 8 = {cipheredBit8} </b> </div>
          <div className="mt-2"> <b> Ciphered Bit for Number of rounds equal to 16 = {cipheredBit16} </b> </div>
          <div className="mt-2"> <b> Ciphered Bit for Number of rounds equal to 32 = {cipheredBit32} </b> </div>
        </div> : 
        <div className="block">
          <div className="mt-2"> <b> Ciphered Text for Number of rounds equal to 1 = {cipheredText1} </b> </div>
          <div className="mt-2"> <b> Ciphered Text for Number of rounds equal to 8 = {cipheredText8} </b> </div>
          <div className="mt-2"> <b> Ciphered Text for Number of rounds equal to 16 = {cipheredText16} </b> </div>
          <div className="mt-2"> <b> Ciphered Text for Number of rounds equal to 32 = {cipheredText32} </b> </div>
        </div>
      }


      {/* DECRYPTING THE CIPHER TEXT */}
      <div> <button className="btn btn-dark mt-2" onClick={() => setDeCipheredText()}> DeCipher It </button> </div>
      {
        isShowBit ? <div className="block">
          <div className="mt-2"> <b> Deciphered Bit for Number of rounds equal to 1 = {deCipheredBit1} </b> </div>
          <div className="mt-2"> <b> Deciphered Bit for Number of rounds equal to 8 = {deCipheredBit8} </b> </div>
          <div className="mt-2"> <b> Deciphered Bit for Number of rounds equal to 16 = {deCipheredBit16} </b> </div>
          <div className="mt-2"> <b> Deciphered Bit for Number of rounds equal to 32 = {deCipheredBit32} </b> </div>
        </div> : 
        <div className="block">
          <div className="mt-2"> <b> Deciphered Text for Number of rounds equal to 1 = {deCipheredText1} </b> </div>
          <div className="mt-2"> <b> Deciphered Text for Number of rounds equal to 8 = {deCipheredText8} </b> </div>
          <div className="mt-2"> <b> Deciphered Text for Number of rounds equal to 16 = {deCipheredText16} </b> </div>
          <div className="mt-2"> <b> Deciphered Text for Number of rounds equal to 32 = {deCipheredText32} </b> </div>
        </div>
      }

      {/* AVALANCHE EFFECT PART
      <h2 className="mt-5"> Avalanche Effect </h2>
      <p> Change any 1 or 2 bits in above plain text, then again create cipher text to see avalanche effect</p>      
      <input type = "text" value = {text} onChange = {(e) => setText(e.target.value)} placeholder = "Enter Above Plain Text with 1 or 2 bits changed" />
      <div><button className="btn btn-dark mt-3" onClick={() => showEffect()}> Cipher It </button> </div>
      <div className="block">
        <div className="mt-2"> <b> Ciphered Text for Number of rounds equal to 1 = {cipheredText_1} </b> <br /> <i> ({changes1} changes from original cipher text) </i> </div>
        <div className="mt-2"> <b> Ciphered Text for Number of rounds equal to 8 = {cipheredText_8} </b> <br /> <i> ({changes8} changes from original cipher text) </i> </div>
        <div className="mt-2"> <b> Ciphered Text for Number of rounds equal to 16 = {cipheredText_16} </b> <br /> <i> ({changes16} changes from original cipher text) </i> </div>
        <div className="mt-2"> <b> Ciphered Text for Number of rounds equal to 32 = {cipheredText_32} </b> <br /> <i> ({changes32} changes from original cipher text) </i> </div>
      </div> */}

      {/* EFFECT OF WEAK KEYS PART
      <h2 className="mt-5"> Effect of Weak Keys </h2>
      <div>
      <input type = "text" value = {weakKey} onChange = {(e) => setWeakKey(e.target.value)} placeholder = "Enter Key (32, 64, or 128 bit binary) to generate round keys & check if it is weak or not"/>
        <div> <button className="btn btn-dark mt-3" onClick={() => generate_Keys()}> Generate & Print Keys </button> </div>
        <div className="mt-3"> <b> {message} </b> </div>
        <div className="mt-3 block"> {(keys_32.length > 0) ? keys_32.map(printKeys) : <span> No Keys Generated </span>} </div>
      </div> */}
    </div>
  );
}

export default App;