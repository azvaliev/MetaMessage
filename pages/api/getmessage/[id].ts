import { NextApiResponse } from "next";
import { Client } from "redis-om";

export default async function handler(
	{ query: { id }},
	res: NextApiResponse
) {
	const client = new Client();
	if (!client.isOpen()) {
		await client.open(
			process.env.API_URL
		);
	}
	try {
		const msg = await client.execute(["GET", id]);
		await client.execute(["DEL", id]);
		await client.execute(["QUIT"]);
		res.status(200).json(msg);
	} catch (err) {
		await client.execute(["QUIT"]);
		res.status(404);
	}
}
