export const postChunks = async (chunks) => {
  const res = await fetch("http://localhost:3000/docs/upload/chunks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(chunks),
  });

  const data = await res.json();

  return data;
};
