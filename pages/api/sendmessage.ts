import { NextApiRequest, NextApiResponse } from "next";
import { Client } from "redis-om";

const EXPIRATION_3_DAYS = "259200";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const client = new Client();
	if (!client.isOpen()) {
		await client.open(
			process.env.REDIS_URL
		);
	}
	const key = req.body.key;
	const messageData = req.body.message;
	client
		.execute(["SET", key, messageData, "EX", EXPIRATION_3_DAYS])
		.then(async () => {
			try {
				await client.execute(["QUIT"]);
				res.status(200).send("success!");
			} catch (err) {
				res.status(200).send("success!");
			}
		})
		.catch(async err => {
			await client.execute(["QUIT"]);
			res.status(500).json(err);
		});
}
