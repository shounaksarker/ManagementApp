import { Payment, Shoshan } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import prisma from "../../../lib/prisma";
//import controller
const handler = nextConnect<NextApiRequest, NextApiResponse>();
handler.post(async (req, res) => {
  const { pay } = req.body;
  const payment: Payment = await prisma.payment.create({
    data: {
      type: pay.type,
      amount: Number(pay.amount),
      date: pay.date,
      status: "Income",
    },
  });
  const payment2: Shoshan = await prisma.shoshan.create({
    data: {
      paymentId: payment.id,
      name: pay.name,
      fatherName: pay.fatherName,
      motherName: pay.motherName,
      address: pay.address,
      reference: pay.reference,
      relation: pay.relation,
      type: pay.shoshanType,
      amount: Number(pay.amount),
    },
  });
  return res.json({
    payement: payment,
    shoshan: payment2,
  });
});
export default handler;
