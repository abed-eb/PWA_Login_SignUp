import React, { useEffect, useState } from "react";
import "./login.css";
import { Modal, Form } from "react-bootstrap";
import { Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactCodeInput from "react-verification-code-input";
import axios from "axios";
import { initCC } from "matomo-form-tracker";
const Login = () => {
  const [show, setShow] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [invalidPhone, setInvalidPhone] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [verificationCode, setVerificationCode] = useState(null);

  useEffect(() => {
    if (show) {
      document
        .getElementById("Login-Form")
        .setAttribute("include-form-tracking", true);
      document
        .getElementById("phone-input")
        .setAttribute("include-content-tracking", true);
      initCC(22);
    }
  }, [show]);

  const handleModal = () => {
    setShow(!show);
    setCodeSent(false);
    setInvalidPhone(false);
  };

  const sendCode = () => {
    let dataIsValid = true;
    if (invalidPhone || !phoneNumber) dataIsValid = false;
    if (dataIsValid) setCodeSent(true);
    else setInvalidPhone(true);
  };

  const login = async () => {
    alert("Verified");

    // if (verificationCode) {
    //   let FormData = require("form-data");
    //   let data = new FormData();
    //   let url = "http://127.0.0.1:8000/"; //sample url
    //   data.append("verification_code", verificationCode);
    //   data.append("phone", phoneNumber);
    //   await axios
    //     .post(url, data)
    //     .then((res) => {
    //       if (res.status === 200) {
    //         console.log("user token : ", res.data.token);
    //       } else {
    //         console.log("unknown status");
    //       }
    //     })
    //     .catch((error) => {
    //       console.log("Failur : ", error);
    //     });
    // }
  };

  const handleChange = (e) => {
    if (e.target.value.length !== 11) {
      setInvalidPhone(true);
      setPhoneNumber(e.target.value);
    } else {
      setInvalidPhone(false);
      setPhoneNumber(e.target.value);
    }
  };
  return (
    <div className="main-container d-flex justify-content-center align-items-center">
      <div className="d-flex justify-content-center w-100 button-box">
        <button className="login-button btn btn-primary" onClick={handleModal}>
          login
        </button>
      </div>
      <Modal
        centered
        size={"sm"}
        backdrop="static"
        show={show}
        onHide={handleModal}
      >
        <Modal.Header className="row" closeButton>
          <Modal.Title className="col">
            <div className="title">ورود</div>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form id="Login-Form">
            <div className="form-group d-flex justify-content-center">
              <div className="input-group d-flex justify-content-center">
                {!codeSent ? (
                  <Fragment>
                    <Form.Control
                      id={"phone-input"}
                      className="form-control shadow-none phone-input"
                      type="number"
                      value={phoneNumber}
                      required
                      isInvalid={invalidPhone}
                      placeholder="09XXXXXXXXX"
                      dir="ltr"
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      className={"ml-1 invalid-phone"}
                    >
                      شماره تلفن باید یازده رقم باشد
                    </Form.Control.Feedback>
                  </Fragment>
                ) : (
                  <Fragment>
                    <div dir="ltr">
                      <ReactCodeInput
                        custome-attribute="include-content-tracking"
                        onChange={(e) => setVerificationCode(e)}
                        type="number"
                        fields={6}
                        fieldWidth={40}
                        fieldHeight={40}
                      />
                    </div>
                  </Fragment>
                )}
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          {!codeSent ? (
            <Fragment>
              <button
                onSubmit={sendCode}
                onClick={sendCode}
                className="btn btn-primary w-100 btn-text"
                type="submit"
              >
                درخواست کد
              </button>
              <p dir="rtl" className="login-text">
                پس از وارد کردن شماره موبایل یازده رقمی خود و لمس دکمه ‌"درخواست
                کد" پیامکی حاوی یک کد 6 رقمی برای شما ارسال می‌شود. با وارد کردن
                کد می‌توانید وارد حساب کاربری خود شوید.
              </p>
            </Fragment>
          ) : (
            <Fragment>
              <button
                onClick={login}
                className="btn btn-primary w-100 btn-text"
                type="submit"
              >
                تایید و ورود
              </button>
              <p
                onClick={() => setCodeSent(false)}
                dir="rtl"
                className="login-text"
              >
                (تغییر شماره یا درخواست کد جدید)
              </p>
            </Fragment>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Login;
