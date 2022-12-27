import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import prisma from "../../../../../../lib/prisma";
//import controller
const handler = nextConnect<NextApiRequest, NextApiResponse>();
handler.post(
    async (req, res) => {
        const uid = req.query.uid;
        const hid = req.query.hid; 
        
        const home = await prisma.home.update({
            where: { home_id: Number(hid) },
            data:{users:{connect:{user_id:Number(uid)}}}
        })
        res.json(home);
        
        
    }
)
export default handler;