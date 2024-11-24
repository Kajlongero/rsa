export async function fetchPublicKey() {
  const response = await fetch("http://localhost:3000/docs/public-key", {
    headers: {
      "Content-Type": "text/plain",
    },
  });
  const publicKeyPem = await response.text();
  const formated = publicKeyPem
    .replace("-----END PUBLIC KEY-----", "")
    .replace("-----BEGIN PUBLIC KEY-----", "")
    .trim();

  const binary = atob(formated);

  const arrBuffer = new Uint8Array(binary.length).map((_, i) =>
    binary.charCodeAt(i)
  );

  return arrBuffer;
}
