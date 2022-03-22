import { NextApiResponse } from "next";
import { Client } from "redis-om";

export default async function handler({query: {id}}, res: NextApiResponse) {
	const client = new Client();
	if (!client.isOpen()) {
		client.open("redis://metamsgapp:jokfo8-tIxxad-wotpac@redis-16110.c14.us-east-1-2.ec2.cloud.redislabs.com:16110");
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
