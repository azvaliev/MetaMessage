import { NextApiResponse } from "next";
import { createClient } from "redis";

export default async function handler(
	{ query: { id }},
	res: NextApiResponse
) {
	const client = createClient({
		url: process.env.REDIS_URL
	});

	await client.connect();

	try {
		const message = await client.GET(id);
		await client.disconnect();
		res.status(200).json(message);
	} catch (err) {
		await client.disconnect();
		res.status(404);
	}
}
