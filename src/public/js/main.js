import { importKey } from "./helpers/import.key.js";
import { fetchPublicKey } from "./helpers/fetch.public.key.js";
import { encryptDoc } from "./helpers/read.docx.js";

const button = document.getElementById("confirm-button");

const uploadFile = async () => {
  const input = document.getElementById("input-word");
  const file = input.files[0];

  if (file) {
    const binaryKey = await fetchPublicKey();
    const publicKeyCrypto = await importKey(binaryKey);

    const chunks = await encryptDoc(file, publicKeyCrypto, 8192);
    console.log(chunks);
  }
};

button.addEventListener("click", uploadFile);
