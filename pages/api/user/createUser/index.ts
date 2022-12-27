import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import prisma from "../../../../lib/prisma";
//import controller
const handler = nextConnect<NextApiRequest, NextApiResponse>();
handler.post(async (req, res) => {
  const { name, fatherName, nid, mobile, dueAmount, userType, typeId,clearUpto } =
    req.body;

  if (userType === "Shop") {
    let shopId1: number[] = [];
    const shop = await prisma.shop.findMany({
      select: {
        shop_id: true,
      },
    });
    shop.map((shop) => {
      shopId1.push(shop.shop_id);
    });
    const stat1 = shopId1.includes(Number(typeId));
    if (stat1) {
      const shopHomes = await prisma.user.findMany({
        select: {
          shopId: true,
        },
      });
      let shopId2: number[] = [];
      shopHomes.map((shopHome) => {
        if (shopHome.shopId === null) {
        } else {
          shopId2.push(shopHome.shopId);
        }
      });
      const stat2 = shopId2.includes(Number(typeId));
      if (stat2) {
        return res.status(202).json({
          status: "Failed",
          message: "Shop Already Assigned",
        });
      } else {
        const createuser = await prisma.user.create({
          data: {
            name: name,
            fatherName: fatherName,
            nid: Number(nid),
            mobiile: Number(mobile),
            dueAmount: dueAmount,
            clearUpto: clearUpto,
            paidAmount: 0,
            type: userType,
            shopId: Number(typeId),
          },
        });
        if (createuser) {
          return res.status(200).json({
            status: "success",
            message: "Shop user created successfully",
          });
        }
      }
    } else {
      return res.status(203).json({
        status: "Failed",
        message: "Shop Id not created Yet",
      });
    }
  } else if (userType === "Home") {
    let homeId1: number[] = [];
    const homes = await prisma.home.findMany({
      select: {
        home_id: true,
      },
    });
    homes.map((home) => {
      homeId1.push(home.home_id);
    });
    const stat1 = homeId1.includes(Number(typeId));

    if (stat1) {
      const userHomes = await prisma.user.findMany({
        select: {
          homeId: true,
        },
      });
      let homeId2: number[] = [];
      userHomes.map((userHome) => {
        if (userHome.homeId === null) {
        } else {
          homeId2.push(userHome.homeId);
        }
      });
      const stat2 = homeId2.includes(Number(typeId));
      if (stat2) {
        return res.status(202).json({
          status: "Failed",
          message: "Home Already Assigned",
        });
      } else {
        const createuser = await prisma.user.create({
          data: {
            name: name,
            fatherName: fatherName,
            nid: Number(nid),
            mobiile: Number(mobile),
            dueAmount: dueAmount,
            paidAmount: 0,
            clearUpto: clearUpto,
            type: userType,
            homeId: Number(typeId),
          },
        });
        if (createuser) {
          return res.status(200).json({
            status: "success",
            message: "Home user created successfully",
          });
        } else {
          res.status(400).json({
            status: 400,
            message: "Invalid Type",
          });
        }
      }
    } else {
      return res.status(203).json({
        status: "Failed",
        message: "Home Id not created Yet",
      });
    }
  } else {
    return res.status(202).json({
      status: "Failed",
      message: "Invalid Type",
    });
  }
});
export default handler;
