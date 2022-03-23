import {NextApiRequest, NextApiResponse} from "next";
import {Client} from "redis-om";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const client = new Client();
	if (!client.isOpen()) {
		await client.open(
			"redis://metamsgapp:jokfo8-tIxxad-wotpac@redis-16110.c14.us-east-1-2.ec2.cloud.redislabs.com:16110"

		);
	}
	const key = req.body.key;
	const messageData = req.body.message;
	client
		.execute(["SET", key, messageData, "EX", "259200"])
		.then(async () => {
			await client.execute(["QUIT"]);
			res.status(200).send("success!");
			
		})
		.catch(async err => {
			await client.execute(["QUIT"]);
			res.status(500).json(err);
		});
}
