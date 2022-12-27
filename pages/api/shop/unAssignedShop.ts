import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import prisma from "../../../lib/prisma";
//import controller
const handler = nextConnect<NextApiRequest, NextApiResponse>();
handler.get(
    async (req, res) => {
        const shop = await prisma.shop.findFirst({
            where: {
                users: null
            }
        })
       
        res.json(shop?.shop_id);

    }
)
export default handler;