/* eslint-disable react/no-unescaped-entities */
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import commonStyles from "../../../styles/common.module.css";

const EditUser = () => {
  const [state, setState] = useState(false);
  const [user, setUser] = useState<any>();
  const [newuser, setNewUser] = useState({
    name: "",
    fatherName: "",
    nid: "",
    mobile: "",
    clearUpto: "",
  });
  const router = useRouter();
  const id = router.query.id;

  const getUserData = async () => {
    setState(true);
    const result = await axios.get(`/api/user/getUserById/${id}`);
    setUser(result.data);
  };
  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewUser({ ...newuser, [name]: value });
  };
  const submitData = async (e: any) => {
    e.preventDefault();
    const name = newuser.name ? newuser.name.toString() : user?.name.toString();
    const fatherName = newuser.fatherName
      ? newuser.fatherName.toString()
      : user?.fatherName.toString();
    const nid = newuser.nid ? newuser.nid.toString() : user?.nid.toString();
    const mobile = newuser.mobile
      ? newuser.mobile.toString()
      : user?.mobiile.toString();
    const clearUpto = newuser.clearUpto
      ? newuser.clearUpto.toString()
      : user?.clearUpto?.toString();
    const userId = user?.user_id.toString();
    const result = await axios.post(`/api/user/updateUser`, {
      userId,
      name,
      fatherName,
      nid,
      mobile,
      clearUpto,
    });
    if (result.status === 200) {
      router.back();
    } else {
      alert("somthing went wrong on User > EditUser");
    }
  };
  return (
    <div
      className={`${commonStyles.UserformBG} ${commonStyles.common} ${commonStyles.bgLightGrey} pt-5`}
    >
      {state ? (
        <Container>
          <h3>Info Change of {user?.name}</h3>
          <Form onSubmit={submitData}>
            <Row>
              <Col md={6}>
                <label>Name</label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder={user?.name}
                  onChange={handleChange}
                />
              </Col>
              <Col md={6}>
                <label>Father's Name</label>
                <Form.Control
                  type="text"
                  name="fatherName"
                  placeholder={user?.fatherName}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Col md={6}>
                <label>Mobile</label>
                <Form.Control
                  type="number"
                  name="mobile"
                  placeholder={user?.mobiile + ""}
                  onChange={handleChange}
                />
              </Col>
              <Col md={6}>
                <label>National ID</label>
                <Form.Control
                  type="number"
                  name="nid"
                  placeholder={user?.nid + ""}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <br />
            <Row className="align-items-center">
              <Col md={6}>
                <label>
                  Clear Up to :
                  <strong>
                    {user?.clearUpto &&
                      new Date(user?.clearUpto).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                  </strong>
                </label>
                <Form.Control
                  type="month"
                  name="clearUpto"
                  placeholder={user?.clearUpto && user?.clearUpto}
                  onChange={handleChange}
                />
              </Col>
              <Col md={6} className="mt-4">
                <Button type="submit">Submit</Button>
              </Col>
            </Row>
          </Form>
        </Container>
      ) : (
        <div className="d-flex align-items-center justify-content-center mt-5">
          <div className="text-center">
            <h1 className="mb-4">Want to change info of the user? </h1>
            <Button onClick={getUserData} className="me-2" variant="danger">
              Yes
            </Button>
            <Button variant="success" onClick={() => router.back()}>
              No
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
export default EditUser;
