export const convertToBase64 = (chunks) => {
  const arrayBuffers = chunks.map((buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  });

  return arrayBuffers;
};
