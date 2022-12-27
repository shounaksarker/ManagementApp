import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  FormControl,
  Row,
} from "react-bootstrap";
import commonStyles from "../../styles/common.module.css";
const CreateUser = () => {
  const [shopID, setShopID] = useState<Number>();
  const [homeID, setHomeID] = useState<Number>();
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState({
    name: "",
    fatherName: "",
    nid: "",
    mobile: "",
    dueAmount: "",
    typeId: "",
    clearUpto: "",
  });
  const [userType, setUserType] = useState("");
  const router = useRouter();

  const submitData = async (e: any) => {
    e.preventDefault();
    const name = user.name.toString();
    const fatherName = user.fatherName.toString();
    const nid = user.nid.toString();
    const mobile = user.mobile.toString();
    const dueAmount = user.dueAmount.toString();
    const typeId = user.typeId.toString();
    const clearUpto = user.clearUpto.toString();

    const res = await axios.post("/api/user/createUser", {
      name,
      fatherName,
      nid,
      mobile,
      dueAmount,
      userType,
      typeId,
      clearUpto,
    });
    if (res) {
      if (res.status === 200) {
        setSuccess(true);
      } else if (res.status === 400) {
        alert("Error Occured, Contact with Developer");
      } else if (res.status === 202) {
        alert("এই Shop/Home এর মালিক রয়েছে... (user already assigned)");
      } else if (res.status === 203) {
        alert("Shop/Home তৈরী করা হয়নি... (Home/Shop Id Not created Yet)");
      }
    }
    router.push("/");
  };
  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const mount = async () => {
    await axios.get("/api/shop/unAssignedShop").then((res) => {
      setShopID(res.data);
    });
    await axios.get("/api/home/unAssignedHome").then((res) => {
      setHomeID(res.data);
    });
  };
  const typeChange = (e: any) => {
    if (e.target.value == "Home") {
      setUserType("Home");
    } else if (e.target.value == "Shop") {
      setUserType("Shop");
    }
  };
  useEffect(() => {
    mount();
  }, []);
  return (
    <div
      className={`${commonStyles.UserformBG} ${commonStyles.common} ${commonStyles.bgLightGrey} pt-5`}
    >
      <Container className={`${commonStyles.commonForm} pt-3`}>
        <h3 className="alert alert-primary">Create User</h3>
        <h3>Shop/Home Rent - </h3>
        {success ? (
          <Alert variant="success">Successfully Created...</Alert>
        ) : (
          ""
        )}
        <Form className="py-4" onSubmit={submitData}>
          <Row>
            <Col md={6}>
              <label>
                <small>Tenant Name</small>
              </label>

              <Form.Control
                required
                type="text"
                placeholder="Tenant Name"
                name="name"
                onBlur={handleChange}
              />
            </Col>
            <Col md={6}>
              <label>
                <small>Father Name</small>
              </label>
              <Form.Control
                type="text"
                placeholder="Father Name"
                name="fatherName"
                onBlur={handleChange}
              />
            </Col>
          </Row>

          <Row className="my-4">
            <Col md={6}>
              <label>
                <small>Mobile</small>
              </label>
              <Form.Control
                type="number"
                placeholder="Mobile"
                name="mobile"
                onBlur={handleChange}
              />
            </Col>
            <Col md={6}>
              <label>
                <small>National ID</small>
              </label>
              <Form.Control
                type="number"
                placeholder="NID"
                name="nid"
                onBlur={handleChange}
              />
            </Col>
          </Row>
          <Row className="mb-4">
            <Col md={6}>
              <label>
                <small>Type</small>
              </label>
              <select name="type" onChange={typeChange} required>
                <option defaultChecked>Type (Shop / Home)</option>
                <option value="Shop">Shop</option>
                <option value="Home">Home</option>
              </select>
            </Col>
            <Col md={6}>
              <label>
                <small>Clear up to (Month)</small>
              </label>
              <FormControl
                type="month"
                placeholder="Payment clear up to"
                name="clearUpto"
                onBlur={handleChange}
              />
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              Shop/Home No.:
              {userType == "" ? (
                ""
              ) : userType == "Shop" ? (
                <input
                  // className = {`${styles.shopOrHomeNo}`}
                  required
                  type="number"
                  placeholder={`${shopID}`}
                  name="typeId"
                  onBlur={handleChange}
                />
              ) : userType == "Home" ? (
                <input
                  // className = {`${styles.shopOrHomeNo}`}
                  type="number"
                  required
                  placeholder={`${homeID}`}
                  name="typeId"
                  onBlur={handleChange}
                />
              ) : (
                <h5> </h5>
              )}
            </Col>

            <Col md={5}>
              <label>
                <small>Image</small>
              </label>
              <Form.Control
                type="file"
                placeholder="ছবি"
                name="image"
                onBlur={handleChange}
              />
            </Col>

            <Col md={1}>
              <Button className="mt-4" type="submit">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>

        {/* eikhane CreateUser.txt er code */}
      </Container>
    </div>
  );
};
export default CreateUser;
