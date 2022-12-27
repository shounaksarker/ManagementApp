import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import prisma from "../../../../lib/prisma";
//import controller
const handler = nextConnect<NextApiRequest, NextApiResponse>();
handler.get(
    async (req, res) => {
        const shop = await prisma.shop.findMany();
        const newId = shop.length + 1;
        res.json(newId);
        
    }
)
export default handler;