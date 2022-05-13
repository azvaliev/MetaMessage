import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "redis";

const EXPIRATION_3_DAYS = 259200;

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const client = createClient({
		url: process.env.REDIS_URL
	});

	await client.connect();
	
	const key = req.body.key;
	const messageData = req.body.message;
	client.SET(key, messageData, {
		EX: EXPIRATION_3_DAYS
	}).then(async () => {
		try {
			await client.disconnect();
			res.status(200).send("success!");
		} catch (err) {
			res.status(200).send("success!");
		}
	}).catch(async err => {
		await client.disconnect();
		res.status(500).json(err);
	});

}
