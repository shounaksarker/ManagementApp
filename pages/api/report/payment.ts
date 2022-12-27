import { Payment } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import prisma from "../../../lib/prisma";
//import controller
const handler = nextConnect<NextApiRequest, NextApiResponse>();
handler.get(
    async (req, res) => {
        const { dates } = req.body;
        
        // const getPaymentByDate = await prisma.payment.findMany({
        //     where: {
        //         date: {
        //             gte: new Date(startDate),
        //             lte: new Date(endDate),
        //         },
        //         status:"Income",
        //   }
        // })
       
        
        // return res.json(getPaymentByDate);    

        
    }
)
export default handler;