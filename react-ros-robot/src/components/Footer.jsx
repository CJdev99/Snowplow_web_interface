import React, { Component } from 'react';
import {Container} from 'react-bootstrap';
class Footer extends Component {
    state = {  } 
    render() { 
        //create menu
        return (<Container className="text-center">
            <p>MNSU Mechanical Engineering - Robotics Lab &copy; 2023</p>
            </Container>);
    }
}
 
export default Footer;