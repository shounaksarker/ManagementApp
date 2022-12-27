import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import prisma from "../../../lib/prisma";
//import controller
const handler = nextConnect<NextApiRequest, NextApiResponse>();
handler.get(
    async (req, res) => {
        const home = await prisma.home.findFirst({
            where: {
                users: null
            }
        })
       
        res.json(home?.home_id);

    }
)
export default handler;