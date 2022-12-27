import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import prisma from "../../../lib/prisma";
//import controller
const handler = nextConnect<NextApiRequest, NextApiResponse>();
handler.get(
    async (req, res) => {
        
        
        const shoshan = await prisma.shoshan.findMany(
           {
            include: {
                payment: true
            }
           }
        );
        res.json(shoshan);
        
    }
)
export default handler;