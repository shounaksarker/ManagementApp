import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import prisma from "../../../lib/prisma";
//import controller
const handler = nextConnect<NextApiRequest, NextApiResponse>();
handler.post(
    async (req, res) => {
        
        const { user_id,type,amount,date } = req.body;
        if (type == "homePayment") {
            const user = await prisma.user.findUnique({
                select: {
                    homeId: true
                },
                where: {
                    user_id: Number(user_id)
                }
            });
            if (user?.homeId == null) { 
                return res.status(200).json({
                    status: "Error",
                    message: "User has no home"
                })
            }
            else {
            const  payment = await prisma.payment.create({
                data: {
                    type: type,
                    userId: Number(user_id),
                    amount: Number(amount),
                    date: date,
                    status: "Income" 
                }
            })           
            return res.json(payment);
            }
            
        }
        if (type == "shopPayment") {
            const user = await prisma.user.findUnique({
                select: {
                    shopId: true
                },
                where: {
                    user_id: Number(user_id)
                }
            });
            if (user?.shopId == null) { 
                return res.status(200).json({
                    status: "Error",
                    message: "User has no Shop"
                })
            }
            else {
            const  payment = await prisma.payment.create({
                data: {
                    type: type,
                    userId: Number(user_id),
                    amount: Number(amount),
                    date: date,
                    status: "Income" 
                }
            })           
            return res.json(payment);
            }
            
        }
        
    }
)
export default handler;