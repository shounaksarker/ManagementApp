import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import prisma from "../../../../lib/prisma";
//import controller
const handler = nextConnect<NextApiRequest, NextApiResponse>();
handler.post(
    async (req, res) => {
        const { rate } = req.body
    
        const home = await prisma.home.create({
            data: {
                ratePerMonth: Number(rate),
            }
        })
        res.json(home)
    }
)
export default handler;