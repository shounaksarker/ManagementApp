import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import prisma from "../../../../lib/prisma";
//import controller
const handler = nextConnect<NextApiRequest, NextApiResponse>();
handler.get(
    async (req, res) => {
        
        const id = req.query.id;
        const user = await prisma.user.findUnique({
            where: {
                user_id: Number(id)
            }
        });
        
        return res.json(user);
        
    }
)
export default handler;