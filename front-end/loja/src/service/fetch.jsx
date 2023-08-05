

export const fetchUser = async (options,host) => {
  const url = `http://localhost:3000/users${host}`;
  const required = await fetch(url, options);
  const response = await required.json();
  return response;
}
export const fetchTransaction = async (options, host) => {
  const url = `http://localhost:3000/transaction${host}`;
  const required = await fetch(url, options);
  const response = await required.json();
  return response;
}