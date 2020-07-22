import React, { Component } from "react";
import { Container, Col, Row } from "react-bootstrap";
import "./StudentView.css";
import SideCard from "./SideCard.js";
import MyInformation from "./MyInformation";
import Firebase from "../../Firebase.js";
import Button from "react-bootstrap/Button";
import firebase from "firebase";

export class StudentView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentObject: {},
      isReady: false,
    };
    this.handlingUserInfo = this.handlingUserInfo.bind(this);
    this.updateStudentPage = this.updateStudentPage.bind(this);
  }

  handlingUserInfo = async () => {
    console.log(Firebase.auth.currentUser);
    if (Firebase.currentUser !== null) {
      const obj = await Firebase.getUserInfo(Firebase.auth.currentUser.uid);
      console.log(obj);
      return obj[0];
    }
  };

  updateStudentPage = async () => {
    const data = await this.handlingUserInfo();
    this.setState({
      studentObject: data,
    });
  };

  async componentDidMount() {
    const data = await this.handlingUserInfo();
    // console.log(data);
    // console.log(data["Skills"]);
    this.setState({
      studentObject: data,
    });
  }

  render() {
    return (
      <div className="full-panel">
        <Container fluid="true">
          <Row>
            <Col xs={3} className="left-panel">
              <SideCard
                emailAddress={this.state.studentObject["Email"]}
                firstName={this.state.studentObject["First Name"]}
                lastName={this.state.studentObject["Last Name"]}
                resURL={this.state.studentObject["Resume PDF"]}
                profileImgURL={this.state.studentObject["Profile Image"]}
              />
            </Col>
            <Col className="right-panel">
              <div className="myInfoDiv">
                <MyInformation
                  //School
                  schoolData={this.state.studentObject["School"]}
                  // Graduation year
                  gradData={this.state.studentObject["Graduation Year"]}
                  // Major(s)
                  primMajorData={this.state.studentObject["Primary Major"]}
                  //Secondary Major
                  secMajorData={this.state.studentObject["Secondary Major"]}
                  // Minor(s)
                  minorsData={this.state.studentObject["Minors"]}
                  // Skills
                  skillsData={this.state.studentObject["Skills"]}
                  // Events
                  eventData={this.state.studentObject["Events"]}
                  // Programming Languages
                  progLangData={
                    this.state.studentObject["Programming Languages"]
                  }
                  // Frameworks and tools
                  frameAndToolsData={
                    this.state.studentObject["Frameworks and Tools"]
                  }
                  // Operating Systems
                  opSystemsData={this.state.studentObject["Operating Systems"]}
                  // Database Systems
                  dbSystemsData={this.state.studentObject["Database Systems"]}
                  // Name for header
                  fNameData={this.state.studentObject["First Name"]}
                  lNameData={this.state.studentObject["Last Name"]}
                />
              </div>
              <div className="updateButtonDiv">
                <Button variant="primary" onClick={this.updateStudentPage}>
                  Display Updates
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default StudentView;
