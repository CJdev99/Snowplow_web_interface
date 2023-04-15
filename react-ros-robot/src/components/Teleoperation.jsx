import React, { Component } from 'react';
import { Joystick } from 'react-joystick-component';
import Config from "../scripts/config.js";

class Teleoperation extends Component {
    state = { ros: null } ;

    constructor(){
        super();
        this.init_connection();
        this.handleMove = this.handleMove.bind(this);
        this.handleStop = this.handleStop.bind(this);
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

    handleMove(event) {
        console.log("handle move");
        //publish twist msg to cmd_vel topic
        var cmd_vel = new window.ROSLIB.Topic({
            ros: this.state.ros, // ros handler
            name: Config.CMD_VEL_TOPIC, // topic name
            messageType: "geometry_msgs/Twist", // message type

        });
        //build msg
        var twist = new window.ROSLIB.Message({
            linear: {
                x: event.y,
                y: 0.0,
                z: 0.0
            },
            angular: {
                x: 0.0,
                y: 0.0,
                z: -event.x
            }
        });
        cmd_vel.publish(twist);
    }
    handleStop(event) {
        var cmd_vel = new window.ROSLIB.Topic({
            ros: this.state.ros, // ros handler
            name: Config.CMD_VEL_TOPIC, // topic name
            messageType: "geometry_msgs/Twist", // message type

        });
        //build msg
        var twist = new window.ROSLIB.Message({
            linear: {
                x: 0.0,
                y: 0.0,
                z: 0.0
            },
            angular: {
                x: 0.0,
                y: 0.0,
                z: 0.0
            }
        });
        cmd_vel.publish(twist);
    }
    render() { 
        return (
            <div>
                <Joystick
                size = {100}
                baseColor="#EEEEEE"
                stickColor = "#BBBBBB"
                move={this.handleMove}
                stop={this.handleStop}>
                </Joystick>

            </div>

        
            );
    }
}
 
export default Teleoperation;