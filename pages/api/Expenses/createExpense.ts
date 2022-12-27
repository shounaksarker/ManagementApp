import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import prisma from "../../../lib/prisma";
//import controller
const handler = nextConnect<NextApiRequest, NextApiResponse>();
handler.post(
    async (req, res) => {
        
        const { pay } = req.body;
         
          const  payment = await prisma.payment.create({
                data: {
                    type: pay.type,
                    amount: Number(pay.amount),
                    date: pay.date,
                    status: "Expense" 
                }
            })           
            return res.json(payment);
            
        
        
    }
)
export default handler;