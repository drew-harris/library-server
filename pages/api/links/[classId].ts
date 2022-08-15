import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { classId } = req.query;
	if (!classId || typeof classId !== "string") {
		return res.status(400).json({ error: "Invalid classId" });
	}
	try {
		const prisma = new PrismaClient();
		const links = await prisma.link.findMany({
			where: {
				class: {
					id: classId,
				},
			},
		});

		return res.status(200).json(links);
	} catch (error: any) {
		return res.status(500).json({ error: error.message });
	}
}
