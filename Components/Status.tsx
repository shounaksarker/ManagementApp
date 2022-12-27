/* eslint-disable react-hooks/exhaustive-deps */
import {
  faCoins,
  faHouseChimney,
  faShop,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import styles from "./Status.module.css";
const CryptoJS = require("crypto-js");

const Status = () => {
  const [adminName, setAdminName] = useState(); // admin name
  const [shopCount, setShopCount] = useState(0);
  const [homeCount, setHomeCount] = useState(0);
  const [monthlyIncome, setMonthlyIncome] = useState(0);

  // last date of month
  const dt = new Date();
  const last_date = new Date(dt.getFullYear(), dt.getMonth() + 1, 0);
  const fromDate = `${dt.getFullYear()}-${dt.getMonth() + 1}-01`;
  const toDate = `${dt.getFullYear()}-${
    dt.getMonth() + 1
  }-${last_date.getDate()}`;

  const mount = async () => {
    const shops = await axios.get(`/api/user/getAllShopOwner`);
    const homes = await axios.get(`/api/user/getAllHomeOwner`);
    const monthlyIncome = await axios.get(
      `/api/report/totalreport/${fromDate}/${toDate}`
    );

    setShopCount(shops.data.length);
    setHomeCount(homes.data.length);
    setMonthlyIncome(monthlyIncome.data.sumOfIncome);
  };
  useEffect(() => {
    mount();
    // for setting admin name
    const nm = localStorage.getItem(`${process.env.ENQ_N}`);
    let bytes = CryptoJS.AES.decrypt(nm, process.env.SECRET_KEY);
    let nms = bytes.toString(CryptoJS.enc.Utf8);
    setAdminName(nms);
  }, []);

  const shopIcon = <FontAwesomeIcon icon={faShop} />;
  const homeIcon = <FontAwesomeIcon icon={faHouseChimney} />;
  const coinIcon = <FontAwesomeIcon icon={faCoins} />;

  const router = useRouter();

  return (
    <div className={`${styles.status} p-4`}>
      <h3>Welcome {adminName}</h3>
      <hr />
      <Row className="justify-content-around">
        {/* ----- blue box ----- */}
        <Col
          md={3}
          className={`${styles.box} ${styles.clrBlu} d-flex flex-column px-0 pt-3`}
        >
          <span className={styles.icon}>{shopIcon}</span>
          <h3 className="my-4 text-white">
            Total Shop : <br />
            {shopCount}
          </h3>
          <span
            className={styles.view}
            onClick={() => router.push("/User/ShopOwner")}
          >
            view list
          </span>
        </Col>
        {/* ----- yellow box ----- */}
        <Col
          md={3}
          className={`${styles.box} ${styles.clrYlw} d-flex flex-column px-0 pt-3`}
        >
          <span className={styles.icon}>{homeIcon}</span>
          <h3 className="my-4 text-whit">
            Total Home : <br /> {homeCount}
          </h3>
          <span
            className={styles.view}
            onClick={() => router.push("/User/HomeOwner")}
          >
            view list
          </span>
        </Col>
        {/* ----- green box ----- */}
        <Col
          md={3}
          className={`${styles.box} ${styles.clrGrn} d-flex flex-column px-0 pt-3`}
        >
          <span className={styles.icon}>{coinIcon}</span>
          <h3 className="my-4 text-white">
            Income of month : <br />
            &#2547; {monthlyIncome}
          </h3>
          <span
            className={styles.view}
            onClick={() => router.push("/Report/Total")}
          >
            view Payement
          </span>
        </Col>
      </Row>
    </div>
  );
};

export default Status;
