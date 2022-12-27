import axios from "axios";
import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import TotalExpense from "../../Components/TotalExpense";
import TotalIncome from "../../Components/TotalIncome";
import commonStyles from "../../styles/common.module.css";
import styles from "./total.module.css";

const TotalReport = () => {
  // ---------- states for payments start------------
  const paymentArr = [
    "ShoshanDevDaho",
    "ShoshanDevShot",
    "Dighi",
    "DanBox",
    "DanOnudan",
    "BuySell",
    "SosanSomadhi",
    "JinisPotroPrapti",
    "CommitteeChada",
    "ProkashonaProchar",
    "Bibidh",
    "Others",
    "homePayment",
    "shopPayment",
  ];
  const [shoshanDevDaho, setShoshanDevDaho] = useState({});
  const [shoshanDevShot, setShoshanDevShot] = useState({});
  const [dighi, setDighi] = useState({});
  const [danBox, setDanBox] = useState({});
  const [danOnudan, setDanOnudan] = useState({});
  const [buySell, setBuySell] = useState({});
  const [sosanSomadhi, setSosanSomadhi] = useState({});
  const [jinisPotroPrapti, setJinisPotroPrapti] = useState({});
  const [committeeChada, setCommitteeChada] = useState({});
  const [prokashonaProchar, setProkashonaProchar] = useState({});
  const [bibidh, setBibidh] = useState({});
  const [others, setOthers] = useState({});
  const [homePayment, setHomePayment] = useState({});
  const [shopPayment, setShopPayment] = useState({});

  const paymentProps = [
    homePayment,
    shopPayment,
    shoshanDevDaho,
    shoshanDevShot,
    dighi,
    danBox,
    danOnudan,
    buySell,
    sosanSomadhi,
    jinisPotroPrapti,
    committeeChada,
    prokashonaProchar,
    bibidh,
    others,
  ];
  // ---------- states for payments end ------------

  // ------------ states for expenses start -----------
  const expenseArr = [
    "TempDev",
    "FuneralDev",
    "EmployeeSalary",
    "DailyPuja",
    "Appayon",
    "Prosasonik",
    "ProcharProkashona",
    "OfficeCost",
    "SebamulokDan",
    "UtilityBill",
    "BibidhExpense",
    "SpecialFunction",
  ];

  const [tempDev, setTempDev] = useState({});
  const [funeralDev, setFuneralDev] = useState({});
  const [employeeSalary, setEmployeeSalary] = useState({});
  const [dailyPuja, setDailyPuja] = useState({});
  const [appayon, setAppayon] = useState({});
  const [prosasonik, setProsasonik] = useState({});
  const [procharProkashona, setProcharProkashona] = useState({});
  const [officeCost, setOfficeCost] = useState({});
  const [sebamulokDan, setSebamulokDan] = useState({});
  const [utilityBill, setUtilityBill] = useState({});
  const [bibidhExpense, setBibidhExpense] = useState({});
  const [specialFunction, setSpecialFunction] = useState({});

  const expenseProps = [
    tempDev,
    funeralDev,
    employeeSalary,
    dailyPuja,
    appayon,
    prosasonik,
    procharProkashona,
    officeCost,
    sebamulokDan,
    utilityBill,
    bibidhExpense,
    specialFunction,
  ];
  // ------------ states for expenses end -----------

  const [dates, setDates] = useState({
    from: "",
    to: "",
  });
  const [total, setTotal] = useState<number>(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // all payments and expenses data
    const result = await axios
      .get(`/api/report/totalreport/${dates.from}/${dates.to}`)
      .then((res) => {
        setTotalIncome(res.data?.sumOfIncome);
        setTotalExpense(res.data?.sumOfExpense);
        setTotal(res.data?.total);
      });

    // individual payment amount with type name.
    paymentArr.forEach((typeName) => {
      axios
        .get(`/api/report/payments/${dates.from}/${dates.to}/${typeName}`)
        .then((res) => {
          if (typeName == "ShoshanDevDaho")
            setShoshanDevDaho({
              name: "Crematorium - (Certificate of burn)",
              amount: res.data?.total,
            });
          if (typeName == "ShoshanDevShot")
            setShoshanDevShot({
              name: "Crematorium - (funeral)",
              amount: res.data?.total,
            });
          if (typeName == "Dighi")
            setDighi({ name: "Dighi lease", amount: res.data?.total });
          if (typeName == "DanBox")
            setDanBox({ name: "Donation box", amount: res.data?.total });
          if (typeName == "DanOnudan")
            setDanOnudan({ name: "Donation", amount: res.data?.total });
          if (typeName == "BuySell")
            setBuySell({
              name: "Home/Shop Bye and Sell",
              amount: res.data?.total,
            });
          if (typeName == "SosanSomadhi")
            setSosanSomadhi({
              name: "Crematorium",
              amount: res.data?.total,
            });
          if (typeName == "JinisPotroPrapti")
            setJinisPotroPrapti({
              name: "Receipt of goods",
              amount: res.data?.total,
            });
          if (typeName == "CommitteeChada")
            setCommitteeChada({
              name: "Contribution of members",
              amount: res.data?.total,
            });
          if (typeName == "ProkashonaProchar")
            setProkashonaProchar({
              name: "Publication",
              amount: res.data?.total,
            });
          if (typeName == "Bibidh")
            setBibidh({ name: "Misc", amount: res.data?.total });
          if (typeName == "Others")
            setOthers({ name: "Others", amount: res.data?.total });
          if (typeName == "homePayment")
            setHomePayment({ name: "Shop Rent", amount: res.data?.total });
          if (typeName == "shopPayment")
            setShopPayment({ name: "Home Rent", amount: res.data?.total });
        });
    });

    // individual expense amount with type name.
    expenseArr.forEach((typeName) => {
      axios
        .get(`/api/report/expenses/${dates.from}/${dates.to}/${typeName}`)
        .then((res) => {
          if (typeName === "TempDev")
            setTempDev({
              name: "Temple Development",
              amount: res.data?.total,
            });
          if (typeName === "FuneralDev")
            setFuneralDev({
              name: "Crematorium Development ",
              amount: res.data?.total,
            });
          if (typeName === "EmployeeSalary")
            setEmployeeSalary({
              name: "Salary and allowances",
              amount: res.data?.total,
            });
          if (typeName === "DailyPuja")
            setDailyPuja({
              name: "Daily/Weekly puja",
              amount: res.data?.total,
            });
          if (typeName === "Appayon")
            setAppayon({
              name: "Entertainment meetings",
              amount: res.data?.total,
            });
          if (typeName === "Prosasonik")
            setProsasonik({
              name: "Administrative and Legal",
              amount: res.data?.total,
            });
          if (typeName === "ProcharProkashona")
            setProcharProkashona({
              name: "Publicity, publication and travel",
              amount: res.data?.total,
            });
          if (typeName === "OfficeCost")
            setOfficeCost({
              name: "Office Stationary",
              amount: res.data?.total,
            });
          if (typeName === "SebamulokDan")
            setSebamulokDan({
              name: "Social welfare work and charitable donations",
              amount: res.data?.total,
            });
          if (typeName === "UtilityBill")
            setUtilityBill({
              name: " Electricity, gas, telephone & other bills",
              amount: res.data?.total,
            });
          if (typeName === "BibidhExpense")
            setBibidhExpense({ name: "Misc", amount: res.data?.total });
          if (typeName === "SpecialFunction")
            setSpecialFunction({
              name: " Special event",
              amount: res.data?.total,
            });
        });
    });
  };

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    const newDate = new Date(value);
    const updatedDate = newDate.toISOString();
    setDates({ ...dates, [name]: updatedDate });
  };

  return (
    <div
      className={`${commonStyles.UserformBG} ${commonStyles.common} ${commonStyles.bgLightGrey}`}
    >
      <Container className={`${commonStyles.commonForm} py-5`}>
        <h4 className="text-center mb-3 alert alert-primary">Total -</h4>
        <form onSubmit={handleSubmit}>
          <Row className="mb-5 text-center px-5">
            <Col ms={12} md={4}>
              <div>
                <h5>Date: (from)</h5>
                <input
                  type="Date"
                  name="from"
                  onChange={handleChange}
                  required
                />
              </div>
            </Col>

            <Col ms={12} md={4}>
              <div>
                <h5>Date: (to)</h5>
                <input type="Date" name="to" onChange={handleChange} required />
              </div>
            </Col>

            <Col
              ms={12}
              md={4}
              className="d-flex justify-content-start align-items-center"
            >
              <Button type="submit" variant="warning" className="fw-bold mt-4">
                Generate
              </Button>
            </Col>
          </Row>
        </form>

        <Row className={`${styles.scroll} text-center`}>
          {/* income */}
          <Col md={6}>
            <TotalIncome
              paymentProps={paymentProps}
              totalIncome={totalIncome}
            />
          </Col>
          {/* expense */}
          <Col md={6}>
            <TotalExpense
              expenseProps={expenseProps}
              totalExpense={totalExpense}
            />
          </Col>
        </Row>

        <Row className={`${styles.border} mb-4 mt-4`}>
          <Col md={4} className="text-center">
            <h5>Total Income: {totalIncome}</h5>
          </Col>
          <Col md={4} className="text-center">
            <h5>Total Expense: {totalExpense}</h5>
          </Col>
          <Col md={4} className="text-center">
            <h5>Net Amount : {total}</h5>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default TotalReport;
