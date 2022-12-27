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
  const [banglaType, setBanglaType] = useState(""); // for printing bangla type
  const [total, setTotal] = useState(0);
  const [expenses, setExpenses] = useState<Payment[]>();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (type !== "") {
      if (type === "TempDev") {
        setBanglaType("Temple Development");
      }
      if (type === "FuneralDev") {
        setBanglaType("Crematorium Development");
      }
      if (type === "EmployeeSalary") {
        setBanglaType("Salary and allowances");
      }
      if (type === "DailyPuja") {
        setBanglaType("Daily/Weekly Pray");
      }
      if (type === "Appayon") {
        setBanglaType(" Entertainment meetings");
      }
      if (type === "Prosasonik") {
        setBanglaType("Administrative and Legal");
      }
      if (type === "ProcharProkashona") {
        setBanglaType("Publicity, publication and travel");
      }
      if (type === "OfficeCost") {
        setBanglaType("অFeeস স্টেশনারী");
      }
      if (type === "SebamulokDan") {
        setBanglaType("Social welfare work and charitable donations");
      }
      if (type === "UtilityBill") {
        setBanglaType("Electricity, gas, telephone");
      }
      if (type === "BibidhExpense") {
        setBanglaType("Misc");
      }
      if (type === "SpecialFunction") {
        setBanglaType("Special event");
      }
    }
  }, [type]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setShow(true);

    const result = await axios
      .get(`/api/report/expenses/${dates.from}/${dates.to}/${type}`)
      .then((res) => {
        setExpenses(res.data?.payments);
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
                <option value="TempDev">Temple Development</option>
                <option value="FuneralDev">Crematorium Development</option>
                <option value="EmployeeSalary">Salary and allowances</option>
                <option value="DailyPuja">Daily/Weekly puja</option>
                <option value="Appayon">Entertainment meetings</option>
                <option value="Prosasonik">Administrative and Legal</option>
                <option value="ProcharProkashona">
                  Publicity, publication and travel
                </option>
                <option value="OfficeCost">Office Stationary</option>
                <option value="SebamulokDan">
                  Social welfare work and charitable donations
                </option>
                <option value="UtilityBill">
                  Electricity, gas, telephone & other bills
                </option>
                <option value="BibidhExpense">Misc</option>
                <option value="SpecialFunction">Special event</option>
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
              documentTitle={`Expense Report - ${banglaType}`}
              pageStyle="print"
            />
            <table className="table table-striped mt-3 ">
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Type of Expense</th>
                </tr>
              </thead>
              <tbody>
                {expenses?.map((p, i) => {
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

            <h5>Total: {total} Tk</h5>

            {/* for printing purpose */}

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
                      <th scope="col">Type of Expense</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses?.map((p, i) => {
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
                <h6>Total: {total} Tk</h6>
              </div>
            </div>
          </div>
        </form>
      </Container>
    </div>
  );
};
export default Payment;

{
  /* <option value="TempDev">TempDev</option> */
}
