import { Payment, User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import prisma from "../../../../lib/prisma";
//import controller
interface OBJ {
    payments: Payment,
    user: User | null,
}
const handler = nextConnect<NextApiRequest, NextApiResponse>();
handler.get(
    async (req, res) => {
        const paymentId = req.query.id as string;
        const getPayment = await prisma.shoshan.findUnique({
            where: {
                id: Number(paymentId),
            },
            include: {
                payment: true
            }
        });
    
        
        
        return res.json(getPayment);
        
    }
)
export default handler;