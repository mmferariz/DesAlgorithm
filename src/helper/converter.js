
const textToBin = (text, bitLength) => {

    let chars = text.split('');

    // Convertir cada caracter a su representación binaria de 8 bits
    let bits = chars.map( c => {
        let asciiCode = c.charCodeAt(0);
        let bin = asciiCode.toString(2).padStart(8, '0');
        return bin;
    });

    // Unir los bits en una sola cadena
    let binText = bits.join('');

    // Validar longitud del texto binText
    if (binText.length < bitLength) {
        // Completar con ceros a la izquierda hasta alcanzar la longitud deseada
        binText = binText.padStart(bitLength, '0');
    } else if (binText.length > bitLength) {
        // Truncar a la longitud deseada
        binText = binText.slice(0, bitLength);
    }

    return binText;

}

const binToText = (binText) => {
    // Validar que la cadena binaria tenga una longitud múltiplo de 8
  if (binText.length % 8 !== 0) {
    console.log('Longitud de cadena binaria inválida. Debe ser un múltiplo de 8.');
    return '';
  }

  // Dividir la cadena binaria en grupos de 8 bits
  let groups = binText.match(/.{8}/g);

  // Convertir cada grupo de 8 bits a su representación decimal
  let dec = groups.map(grupo => parseInt(grupo, 2));

  // Convertir los decimales a caracteres
  let res = dec.map(decimal => String.fromCharCode(decimal)).join('');

  return res;
}

export { textToBin, binToText }