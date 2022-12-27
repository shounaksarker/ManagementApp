/* eslint-disable react/no-unescaped-entities */
import { Payment } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import commonStyles from "../../../styles/common.module.css";
const CryptoJS = require("crypto-js");

const HomePayments = () => {
  const [adminName, setAdminName] = useState(); // admin name
  // printing funtionality
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  let numberToBengliWords = require("number-to-bengli-words"); //for converting to bangla words
  // to get single payment date and rent per month
  const [singlePayment, setSinglePayment] = useState<any>({});
  const [rent, setRent] = useState(0);

  // for session storage and showing rent per month in UI
  useEffect(() => {
    const rate_per_month = sessionStorage.getItem("rate_per_month");
    rate_per_month ? setRent(Number(rate_per_month)) : setRent(0);

    // for setting admin name
    const nm = localStorage.getItem(`${process.env.ENQ_N}`);
    let bytes = CryptoJS.AES.decrypt(nm, process.env.SECRET_KEY);
    let nms = bytes.toString(CryptoJS.enc.Utf8);
    setAdminName(nms);
  }, [rent]);

  const [clearUpto, setClearUpto] = useState("");
  const [state, setState] = useState(false);
  const [homeID, setHomeID] = useState<any>();
  const [user, setUser] = useState<any>();
  const router = useRouter();
  const [payment1, setPayment1] = useState<Payment[]>();
  const [payment, setpayment] = useState<any>({
    amount: "",
    date: "",
  });
  const id = router.query.id;
  const getData = async () => {
    setState(true);
    await axios.get(`/api/Payments/getPaymentByUser/${id}`).then((res) => {
      setHomeID(res.data.user.homeId);
      setPayment1(res.data?.payments);
      setUser(res.data?.user);
    });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const user_id = user?.user_id.toString();
    const type = "homePayment";
    const amount = payment.amount.toString();
    const newDate = new Date(payment.date);
    const date = newDate.toISOString();

    const edtRes = await axios.post(`/api/user/updateUser`, {
      userId: user && user.user_id,
      name: user && user.name,
      fatherName: user && user.fatherName,
      nid: user && user.nid,
      mobile: user && user.mobiile,
      clearUpto: clearUpto,
    });

    const res = await axios
      .post(`/api/Payments/homePayment`, {
        user_id,
        type,
        amount,
        date,
      })
      .then((res) => {
        paymentSlip(res.data.id);
        setTimeout(() => location.reload(), 3000);
      });
  };
  const handleChange = (e: any) => {
    if (e.target.name === "clearupto") {
      setClearUpto(e.target.value);
    } else {
      setpayment({
        ...payment,
        [e.target.name]: e.target.value,
      });
    }
  };
  const paymentSlip = async (p: any) => {
    const res = await axios.get(`/api/Payments/getPaymentByID/${p}`);
    setSinglePayment(res.data); // to get single payment date
    handlePrint();
  };

  const dateFormatters = (e: any) => {
    const d = new Date(e);
    const dt = d.getDate();
    const mnth = d.getMonth() + 1;
    const yr = d.getFullYear();
    const date = `${dt}/${mnth}/${yr}`;
    return date;
  };

  return (
    <div>
      {state ? (
        <div
          className={`${commonStyles.UserformBG} ${commonStyles.common} ${commonStyles.bgLightGrey} pt-5`}
        >
          <Container className={`${commonStyles.commonForm} pt-3`}>
            <Row>
              <Col md={5}>
                <h6>Name : {user?.name}</h6>
              </Col>
              <Col md={5}>
                <h6>Father's Name : {user?.fatherName}</h6>
              </Col>
            </Row>

            <Row>
              <Col md={5}>
                <h6>Mobile : {user?.mobiile}</h6>
              </Col>
              <Col md={5}>
                <h6>National ID: {user?.nid}</h6>
              </Col>
            </Row>
            <Row>
              <Col md={5}>
                <h6>
                  Clear : up to
                  {new Date(user?.clearUpto).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </h6>
              </Col>
              <Col md={5}>
                <h6>Monthly rent : {rent}</h6>
              </Col>
            </Row>
            <hr />
            <div>
              <Form className="py-4" onSubmit={handleSubmit}>
                <Row>
                  <Col md={3}>
                    <label className="ms-3">Date</label>
                    <Form.Control
                      type="date"
                      name="date"
                      onChange={handleChange}
                    />
                  </Col>
                  <Col md={3}>
                    <label className="ms-3">Amount</label>
                    <Form.Control
                      type="number"
                      name="amount"
                      onChange={handleChange}
                    />
                  </Col>
                  <Col md={3}>
                    <label className="ms-3">clear up to</label>
                    <Form.Control
                      type="month"
                      name="clearupto"
                      onChange={handleChange}
                    />
                  </Col>
                  <Col md={3} className="mt-4">
                    <Button type="submit">Submit</Button>
                  </Col>
                </Row>
              </Form>
            </div>

            <div>
              <h4>Payment History</h4>
              <Table striped bordered hover className="text-center mb-3">
                <thead>
                  <tr>
                    <th>
                      Date <small className="fw-lighter">(dd-mm-yyyy)</small>
                    </th>
                    <th>Amount</th>
                    <th>Recite</th>
                  </tr>
                </thead>
                <tbody>
                  {payment1?.map((payment: any) => (
                    <tr key={payment.id}>
                      <td>{dateFormatters(payment.date)}</td>
                      <td>{payment.amount}</td>
                      <td>
                        <Button onClick={() => paymentSlip(payment.id)}>
                          Check
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

            {/* ===== printing recite ===== */}

            {singlePayment && (
              <div style={{ display: "none" }}>
                <div className="printArea py-3 px-5" ref={componentRef}>
                  <span>Customer Copy</span>
                  <div className="text-center mb-2 bg-light">
                    <h6>Shree Shree Baradeshwari Bigraha</h6>
                    <p className="mb-1">
                      Sakin: Rajarbag, PO: Basabo, PS: Sabujbag, Dhaka
                    </p>
                    <p>Ref: Shree Shree Baradeshwari Mondir</p>
                  </div>
                  <hr />
                  <br />
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6>Name: {user?.name}</h6>
                      <h6>Mobile {user?.mobiile}</h6>
                      <h6>Sakin: Kalibari</h6>
                    </div>

                    <div>
                      <h6>Father's Name: {user?.fatherName}</h6>
                      <h6>Home ID: {homeID && homeID}</h6>
                      <h6>
                        Date:
                        {new Date(singlePayment.date).toLocaleDateString(
                          "en-IN"
                        )}
                      </h6>
                    </div>
                  </div>
                  <hr />
                  {/* official talk  */}
                  <div className="mt-3 lh-lg">
                    Monthly Rent{" "}
                    <span className="fw-bold text-decoration-underline">
                      {rent ? rent : ""} Tk_
                    </span>{" "}
                    Total Amount_
                    <span className="fw-bold text-decoration-underline">
                      {singlePayment.amount ? singlePayment.amount : ""} Tk_
                    </span>
                    (in bengali)
                    <span className="fw-bold text-decoration-underline">
                      _
                      {numberToBengliWords.toBengaliWords(
                        singlePayment.amount ? singlePayment.amount : 0
                      )}
                      -Tk
                    </span>
                    _ has received.
                    <br />
                    <br />
                    <br />
                    <br /> <br />
                    <div className="d-flex justify-content-between">
                      <span className="border-top border-dark">
                        Signature of owner
                      </span>
                      <small>Printed by: {adminName}</small>
                      <span className="border-top border-dark">treasurer</span>
                    </div>
                  </div>
                  <hr className="border-top border-5 border-warning" />

                  {/* office copy */}

                  <span>Office কপি</span>
                  <div className="text-center mb-2 bg-light">
                    <h6>Shree Shree Baradeshwari Bigraha</h6>
                    <p className="mb-1">
                      Sakin: Rajarbag, PO: Basabo, PS: Sabujbag, Dhaka
                    </p>
                    <p>Ref: Shree Shree Baradeshwari Mondir</p>
                  </div>
                  <hr />
                  <br />
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6>Name: {user?.name}</h6>
                      <h6>Mobile {user?.mobiile}</h6>
                      <h6>Sakin: Kalibari</h6>
                    </div>

                    <div>
                      <h6>Father's Name: {user?.fatherName}</h6>
                      <h6>Home ID: {homeID && homeID}</h6>
                      <h6>
                        Date:
                        {new Date(singlePayment.date).toLocaleDateString(
                          "en-IN"
                        )}
                      </h6>
                    </div>
                  </div>
                  <hr />
                  {/* official talk  */}
                  <div className="mt-3 lh-lg">
                    <span className="fw-bold text-decoration-underline">
                      {rent ? rent : ""} Tk_
                    </span>{" "}
                    Total Amount_
                    <span className="fw-bold text-decoration-underline">
                      {singlePayment.amount ? singlePayment.amount : ""}
                      Tk_
                    </span>
                    (in bengali)
                    <span className="fw-bold text-decoration-underline">
                      _
                      {numberToBengliWords.toBengaliWords(
                        singlePayment.amount ? singlePayment.amount : 0
                      )}
                      -Tk has received.
                    </span>
                    _
                    <br />
                    <br />
                    <br />
                    <br />
                    <div className="d-flex justify-content-between">
                      <span className="border-top border-dark">
                        Signature of Owner
                      </span>
                      <small>Printed by: {adminName}</small>
                      <span className="border-top border-dark">treasurer</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Container>
        </div>
      ) : (
        <div className="d-flex align-items-center justify-content-center mt-5">
          <div className="text-center">
            <h1 className="mb-4">Want Home Data? </h1>
            <Button onClick={getData} className="me-2" variant="success">
              Yes
            </Button>
            <Button variant="danger" onClick={() => router.back()}>
              {/* on click function should be change to another route */}
              No
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
export default HomePayments;
