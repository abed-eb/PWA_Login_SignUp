import React, { Component } from "react";
import "./login.css";
import { Alert, Form, Modal, Spinner } from "react-bootstrap";
import { Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactCodeInput from "react-verification-code-input";
import { isElementOfType } from "react-dom/test-utils";
import axios from "axios";
class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      codeSent: false,
      invalidPhone: false,
      phoneNumber: null,
      verificationCode: null,
    };
  }

  handleModal = () => {
    this.setState({
      show: !this.state.show,
      codeSent: false,
      invalidPhone: false,
    });
  };

  sendCode = () => {
    let dataIsValid = true;

    if (this.state.invalidPhone || !this.state.phoneNumber) dataIsValid = false;

    if (dataIsValid)
      this.setState({
        codeSent: true,
      });
    else this.setState({ invalidPhone: true });
  };

  login = async () => {
    alert("Verified");
    if (this.state.verificationCode) {
      let FormData = require("form-data");
      let data = new FormData();
      let url = "http://127.0.0.1:8000/"; //sample url
      data.append("verification_code", this.state.verificationCode);
      data.append("phone", this.state.phoneNumber);
      await axios
        .post(url, data)
        .then((res) => {
          if (res.status === 200) {
            console.log("user token : ", res.data.token);
          } else {
            console.log("unknown status");
          }
        })
        .catch((error) => {
          console.log("Failur : ", error);
        });
    }
  };

  handleChange = (e) => {
    if (e.target.value.length != 11) {
      this.setState({ invalidPhone: true, phoneNumber: e.target.value });
    } else {
      this.setState({ invalidPhone: false, phoneNumber: e.target.value });
    }
  };

  render() {
    return (
      <form>
        <div className="main-container d-flex justify-content-center align-items-center">
          <div className="d-flex justify-content-center w-100 button-box">
            <button
              className="login-button btn btn-primary"
              onClick={this.handleModal}
            >
              login
            </button>
          </div>
          <Modal
            centered
            size={"sm"}
            backdrop="static"
            show={this.state.show}
            onHide={this.handleModal}
          >
            <Modal.Header className="row" closeButton>
              <Modal.Title className="col">
                <div className="title">ورود</div>
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <form>
                <div className="form-group d-flex justify-content-center">
                  <div className="input-group d-flex justify-content-center">
                    {!this.state.codeSent ? (
                      <Fragment>
                        <Form.Control
                          id={"phone-input"}
                          className="form-control shadow-none phone-input"
                          type="number"
                          value={this.state.phoneNumber}
                          required
                          isInvalid={this.state.invalidPhone}
                          placeholder="09XXXXXXXXX"
                          dir="ltr"
                          onChange={this.handleChange}
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
                            onChange={(e) =>
                              this.setState({ verificationCode: e })
                            }
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
              {!this.state.codeSent ? (
                <Fragment>
                  <button
                    onClick={this.sendCode}
                    className="btn btn-primary w-100 btn-text"
                  >
                    درخواست کد
                  </button>
                  <p dir="rtl" className="login-text">
                    پس از وارد کردن شماره موبایل یازده رقمی خود و لمس دکمه
                    ‌"درخواست کد" پیامکی حاوی یک کد 6 رقمی برای شما ارسال
                    می‌شود. با وارد کردن کد می‌توانید وارد حساب کاربری خود شوید.
                  </p>
                </Fragment>
              ) : (
                <Fragment>
                  <button
                    onClick={this.login}
                    className="btn btn-primary w-100 btn-text"
                  >
                    تایید و ورود
                  </button>
                  <p
                    onClick={() => this.setState({ codeSent: false })}
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
      </form>
    );
  }
}

export default login;
