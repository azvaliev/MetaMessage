import { NextApiResponse } from "next";
import { Client } from "redis-om";

export default async function handler(
	{ query: { id }},
	res: NextApiResponse
) {
	const client = new Client();
	if (!client.isOpen()) {
		await client.open(
			process.env.REDIS_URL
		);
	}
	try {
		const message = await client.execute(["GET", id]) as string;
		await client.execute(["DEL", id]);
		await client.close();
		// await client.execute(["QUIT"]);
		res.status(200).json(message);
	} catch (err) {
		await client.execute(["QUIT"]);
		res.status(404);
	}
}
