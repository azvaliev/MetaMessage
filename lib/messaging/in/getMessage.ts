const getMessage = async (key: string) => {
	const res = await fetch(`/api/getmessage/${key}`, {
		method: "GET"
	});
	return res.text();
};
export default getMessage;
