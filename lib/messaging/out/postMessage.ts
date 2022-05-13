const PostMessage = async (key: string, message: string) => {
	const data = { "key": key, "message": message };
	const res = await fetch("/api/sendmessage", {
		body: JSON.stringify(data),
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json"
		},
		method: "POST"
	});
	return res;
};
export default PostMessage;
