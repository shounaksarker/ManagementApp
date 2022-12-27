import * as firebase from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import commonStyles from "../../styles/common.module.css";
const Login = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyCoFJ3yQQ3N1Ci0CWBSccn53ShaYUgUmYU",
    authDomain: "managementsnk.firebaseapp.com",
    projectId: "managementsnk",
    storageBucket: "managementsnk.appspot.com",
    messagingSenderId: "610680333386",
    appId: "1:610680333386:web:53abb4fb3f293bad0832b3",
  };

  // const firebaseConfig = {
  //   apiKey: process.env.API_KEY,
  //   authDomain: process.env.AUTH_DOMAIN,
  //   projectId: process.env.PROJECT_ID,
  //   storageBucket: process.env.STORAGE_BUCKET,
  //   messagingSenderId: process.env.MESSAGING_CENTER_ID,
  //   appId: process.env.APP_ID,
  // };

  const CryptoJS = require("crypto-js");
  const [user, setUser] = useState<any>({
    email: "",
    password: "",
  });
  // ------ firebase ------
  firebase.initializeApp(firebaseConfig);
  const auth = getAuth();

  // input data submission
  const handleBlur = (e: any) => {
    let res = { ...user };
    if (e.target.name === "email") {
      res.email = e.target.value;
      setUser(res);
    }
    if (e.target.name === "email") {
      res.email = e.target.value;
      setUser(res);
    }
    if (e.target.name === "password") {
      res.password = e.target.value;
      setUser(res);
    }
  };

  // Sign In
  const handleSignIn = (e: any) => {
    // if auth data already exists, remove all for re-auth...
    const nm = localStorage.getItem(`ngaLan`);
    if (nm) {
      localStorage.clear();
    }

    // sign in process
    signInWithEmailAndPassword(auth, user.email + "@gmail.com", user.password)
      .then((res) => {
        let encryptedName = CryptoJS.AES.encrypt(
          user.email,
          "my-secret-key@1234"
        ).toString();
        localStorage.setItem("uId", res.user.uid);
        localStorage.setItem(`ngaLan`, encryptedName); //name
        localStorage.setItem(`tImaan${res.user.uid}`, res.user.refreshToken);
        location.reload();
      })
      .catch((error) => {
        if (error.message === "Firebase: Error (auth/user-not-found).") {
          alert("User Not Found");
        }
        if (error.message === "Firebase: Error (auth/wrong-password).") {
          alert("Wrong Password");
        }
        // alert(error.message);
      });

    e.preventDefault();
  };

  // Decrypt

  // set on the top ---- const CryptoJS = require("crypto-js");

  // for setting admin name
  // const nm = localStorage.getItem(`ngaLan`);
  // let bytes = CryptoJS.AES.decrypt(nm, ""my-secret-key@1234"");
  // let nms = bytes.toString(CryptoJS.enc.Utf8);
  // setAdminName(nms);

  return (
    <div
      className={`${commonStyles.UserformBG} ${commonStyles.common} ${commonStyles.bgLightGrey} pt-5`}
    >
      <Container className={`${commonStyles.commonForm} pt-3`}>
        <h3>Login</h3>
        <Form className="py-4">
          <label className="ms-3">Name</label>
          <Form.Control
            type="text"
            placeholder="username"
            className="mt-2"
            name="email"
            onBlur={handleBlur}
            required
          />
          <br />
          <label className="ms-3">Password</label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            className="mt-2"
            onBlur={handleBlur}
            required
          />
          <br />
          <Button type="submit" onClick={handleSignIn}>
            Login
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Login;
