import { useState, useEffect } from "react";
import { Button, Modal, Toast, ToastContainer } from "react-bootstrap";
import classNames from "classnames/bind";
import style from "./FromCreateKnight.module.scss";
import robot from "../../../assets/images/robot.gif";
const cx = classNames.bind(style);

function FormCreateKnight() {
  const [show, setShow] = useState(false);
  const [showToast, setShowToast] = useState(false);
  type DataToast = {
    lable: String;
    mesage: string;
    time: string;
  };
  const [dataToast, setDataToast] = useState({} as DataToast);
  interface Knight {
    name: String;
    gender: string;
  }
  const [inputKnight, setInputKnight] = useState<Knight>({
    name: "",
    gender: "1",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const toggleShowTost = () => setShowToast(!showToast);
  const handleInput = (e: any) => {
    setInputKnight({
      ...inputKnight,
      [e.target.name]: e.target.value,
    });
  };

  const createKnight = (e: any) => {
    e.preventDefault();
    setDataToast({
      lable: " Create knight ",
      mesage: " Create knight successfully ",
      time: " just now",
    });
    toggleShowTost();
  };
  return (
    <div className={cx("modal-container")}>
      <p>
        Welcome to Knight NFT, Create your first Knight and join the fight with
        us.{" "}
      </p>
      <p>
        Click the button <b>"Create knight"</b> to continue!
      </p>

      <Button className={cx("create_btn")} onClick={handleShow}>
        Create Knight
      </Button>
      <ToastContainer position="top-end" className="p-3">
        <Toast
          show={showToast}
          onClose={toggleShowTost}
          delay={5000}
          autohide
          animation
          bg="primary"
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">{dataToast.lable}</strong>
            <small className="text-muted">{dataToast.time}</small>
          </Toast.Header>
          <Toast.Body>{dataToast.mesage}</Toast.Body>
        </Toast>
      </ToastContainer>
      <Modal show={show} onHide={handleClose} className={cx("content-modal")}>
        <Modal.Body className={cx("modal-body")}>
          <div className={cx("main")}>
            <form action="" method="POST" className={cx("form")}>
              <img src={robot} alt="" className={cx("robot")} width={100} />
              <h3 className={cx("heading")}>Create Knight</h3>
              <div className={cx("spacer")}></div>

              <div className={cx("form-group")}>
                <label htmlFor="name" className={cx("form-label")}>
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  onChange={handleInput}
                  placeholder="Knight Gnar"
                  className={cx("form-control")}
                />
              </div>
              <div className={cx("form-group")}>
                <label htmlFor="gender" className={cx("form-label")}>
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  onChange={handleInput}
                  className={cx("form-control")}
                >
                  <option value="1">Male</option>
                  <option value="0">Female</option>
                </select>
              </div>
              <button className={cx("form-submit")} onClick={createKnight}>
                Create
              </button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default FormCreateKnight;
