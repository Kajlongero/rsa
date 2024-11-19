import { convertToBase64 } from "./convert.base.64.js";
import { postChunks } from "./post.chunks.js";

export const encryptDoc = async (file, publicKey, blockSize = 8192) => {
  const reader = new FileReader();

  reader.onload = async () => {
    const arrayBuffer = reader.result;

    let blocks;

    if (arrayBuffer.byteLength <= blockSize) {
      blocks = [arrayBuffer];
    } else {
      blocks = [];
      for (let i = 0; i < arrayBuffer.byteLength; i += blockSize) {
        blocks.push(arrayBuffer.slice(i, i + blockSize));
      }
    }

    const encryptedBlocks = [];

    for (const block of blocks) {
      try {
        const encrypted = await window.crypto.subtle.encrypt(
          { name: "RSA-OAEP" },
          publicKey,
          block
        );
        encryptedBlocks.push(encrypted);
      } catch (error) {
        console.error(`Ya estoy mamao de este error: ${error}`);
      }
    }

    const chunks = convertToBase64(encryptedBlocks);

    try {
      const res = await postChunks(chunks);

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  reader.readAsArrayBuffer(file);

  return reader.result;
};
