import { Payment } from "@prisma/client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import ReactToPrint from "react-to-print";
import commonStyles from "../../styles/common.module.css";
const Payment = () => {
  const [dates, setDates] = useState({
    from: "",
    to: "",
  });
  const [type, setType] = useState("");
  const [banglaType, setBanglaType] = useState("");
  const [total, setTotal] = useState(0);
  const [payments, setPayments] = useState<Payment[]>();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (type !== "") {
      if (type === "ShoshanDevDaho") {
        setBanglaType("Crematorium - Certificate of burn");
      }
      if (type === "ShoshanDevShot") {
        setBanglaType("Crematorium - funeral");
      }
      if (type === "shopRent") {
        setBanglaType("Shop Rent");
      }
      if (type === "homeRent") {
        setBanglaType("Home Rent");
      }
      if (type === "Dighi") {
        setBanglaType("Dighi lease");
      }
      if (type === "DanBox") {
        setBanglaType("Donation Box");
      }
      if (type === "DanOnudan") {
        setBanglaType("Govt. Donation");
      }
      if (type === "buySell") {
        setBanglaType("Bye and Sell");
      }
      if (type === "SosanSomadhi") {
        setBanglaType("Crematorium");
      }
      if (type === "JinisPotroPrapti") {
        setBanglaType("Items received");
      }
      if (type === "CommitteeChada") {
        setBanglaType("Contribution of members");
      }
      if (type === "ProkashonaProchar") {
        setBanglaType("Souvenirs, Publications, Commemorations and Promotions");
      }
      if (type === "Bibidh") {
        setBanglaType("Misc");
      }
      if (type === "Others") {
        setBanglaType("Others");
      }
    }
  }, [type]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setShow(true);

    const result = await axios
      .get(`/api/report/payments/${dates.from}/${dates.to}/${type}`)
      .then((res) => {
        setPayments(res.data?.payments);
        setTotal(res.data?.total);
      });
  };
  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    const newDate = new Date(value);
    const updatedDate = newDate.toISOString();
    setDates({ ...dates, [name]: updatedDate });
  };
  // for printing
  const componentRef = useRef(null);
  return (
    <div
      className={`${commonStyles.UserformBG} ${commonStyles.common} ${commonStyles.bgLightGrey}`}
    >
      <Container className={`${commonStyles.commonForm} py-5`}>
        <form onSubmit={handleSubmit}>
          <Row className="mb-5">
            <Col md={3}>
              <h5>Type of Report</h5>
              <select
                required
                name="category"
                onClick={(e: any) => setType(e.target.value)}
              >
                <option value="">Select</option>
                <option value="ShoshanDevDaho">
                  Crematorium Development (Certificate of burn)
                </option>
                <option value="ShoshanDevShot">
                  Crematorium Development (funeral)
                </option>
                <option value="shopRent">Shop Rent</option>
                <option value="homeRent">Home Home Rent</option>
                <option value="Dighi">Dighi Lease</option>
                <option value="DanBox">Donation Box</option>
                <option value="DanOnudan">Govt. Donation</option>
                <option value="buySell">Shop/Home/Others Bye and Sell</option>
                <option value="SosanSomadhi">
                  Crematorium{" "}
                </option>
                <option value="JinisPotroPrapti">Receipt of goods </option>
                <option value="CommitteeChada">
                  Subscription of Committee Members
                </option>
                <option value="ProkashonaProchar">
                  Souvenirs, Publications, Commemorations and Promotions
                </option>
                <option value="Bibidh">Misc</option>
                <option value="Others">
                  Others
                </option>
              </select>
            </Col>

            <Col md={5} className="d-flex ms-4">
              <div className="mx-3">
                <h5>Date: (from)</h5>
                <input
                  type="Date"
                  name="from"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mx-3">
                <h5>Date: (to)</h5>
                <input type="Date" name="to" onChange={handleChange} required />
              </div>
            </Col>

            <Col md={2}>
              <h5>
                <Button
                  type="submit"
                  variant="warning"
                  className="fw-bold mt-4"
                >
                  Generate
                </Button>
              </h5>
            </Col>
          </Row>

          <div className={`${show ? "d-block" : "d-none"}`}>
            <h4>Type: {banglaType}</h4>
            <ReactToPrint
              trigger={() => <Button variant="secondary">Print income</Button>}
              content={() => componentRef.current}
              documentTitle={`Income report - ${type}`}
              pageStyle="print"
            />
            <table className="table table-striped mt-3 ">
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Income Type </th>
                </tr>
              </thead>
              <tbody>
                {payments?.map((p, i) => {
                  return (
                    <tr key={i}>
                      <td>{new Date(p.date).toLocaleDateString("en-IN")}</td>
                      <td>{p?.amount}</td>
                      <td>{banglaType}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <h4>Total: {total}</h4>

            {/* printing purposes */}
            <div style={{ display: "none" }}>
              <div ref={componentRef}>
                <h3 className="mt-3 text-center">
                  Shree Shree Baradeshwari Kalimondir
                </h3>
                <table className="table table-striped mt-3 ">
                  <thead>
                    <tr>
                      <th scope="col">Date</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Income Type </th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments?.map((p, i) => {
                      return (
                        <tr key={i}>
                          <td>
                            {new Date(p.date).toLocaleDateString("en-IN")}
                          </td>
                          <td>{p?.amount}</td>
                          <td>{banglaType}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <h4>Total: {total}</h4>
              </div>
            </div>
          </div>
        </form>
      </Container>
    </div>
  );
};
export default Payment;
