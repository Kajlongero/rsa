export const importKey = async (arrBuffer) => {
  const publicKey = await window.crypto.subtle.importKey(
    "spki",
    arrBuffer.buffer,
    {
      name: "RSA-OAEP",
      hash: "SHA-256",
    },
    false,
    ["encrypt"]
  );

  return publicKey;
};
