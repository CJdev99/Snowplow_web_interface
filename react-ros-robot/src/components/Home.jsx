import React, { Component } from 'react';
import Connection from './Connection';
import RobotState from './RobotState';
import Teleoperation from './Teleoperation';
import {Row, Col, Container} from 'react-bootstrap';

class Home extends Component {
    state = { 
        
     };
    render() { 
        return (
            <div>
            <Container>
                <h1 className='text-center mt-3'>Robot Control Page</h1>
                <Row>
                    <Col>
                        <Connection />
                    </Col>
                </Row>
                <Row>
                    <Col>
                      <Teleoperation />
                    </Col>
                    <Col>
                      <h1>map</h1>
                      <p>region for map</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <RobotState />
                    </Col>
                </Row>
             
            </Container>
            </div>
        );
    }
}
 
export default Home;