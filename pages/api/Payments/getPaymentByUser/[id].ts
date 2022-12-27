import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import prisma from "../../../../lib/prisma";
import { Payment, User } from "@prisma/client";
// import Payment from "../../../../../"
//import controller
interface OBJ {
  payments: Payment[],
  user: User | null,
}
const handler = nextConnect<NextApiRequest, NextApiResponse>();
handler.get(async (req, res) => {
  const userID = req.query.id as string;
  
  const getPayment = await prisma.payment.findMany({
    where: {
      status: "Income",
      userId: Number(userID),
    },
  });
  const getUser = await prisma.user.findUnique({
    where: {
      user_id: Number(userID),
    },
  });
  const paymentHistory: OBJ = {
    payments: getPayment,
    user: getUser
  }
  

  return res.json(paymentHistory);
});
export default handler;
