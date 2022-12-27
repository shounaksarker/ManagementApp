import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import prisma from "../../../lib/prisma";
//import controller
const handler = nextConnect<NextApiRequest, NextApiResponse>();
handler.get(
    async (req, res) => {
        
        
        const user = await prisma.user.findMany({
            where:{type:"Home"},
            include:{Home: true}
        });
        return res.json(user);
        
    }
)
export default handler;