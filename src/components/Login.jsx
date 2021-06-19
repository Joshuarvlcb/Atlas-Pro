import { Form, Button, Card, Alert } from "react-bootstrap";
import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";

function Login() {
  const guest = () => {
    history.push("/slider");
  };
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  async function handleSubmit(e) {
    // try {
    //   console.log("foo");
    //   setError("");
    //   console.log("click");

    //   setLoading(true);
    //   await login(emailRef.current.value, passwordRef.current.value);
    //   console.log("succ");
    //   history.push("/");
    // } catch (err) {
    //   console.log(err);
    //   setError("failed to sign in");
    // }
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
              className="text-left mb-4"
              style={{
                color: "#4FA1CA",
                fontWeight: "bold",
              }}
            >
              Log in
            </h2>
            {error && (
              <Alert variant="danger">incorect password or email</Alert>
            )}
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

              <div className="center d-flex justify-content-center">
                <Button
                  style={{ fontWeight: "bold", letterSpacing: "1px" }}
                  onClick={handleSubmit}
                  variant="secondary"
                  className=" w-50 mt-2 shadow-none"
                >
                  Log in
                </Button>
                <Button
                  onClick={handleSubmit}
                  className=" w-50 mt-2 shadow-none
                "
                  onClick={guest}
                  style={{
                    marginLeft: "5px",
                    backgroundColor: "rgb(226, 97, 198)",
                    border: "none",
                    fontWeight: "bold",
                    letterSpacing: "1px",
                  }}
                >
                  Guest
                </Button>
              </div>
            </Form>
            <div className="w-100 text-center mt-4">
              Need a account{" "}
              <Link
                style={{
                  color: "#4FA1CA",
                }}
                className="link"
                to="/signup"
              >
                Sign Up
              </Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Login;
