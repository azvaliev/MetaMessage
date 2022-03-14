import {NextApiResponse} from "next";
import {Client} from "redis-om";
export default async function handler({query: {id}}, res: NextApiResponse) {
	const client = new Client();
	if (!client.isOpen()) {
		client.open("redis://metamsgapp:jokfo8-tIxxad-wotpac@redis-15336.c232.us-east-1-2.ec2.cloud.redislabs.com:15336");
	}
	const msg = await client.execute(["GET", id]);
	client.close();
	res.status(200).json(msg);
}
