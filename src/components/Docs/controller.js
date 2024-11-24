const crypto = require("crypto");
const fs = require("fs");

class DocsController {
  async #base64ToArrayBuffer(base64Array) {
    const arrayBuffer = base64Array.map((base64) => {
      const binaryString = atob(base64);
      const size = binaryString.length;
      const bytes = new Uint8Array(size);
      for (let i = 0; i < size; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return bytes.buffer;
    });

    return arrayBuffer;
  }

  async #decryptChunk(chunk, key) {
    try {
      const decrypt = await crypto.privateDecrypt(
        {
          key: key,
          padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
          oaepHash: "SHA-256",
        },
        Buffer.from(chunk)
      );
      return decrypt;
    } catch (error) {
      return null;
    }
  }

  async handleFile(base64Array, key) {
    console.log(base64Array);
    const arrayBuffer = await this.#base64ToArrayBuffer(base64Array);

    const chunks = await Promise.all(
      arrayBuffer.map((chunk) => {
        return this.#decryptChunk(chunk, key);
      })
    );

    const filterchunks = chunks.filter((c) => c !== null);
    const combinedBuffer = Buffer.concat(filterchunks);

    const outputFilePath = `src/output/${crypto.randomUUID()}.docx`;
    fs.writeFileSync(outputFilePath, combinedBuffer);

    return {
      message: "File handled successfully",
    };
  }
}

module.exports = DocsController;
