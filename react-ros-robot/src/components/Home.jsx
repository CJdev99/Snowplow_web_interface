import React, { Component } from 'react';
import Connection from './Connection';
import RobotState from './RobotState';
import Teleoperation from './Teleoperation';
import Map from './Map';
import VideoStream from './VideoStream';
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
                      <h1>front view:</h1>
                      <VideoStream />
                    </Col>
                    <Col>
                      <h1>MAP</h1>
                      <Map />
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