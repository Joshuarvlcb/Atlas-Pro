import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
// import { useAuth } from "./contexts/AuthContext";

function Signup() {
  const guest = () => {
    history.push("/slider");
  };
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  // const { signup, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  async function handleSubmit(e) {
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    try {
      console.log("foo");
      setError("");
      console.log("click");

      setLoading(true);
      // await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch (err) {
      console.log(err);
      setError(err);
    }
    setLoading(false);
  }

  return (
    <div
      className="d-flex align-items-center"
      style={{
        height: "100vh",
        backgroundColor: "#4FA1CA",
        fontFamily: "Quicksand",
        fontWeight: "bold",
      }}
    >
      <div className="container">
        <div className="image"></div>
        <Card className="card">
          <Card.Body
            className="d-flex justify-content-center flex-column"
            style={{ padding: "40px" }}
          >
            <h2
              style={{
                color: "#4FA1CA",
                fontWeight: "bold",
              }}
              className="text-left mb-4"
            >
              Sign up
            </h2>
            {error && <Alert variant="danger">passwords do not match</Alert>}
            <Form>
              <Form.Group id="email" className="mb-2">
                <Form.Label className="bold">Email</Form.Label>
                <Form.Control
                  ref={emailRef}
                  type="email"
                  className="shadow-none"
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mb-2" id="password">
                <Form.Label className="bold">Password</Form.Label>
                <Form.Control
                  className="shadow-none"
                  ref={passwordRef}
                  type="password"
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mb-4" id="password-confrim">
                <Form.Label className="bold">Password-confrim</Form.Label>
                <Form.Control
                  className="shadow-none"
                  ref={passwordConfirmRef}
                  type="password"
                ></Form.Control>
              </Form.Group>
              <div className="center d-flex justify-content-center">
                <Button
                  onClick={handleSubmit}
                  variant="secondary"
                  className=" w-50 mt-2"
                  style={{ fontWeight: "bold", letterSpacing: "1px" }}
                >
                  Sign up
                </Button>
                <Button
                  onClick={guest}
                  className=" w-50 mt-2"
                  style={{
                    marginLeft: "5px",
                    backgroundColor: "rgb(226, 97, 198)",
                    border: "none",
                    fontWeight: "600",
                    letterSpacing: "1px",
                  }}
                >
                  Guest
                </Button>
              </div>
            </Form>
            <div className="w-100 text-center mt-4">
              Have a account{" "}
              <Link
                style={{
                  color: "#4FA1CA",
                }}
                className="link"
                to="/login"
              >
                Login
              </Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
export default Signup;
