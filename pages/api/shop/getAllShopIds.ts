import { Shop } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import prisma from "../../../lib/prisma";
//import controller
const handler = nextConnect<NextApiRequest, NextApiResponse>();
handler.get(
    async (req, res) => {
        let shopIds:number[] = [];
        const shop = await prisma.shop.findMany();
        shop?.map((item:Shop)=>shopIds.push(item.shop_id));
        res.json(shopIds);

        
    }
)
export default handler;