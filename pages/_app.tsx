import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Dashboard from "../Components/Dashboard";
import Login from "./Authentication/Login";
import styles from "./index.module.css";

function MyApp({ Component, pageProps }: any) {
  // menu option for small device
  const [show, setShow] = useState<Boolean>(false);
  const cross = (
    <FontAwesomeIcon
      icon={faXmark}
      className="fs-2"
      onClick={() => {
        setShow(false);
      }}
    />
  );
  const bar = (
    <FontAwesomeIcon
      icon={faBars}
      className="fs-2"
      onClick={() => {
        setShow(true);
      }}
    />
  );
  const [admin, setAdmin] = useState({
    name: "",
    toKen: "",
  });
  useEffect(() => {
    let uid = localStorage.getItem("uId");
    let nm = localStorage.getItem(`ngaLan`);
    let tkn = localStorage.getItem(`tImaan${uid}`);
    nm &&
      tkn &&
      setAdmin({
        name: nm,
        toKen: tkn,
      });
  }, []);

  if (admin.name !== "" && admin.toKen !== "") {
    return (
      <Container fluid className="py-0">
        <span
          className={`${styles.zIndex} bg-dark text-white p-2 d-md-none position-fixed`}
        >
          {show ? cross : bar}
        </span>
        <Row style={{ minHeight: "100vh" }}>
          {/* ***** left -> menubar ******* */}
          <Col
            md={2}
            className={`bg-secondary ${show ? "d-block" : "d-none"} d-md-block`}
          >
            <Dashboard />
            <div className="text-center mt-3">
              <Button
                variant="danger"
                className="mx-auto mb-3"
                onClick={() => {
                  localStorage.clear();
                  location.reload();
                }}
              >
                Logout
              </Button>
            </div>
          </Col>
          {/* ***** right -> web pages ***** */}
          <Col md={10} className="ps-0">
            <Component {...pageProps} />
          </Col>
        </Row>
      </Container>
    );
  } else {
    return <Login />;
  }

  // typeof window !== "undefined" && window.location.href = "http://www.w3schools.com";
  // return (
  //  <Login></Login>
  // )
}

export default MyApp;
