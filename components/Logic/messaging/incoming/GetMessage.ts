const GetMessage = async (key: string) => {
  let res = await fetch(`/api/message/${key}`, {
    method: "GET",
  });
  const result = await res.json();
  return result;
};
export default GetMessage;
