import React, { Component } from 'react';
import Alert from "react-bootstrap/Alert";
import Config from "../scripts/config.js";


class Connection extends Component {
    state = {
        connected: false, ros: null
      } ;

      constructor(){
        super();
        this.init_connection();
      }

    //init connection: check connection status
    init_connection(){
        
        //create ros connection
        this.state.ros = new window.ROSLIB.Ros(); //imported via html so use window.
        console.log(this.state.ros);

        this.state.ros.on("connection", () => {
            console.log("Connected to websocket server.");
            this.setState({connected: true});
    });

    this.state.ros.on('close', () => {
        console.log("Connection to websocket server closed.");
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
                <Alert className="text-center m-3" variant={this.state.connected? "success": "danger"}>
                    {this.state.connected? "Robot Connected!": "Robot Disconnected"} 
                </Alert>
            </div>
            );
    }
}
 
export default Connection;