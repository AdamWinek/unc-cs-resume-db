// import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import personImage from "../../Static/ResumeTemplate.jpg";
import "./SideResumeBox.css";

// export default class SideResumeBox extends Component {
//   render() {
//     return (
//       // 290 by 460
//       <Card
//         className="SideResumeBoxCard"
//         border="dark"
//         style={{ height: "460px", width: "290px" }}
//       >
//         <img
//           src={this.props.currentPhoto}
//           alt=""
//           height="460"
//           width="auto"
//         ></img>
//       </Card>
//     );
//   }
// }

// Changed this to functional so I can use
// hooks to show resume when you click on it
function SideResumeBox(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    // 290 by 460
    <>
      <Card
        className="SideResumeBoxCard"
        border="dark"
        style={{ height: "460px", width: "290px" }}
      >
        <img
          src={props.currentPhoto}
          alt=""
          height="460"
          width="auto"
          onClick={handleShow}
        ></img>
      </Card>
      <Modal show={show} onHide={handleClose} style={{ marginTop: "0" }}>
        <img
          src={props.currentPhoto}
          alt=""
          style={{ width: "50vw", height: "auto" }}
        ></img>
      </Modal>
    </>
  );
}

export default SideResumeBox;
