import { Payment } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import prisma from "../../../../../../lib/prisma";
//import controller
interface OBJ{
    payments: Payment[],
    total: number,
    type: string
}
const handler = nextConnect<NextApiRequest, NextApiResponse>();
handler.get(
    async (req, res) => {
        const from = req.query.from as string;
        const to = req.query.to as string;
        const type = req.query.type as string;
        
        
        let newArr: number[] = [];
        const getExpenseByDate = await prisma.payment.findMany({
            where: {
                date: {
                    gte: new Date(from),
                    lte: new Date(to),
                },
                status: "Expense",
                type: type
          }
        })
        getExpenseByDate?.map((item: Payment) => {
            newArr.push(item.amount);
        })
        
        const sum = newArr.reduce((a, b) => a + b, 0);

        const expensebydate: OBJ = {
            payments: getExpenseByDate,
            total: sum,
            type: "Expense"
        }; 
        
        return res.json(expensebydate);    

        
    }
)
export default handler;