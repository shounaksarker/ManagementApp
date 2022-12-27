import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import prisma from "../../../../lib/prisma";
//import controller
const handler = nextConnect<NextApiRequest, NextApiResponse>();
handler.get(
    async (req, res) => {
        const paymentType = req.query.type as string;
        const getPayment = await prisma.payment.findMany({
            where: {
                status: "Expense",
                type: paymentType
            }
        });

        return res.json(getPayment);

    }
)
export default handler;