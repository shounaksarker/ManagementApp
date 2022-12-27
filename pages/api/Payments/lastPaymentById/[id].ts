import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import prisma from "../../../../lib/prisma";
//import controller
const handler = nextConnect<NextApiRequest, NextApiResponse>();
handler.get(
    async (req, res) => {
        const Id = req.query.id as string;
        const getPayment = await prisma.payment.findMany({
            where: {
                status: "Income",
                userId: Number(Id)
            }
        });
        // if (getPayment.length > 0) {


        // }

         return res.json({ "lastPayment": getPayment[getPayment.length - 1].createdAt });
        //return res.json(getPayment)

    }
)
export default handler;