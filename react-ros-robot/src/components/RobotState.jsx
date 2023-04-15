import React, { Component } from 'react';
import {Row, Col, Container, Button} from 'react-bootstrap';
import Config from "../scripts/config.js";
//import * as Three from 'three';

class RobotState extends Component {
    state = {
        ros:null,
        x:0,
        y:0,
        orientation:0,
        vx:0,
        ang_vel:0,
        lat:0,
        long:0,
      };

    componentDidMount(){
        this.getRobotState();
    }
    getRobotState(){  
        var pose_subscriber = new window.ROSLIB.Topic({

            ros: this.state.ros, // ros handler
            name: Config.ROBOT_POSE_TOPIC, // topic name
            messageType: "geometry_msgs/PoseWithCovarianceStamped", // message type - change to PoseWithCovarianceStamped for real robot
            throttle_rate: 100 // 100 ms

        });
        var gps_subscriber = new window.ROSLIB.Topic({

            ros: this.state.ros, // ros handler
            name: Config.ROBOT_GPS_TOPIC, // topic name
            messageType: "sensor_msgs/NavSatFix", // message type 
            throttle_rate: 50 // 100 ms

        });
        //subscriber for velocity
        var velocity_subscriber = new window.ROSLIB.Topic({
            ros: this.state.ros, // ros handler
            name: Config.ROBOT_ODOM_TOPIC, // topic name
            messageType: "nav_msgs/Odometry", // message type
            throttle_rate: 100 // 100 ms
        });
        
        // pose callback
        pose_subscriber.subscribe((message) => {
            this.setState({x: message.pose.pose.position.x.toFixed(2)});
            this.setState({y: message.pose.pose.position.y.toFixed(2)});
            this.setState({orientation: this.getOrientationFromQuaternion(message.pose.pose.orientation).toFixed(2)});
        })
        gps_subscriber.subscribe((message) => {
            this.setState({lat: message.latitude.toFixed(5)});
            this.setState({lon: message.longitude.toFixed(5)});
        })
        
        //velocity callback
        velocity_subscriber.subscribe((message) => {
            this.setState({vx: message.twist.twist.linear.x.toFixed(2)});
            this.setState({ang_vel: message.twist.twist.angular.z.toFixed(2)});
        });
    }
    getOrientationFromQuaternion(ros_orientation_quaternion){
        const Three = require('three');
        var q = new Three.Quaternion(ros_orientation_quaternion.x, ros_orientation_quaternion.y, ros_orientation_quaternion.z, ros_orientation_quaternion.w);
        var euler = new Three.Euler().setFromQuaternion(q);
        return euler.z;

    }
    constructor(){
        super();
        this.init_connection();
        
    }
    init_connection(){
        
        //create ros connection
        this.state.ros = new window.ROSLIB.Ros(); //imported via html so use window.
        console.log(this.state.ros);

        this.state.ros.on("connection", () => {
            console.log("Connected  in teleop to websocket server.");
            this.setState({connected: true});
    });

    this.state.ros.on('close', () => {
        console.log("Connection to websocket server closed (teleop).");
        this.setState({connected: false});
        // attempt reconnection
        setTimeout(() => {
            try{
            this.state.ros.connect("ws://"+Config.ROSBRIDGE_SERVER_IP+":"+Config.ROSBRIDGE_SERVER_PORT);
            }catch(error){
            console.log(error);
            }
        },Config.RECONNECTION_TIMEOUT);
        });
    // set rosbridge port - where rosbridge is running, might need to modify this when configured on multiple machines+husarnet.
    // public ip: 35.148.8.8
    // private ip:192.168.1.66
    try{
        this.state.ros.connect("ws://"+Config.ROSBRIDGE_SERVER_IP+":"+Config.ROSBRIDGE_SERVER_PORT);
    }catch(error){
        console.log("connection issue");
    }
}


    render() { 
        return (
            <div>
                <Row>
                    <Col>
                        <h4 className="mt-4">position</h4>
                        <p className='mt-0'>x: {this.state.x}</p>
                        <p className='mt-0'>y: {this.state.y}</p>
                        <p className='mt-0'>Orientation: {this.state.orientation}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h4 className="mt-4">Velocities</h4>
                        <p className='mt-0'>vx: {this.state.vx}</p>
                        <p className='mt-0'>ang. vel: { this.state.ang_vel} </p>
                        
                    </Col>
                </Row>
                <Row>
                    <Col>
                        
                        <h4 className="mt-4">GPS Fix</h4>
                        <p className='mt-0'>latitude: {this.state.lat}</p>
                        <p className='mt-0'>longitude: { this.state.lon} </p>
                    </Col>
                </Row>
            </div>
        );
    }
}
 
export default RobotState;