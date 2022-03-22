const PostMessage = async (key: string, message: string) => {
	let data = {"key": key, "message": message}
	let res = await fetch("/api/sendmessage", {
		body: JSON.stringify(data),
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
		},
		method: "POST",
	});
	return res
};
export default PostMessage;
