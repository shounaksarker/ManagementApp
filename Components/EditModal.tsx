import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";

import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/router";
import { Button, Col, Form, Row } from "react-bootstrap";

function EditModal({ showModal, name, dokan, clear }: any) {
  // ==== modal state ====
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);

  // ==== user info State ====
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

  // ==== getting user Data ====
  const getData = async () => {
    await axios.get(`/api/Payments/getPaymentByUser/${id}`).then((res) => {
      setUser(res.data?.user);
    });
  };
  useEffect(() => {
    getData();
  });

  // ==== functions for changing month and submit data ====
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
    setShow(false);
    // location.reload();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Clear Up to</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 className="text-success">
            <span className="text-dark">Name</span>: {name}
          </h6>
          {/* <h6 className="text-success"><span className="text-dark">Dokan No.</span>: {dokan}</h6> */}
          <Form onSubmit={submitData}>
            <br />
            <Row className="align-items-center">
              <Col md={9}>
                <h6>
                  (Rent clear Up to) :{" "}
                  <small className="text-black-50">
                    {new Date(clear).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </small>
                </h6>
                <Form.Control
                  type="month"
                  name="clearUpto"
                  onChange={handleChange}
                />
              </Col>
              <Col md={3} className="mt-4">
                <Button type="submit">Submit</Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>

        </Modal.Footer> */}
      </Modal>
    </>
  );
}

export default EditModal;
