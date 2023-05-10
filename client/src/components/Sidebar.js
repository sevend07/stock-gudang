import { Container, Row, Col } from "react-bootstrap";
import { sidebarData } from "./sidebarData";

const Sidebar = () => {
  return (
    <Container>
      <Row>
        <Col>
          <div className="profile">
            <img src="#" alt=""></img>
            <h3 id="username">Username</h3>
            <p id="status">status</p>
          </div>
          <ul>
            {sidebarData.map((val) => {
                return <li>
                    <div>
                        {val.icon}
                    </div>
                </li>
            })} 
          </ul>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default Sidebar;
