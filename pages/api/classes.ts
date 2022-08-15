// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const bodyInput = z.object({
	name: z.string(),
});

async function createClass(req: NextApiRequest, res: NextApiResponse) {
	try {
		let body = null;
		try {
			body = bodyInput.parse(req.body);
		} catch (error) {
			return res.status(400).json({ error: "Invalid body" });
		}
		if (!body) {
			return res.status(500).json({
				error: "Internal error",
			});
		}
		const prisma = new PrismaClient();
		const createdClass = await prisma.class.create({
			data: {
				name: body.name,
			},
			include: {
				links: true,
			},
		});
		res.status(200).json(createdClass);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
}

export async function getAllClasses(req: NextApiRequest, res: NextApiResponse) {
	try {
		const prisma = new PrismaClient();
		const classes = await prisma.class.findMany({
			include: {
				links: true,
			},
		});
		return res.status(200).json(classes);
	} catch (err: any) {
		return res.status(500).json({ error: err.message });
	}
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case "POST":
			return createClass(req, res);
		case "GET":
			return getAllClasses(req, res);
		default:
			res.status(405).json({ error: `Method ${req.method} Not Allowed` });
	}
}
