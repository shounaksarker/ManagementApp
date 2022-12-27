/* eslint-disable react/no-unescaped-entities */
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useReactToPrint } from "react-to-print";
import commonStyles from "../../styles/common.module.css";
import dtStyle from "./sosan.module.css";
const CryptoJS = require("crypto-js");

const ShoshanDevShot = () => {
  // admin name
  const [adminName, setAdminName] = useState();
  const [payment, setPayment] = useState();
  const [pay, setPay] = useState({
    type: "ShoshanDevShot",
    name: "",
    fatherName: "",
    motherName: "",
    address: "",
    reference: "",
    relation: "",
    amount: "",
    shoshanType: "Shot",
    date: "",
  });
  const [singleUser, setSingleUser] = useState<{ [key: string]: any }>();

  let numberToBengliWords = require("number-to-bengli-words");
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const handlePaymentSlip = async (e: any) => {
    await axios.get("/api/Payments/getShosanById/" + e).then((res) => {
      if (res.data.type === "Shot") {
        setSingleUser(res.data);
      }
    });
    handlePrint();
  };

  // for table and pagination
  const columns = [
    {
      name: "Name - (Dead Body)",
      selector: (row: any) => row.name,
    },
    {
      name: "Date",
      selector: (row: any) =>
        new Date(row.payment.date).toLocaleDateString("en-us", {
          day: "numeric",
          year: "numeric",
          month: "short",
        }),
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row: any) => row.amount,
    },
    {
      name: "Recite",
      button: true,
      cell: (row: any) => (
        <div className="App">
          <div className="openbtn text-center">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handlePaymentSlip(row.id)}
            >
              Print
            </button>
          </div>
        </div>
      ),
    },
  ];
  const customStyles = {
    rows: {
      style: {
        fontSize: "15px",
      },
    },
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "15px",
      },
    },
  };

  const mount = async () => {
    await axios
      // .get("/api/Payments/getPayments/ShoshanDevShot")
      .get("/api/Shosan/getAllShosan")
      .then((res) => {
        let arr: any = [];
        res.data?.map((item: any) => item.type === "Shot" && arr.push(item));
        setPayment(arr);
      });
  };
  useEffect(() => {
    mount();
    // for setting admin name
    const nm = localStorage.getItem(`ngaLan`);
    let bytes = CryptoJS.AES.decrypt(nm, "my-secret-key@1234");
    let nms = bytes.toString(CryptoJS.enc.Utf8);
    setAdminName(nms);
  }, []);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const result = await axios
      .post("/api/Payments/createShoshanPayment", {
        pay,
      })
      .then((res) => {
        handlePaymentSlip(res.data.shoshan.id);
        setTimeout(() => location.reload(), 3000);
      })
      .catch((err) => {
        alert(err);
      });
  };
  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "date") {
      const newDate = new Date(value);
      const updatedDate = newDate.toISOString();
      setPay({ ...pay, [name]: updatedDate });
    } else {
      setPay({ ...pay, [name]: value });
    }
  };

  return (
    <div className={`${commonStyles.UserformBG} ${commonStyles.bgLightGrey}`}>
      <div className={`${commonStyles.common}`}>
        <Container className={`${commonStyles.commonForm} pt-3`}>
          <h3 className="alert alert-primary">
            Crematorium Development (Funeral)
          </h3>
          <h5>Donation receipt - </h5>

          <Form className="py-4" onSubmit={handleSubmit}>
            <Row>
              <Col md={6} className="">
                <label>
                  <small>Name</small>{" "}
                </label>
                <Form.Control
                  type="text"
                  placeholder="Name (Dead Body)"
                  name="name"
                  onBlur={handleChange}
                  required
                />
              </Col>
              <Col md={6} className="">
                <label>
                  <small>Father/Husband</small>
                </label>
                <Form.Control
                  type="text"
                  placeholder="Father/Husband's Name"
                  name="fatherName"
                  onBlur={handleChange}
                />
              </Col>
            </Row>

            <Row className="my-4">
              <Col md={6} className="">
                <label>
                  <small>Mother's Name</small>
                </label>
                <Form.Control
                  type="text"
                  placeholder="Mother's Name"
                  name="motherName"
                  onBlur={handleChange}
                />
              </Col>
              <Col md={6} className="">
                <label>
                  <small>Address</small>
                </label>
                <Form.Control
                  type="text"
                  placeholder="Address"
                  name="address"
                  onBlur={handleChange}
                />
              </Col>
            </Row>

            <Row className="my-4">
              <Col md={6} className="">
                <label>
                  <small>Representative</small>
                </label>
                <Form.Control
                  type="text"
                  placeholder="পক্ষে (Representative)"
                  name="reference"
                  onBlur={handleChange}
                />
              </Col>
              <Col md={6} className="">
                <label>
                  <small>Cremation donation</small>
                </label>
                <Form.Control
                  type="number"
                  placeholder="Certificate of burn Donation of"
                  name="amount"
                  onBlur={handleChange}
                  required
                />
              </Col>
            </Row>

            <Row className="my-4">
              <Col md={6} className="">
                <label>
                  <small>Date of burn</small>
                </label>
                <Form.Control
                  type="date"
                  placeholder="Date of burn"
                  name="relation"
                  onBlur={handleChange}
                />
              </Col>

              <Col md={4} className="">
                <label>
                  <small>Date of Recite</small>
                </label>
                <Form.Control
                  type="date"
                  placeholder="Date"
                  name="date"
                  onBlur={handleChange}
                  required
                />
              </Col>
              <Col md={2} className="mt-4">
                <Button type="submit">Submit</Button>
              </Col>
            </Row>
          </Form>
        </Container>
        <br />
      </div>
      <Container className={`${commonStyles.commonForm} pt-3`}>
        <DataTable
          className={dtStyle.dataTable}
          columns={columns}
          data={payment ? payment : []}
          highlightOnHover
          pagination
          fixedHeader
          // fixedHeaderScrollHeight="350px"
          customStyles={customStyles}
        />

        {/* for printing  */}

        {singleUser && (
          <div style={{ display: "none" }}>
            <div className="printArea py-3 px-5" ref={componentRef}>
              <div className="d-flex justify-content-between">
                <span>Customer Copy</span>
                <span>SL: {singleUser?.payment.id}</span>
              </div>
              <div className="text-center bg-light">
                <h6>Shree Shree Baradeshwari moha Crematorium</h6>
                <p>Maintained by: Shree Shree Baradeshwari Kalimondir</p>
                <p className={commonStyles.nmy2}>
                  Rajarbag, Basabo, Sabujbag, Dhaka 1214
                </p>
              </div>
              <hr /> <br />
              <div className="mb-2 d-flex justify-content-center align-items-center">
                <h6 className={dtStyle.onudan}>Crematorium Development Fee</h6>
                <h6 className={`${dtStyle.onudan} ${dtStyle.onudanBG}`}>
                  Donation receipt
                </h6>
                <h6 className={dtStyle.onudan}>
                  Dateঃ
                  {new Date(singleUser.payment.createdAt).toLocaleDateString(
                    "en-IN"
                  )}
                </h6>
              </div>
              <br />
              <div className="d-flex justify-content-between">
                <div>
                  <h6>
                    Name (Dead Body): <strong>{singleUser?.name}</strong>
                  </h6>
                  <h6>
                    Father/Husband's Name:{" "}
                    <strong>{singleUser?.fatherName}</strong>
                  </h6>
                  <h6>
                    Mother's Name: <strong>{singleUser?.motherName}</strong>
                  </h6>
                </div>
                <div>
                  <h6>
                    Representative: <strong>{singleUser?.reference}</strong>
                  </h6>
                  <h6>
                    Date of burn:
                    <strong>
                      {new Date(singleUser?.relation).toLocaleDateString(
                        "en-IN"
                      )}
                    </strong>
                  </h6>
                  <h6>
                    Address: <strong>{singleUser?.address}</strong>
                  </h6>
                </div>
              </div>
              {/* official talk  */}
              <div className="mt-3 lh-lg">
                Donation of{" "}
                <span className="fw-bold text-decoration-underline">
                  {singleUser.amount ? singleUser.amount : ""}
                  Tk_
                </span>
                (in bengali)
                <span className="fw-bold text-decoration-underline">
                  _
                  {numberToBengliWords.toBengaliWords(
                    singleUser.amount ? singleUser.amount : 0
                  )}
                  -Tk{" "}
                </span>
                only has recieved
                <br /> <br /> <br />
                <div className="d-flex justify-content-between">
                  <span className="border-top border-dark">
                    President / General Secretary
                  </span>
                  <small>Printed by: {adminName} </small>
                  <span className="border-top border-dark">Reciever</span>
                </div>
              </div>
              <hr className="border-top border-5 border-warning" />
              {/* office copy */}
              <div className="d-flex justify-content-between">
                <span>Office Copy</span>
                <span>SL: {singleUser?.payment.id}</span>
              </div>
              <div className="text-center bg-light">
                <h6>Shree Shree Baradeshwari moha Crematorium</h6>
                <p>Maintained by: Shree Shree Baradeshwari Kalimondir</p>
                <p className={commonStyles.nmy2}>
                  Rajarbag, Basabo, Sabujbag, Dhaka 1214
                </p>
              </div>
              <hr /> <br />
              <div className="mb-2 d-flex justify-content-center align-items-center">
                <h6 className={dtStyle.onudan}>Crematorium Development Fee</h6>
                <h6 className={`${dtStyle.onudan} ${dtStyle.onudanBG}`}>
                  Donation receipt
                </h6>
                <h6 className={dtStyle.onudan}>
                  Dateঃ
                  {new Date(singleUser.payment.createdAt).toLocaleDateString(
                    "en-IN"
                  )}
                </h6>
              </div>
              <br />
              <div className="d-flex justify-content-between">
                <div>
                  <h6>
                    Name (Dead Body): <strong>{singleUser?.name}</strong>
                  </h6>
                  <h6>
                    Father/Husband's Name:{" "}
                    <strong>{singleUser?.fatherName}</strong>
                  </h6>
                  <h6>
                    Mother's Name: <strong>{singleUser?.motherName}</strong>
                  </h6>
                </div>
                <div>
                  <h6>
                    Representative: <strong>{singleUser?.reference}</strong>
                  </h6>
                  <h6>
                    Date of burn:
                    <strong>
                      {new Date(singleUser?.relation).toLocaleDateString(
                        "en-IN"
                      )}
                    </strong>
                  </h6>
                  <h6>
                    Address: <strong>{singleUser?.address}</strong>
                  </h6>
                </div>
              </div>
              {/* official talk  */}
              <div className="mt-3 lh-lg">
                Donation of{" "}
                <span className="fw-bold text-decoration-underline">
                  {singleUser.amount ? singleUser.amount : ""} Tk_
                </span>{" "}
                (in bengali){" "}
                <span className="fw-bold text-decoration-underline">
                  _
                  {numberToBengliWords.toBengaliWords(
                    singleUser.amount ? singleUser.amount : 0
                  )}
                  -Tk{" "}
                </span>
                only has recieved
                <br /> <br /> <br />
                <div className="d-flex justify-content-between">
                  <span className="border-top border-dark">
                    President / General Secretary
                  </span>
                  <small>Printed by: {adminName} </small>
                  <span className="border-top border-dark">Reciever</span>
                </div>
              </div>
            </div>{" "}
            {/* print end */}
          </div>
        )}
      </Container>
    </div>
  );
};
export default ShoshanDevShot;
