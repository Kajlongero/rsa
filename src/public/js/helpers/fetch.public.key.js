export async function fetchPublicKey() {
  const response = await fetch(
    "https://192.168.89.22:8081/public-key/publickey.pem",
    {
      headers: {
        "Content-Type": "text/plain",
      },
    }
  );
  const publicKeyPem = await response.text();
  const formated = publicKeyPem
    .replaceAll("-", "")
    .replaceAll("BEGIN PUBLIC KEY", "")
    .replaceAll("END PUBLIC KEY", "")
    .trim();

  const binary = atob(formated);

  const arrBuffer = new Uint8Array(binary.length).map((_, i) =>
    binary.charCodeAt(i)
  );

  // const binaryDer = new Uint8Array(binaryDerString.length);
  // for (let i = 0; i < binaryDerString.length; i++) {
  //   binaryDer[i] = binaryDerString.charCodeAt(i);
  // }
  // return binaryDer.buffer;

  return arrBuffer;
}
