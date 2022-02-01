export const fetcher = async (...args) => {
  const res = await fetch(...args);
  let payload;
  try {
    if (res.status === 204) return null;
    payload = await res.json();
  } catch (e) {}
  if (res.ok) {
    return payload;
  } else {
    return Promise.reject(payload.error || new Error("Something went wrong"));
  }
};
