const crypto = require("crypto");

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
      return crypto.privateDecrypt(
        {
          key: key,
          padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
          oaepHash: "SHA-256",
        },
        Buffer.from(chunk)
      );
    } catch (error) {
      return null;
    }
  }

  #cleanKey(key) {
    let newKey = key;

    newKey = key
      .replace("-----BEGIN PRIVATE KEY-----", "")
      .replace("-----END PRIVATE KEY-----", "")
      .trim();

    return newKey;
  }

  async handleFile(base64Array, key) {
    const arrayBuffer = await this.#base64ToArrayBuffer(base64Array);
    const cryptoKey = this.#cleanKey(key);

    const chunks = await Promise.all(
      arrayBuffer.map((chunk) => {
        return this.#decryptChunk(chunk, cryptoKey);
      })
    );
    console.log(chunks);
  }
}

module.exports = DocsController;
