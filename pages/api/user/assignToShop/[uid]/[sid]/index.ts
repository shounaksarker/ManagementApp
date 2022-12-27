import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import prisma from "../../../../../../lib/prisma";
//import controller
const handler = nextConnect<NextApiRequest, NextApiResponse>();
handler.post(
    async (req, res) => {
        const uid = req.query.uid;
        const sid = req.query.sid; 
        
        const shop = await prisma.shop.update({
            where: { shop_id: Number(sid) },
            data:{users:{connect:{user_id:Number(uid)}}}
        })
        res.json(shop);
        
        
    }
)
export default handler;