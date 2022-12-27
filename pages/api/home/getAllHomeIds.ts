import { Home } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import prisma from "../../../lib/prisma";
//import controller
const handler = nextConnect<NextApiRequest, NextApiResponse>();
handler.get(
    async (req, res) => {
        let homeIds:number[] = [];
        const home = await prisma.home.findMany();
        home?.map((item:Home)=>homeIds.push(item.home_id));
        res.json(homeIds);

        
    }
)
export default handler;