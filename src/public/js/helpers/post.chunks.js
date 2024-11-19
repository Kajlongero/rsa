export const postChunks = async (chunks) => {
  console.log(chunks);

  const res = await fetch("https://192.168.89.22:8081/docs/upload/chunks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(chunks),
  });

  const data = await res.json();
};
