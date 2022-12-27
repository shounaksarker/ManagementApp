import { Shop, User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
interface UserExtended extends User {
  Shop: Shop;
}
const ShopOwner = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserExtended[]>();
  const mount = async () => {
    const result = await axios.get(`/api/user/getAllShopOwner`);
    setUser(result.data);
  };
  useEffect(() => {
    mount();
  }, []);
  return (
    <div>
      <h3 className="alert alert-primary">Shop Rentটিয়ার তালিকা</h3>
      <table className="table table-striped text-center">
        <thead>
          <tr>
            <th scope="col">Shop No.</th>
            <th scope="col">Tenant Name</th>
            <th scope="col">Father Name</th>
            <th scope="col">Rent</th>
            <th scope="col">Clear up to</th>
            <th scope="col">Mobile</th>
            <th scope="col">NID</th>
            <th scope="col">Img</th>
            <th scope="col">Edit</th>
            <th scope="col">Payment</th>
          </tr>
        </thead>
        <tbody>
          {user?.map((u, i) => {
            return (
              <tr key={i}>
                <td>{u?.shopId == null ? "Not assigned" : u.shopId}</td>
                <td>{u?.name}</td>
                <td>{u?.fatherName}</td>
                <td>{u?.Shop?.ratePerMonth}</td>
                <td>
                  {u?.clearUpto &&
                    new Date(u?.clearUpto).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                </td>
                <td>{u?.mobiile}</td>
                <td>{u?.nid}</td>
                <td>{u?.image}</td>

                <td>
                  <Button
                    variant="dark"
                    onClick={() => router.push(`/User/EditUser/${u?.user_id}`)}
                  >
                    Edit
                  </Button>
                </td>
                <td>
                  <Button
                    variant="info"
                    onClick={() => {
                      router.push(`/Payments/Shop/${u?.user_id}`);
                      sessionStorage.setItem(
                        "rate_per_month",
                        `${u?.Shop?.ratePerMonth}`
                      );
                    }}
                  >
                    Payment
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default ShopOwner;
