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

    await encryptBlocks(blocks, publicKey);
  };

  reader.readAsArrayBuffer(file);
};

export const encryptBlocks = async (blocks, key) => {
  const encryptedBlocks = await Promise.all(
    blocks.map((block) => {
      const blockBuffer = Buffer;

      const encrypted = window.crypto.subtle.encrypt(
        { name: "RSA-OAEP" },
        key,
        block
      );
      return encrypted;
    })
  );

  const encryptedData = await encryptedBlocks.map((block) => {
    return { block: arrayBufferToBase64(block) };
  });

  return encryptedData;
};
