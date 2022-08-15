import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const createLinkInput = z.object({
	classId: z.string(),
	url: z.string(),
	name: z.string(),
});

async function createLink(req: NextApiRequest, res: NextApiResponse) {
	let body = null;
	try {
		body = createLinkInput.parse(req.body);
	} catch (error: any) {
		return res.status(400).json({ error: "Invalid body" });
	}
	if (!body) {
		return res.status(500).json({
			error: "Internal error",
		});
	}

	try {
		const prisma = new PrismaClient();
		const createdLink = await prisma.link.create({
			data: {
				class: {
					connect: {
						id: body.classId,
					},
				},
				name: body.name,
				url: body.url,
			},
		});
		res.status(200).json(createdLink);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
}

async function getAllLinks(req: NextApiRequest, res: NextApiResponse) {
	try {
		const prisma = new PrismaClient();
		const links = await prisma.link.findMany({
			include: {
				class: true,
			},
		});
		return res.status(200).json(links);
	} catch (err: any) {
		return res.status(500).json({ error: err.message });
	}
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case "POST":
			return createLink(req, res);
		case "GET":
			return getAllLinks(req, res);
		default:
			res.status(405).json({ error: `Method ${req.method} Not Allowed` });
	}
}
