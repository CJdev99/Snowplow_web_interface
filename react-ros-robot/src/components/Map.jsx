import React, { Component } from 'react';
//import {ROS2D } from 'ros2d';
//import * as ROS2D from 'ros2d';
import * as Three from 'three';

import Config from '../scripts/config';

class Map extends Component {
    
    constructor(props){
        super(props);
        this.state = { 
            ros:null,
        }; 
        this.view_map = this.view_map.bind(this);
    };
    init_connection(){
        
        //create ros connection
        this.state.ros = new window.ROSLIB.Ros(); //imported via html so use window.
        console.log(this.state.ros);

       
        try{
            this.state.ros.connect("ws://"+Config.ROSBRIDGE_SERVER_IP+":"+Config.ROSBRIDGE_SERVER_PORT);
        }catch(error){
            console.log("connection issue");
        }
    }
    componentDidMount(){
    this.init_connection();
    this.view_map();
    }

view_map(){
    const ROS3D = require("ros3d")
    
    var viewer = new ROS3D.Viewer({
        divID : 'nav_div',
        width : 600,
        height : 600,
        antialias: true,
        intensity: 1.0,
        cameraPose: {x: -1, y: 0, z: 20},
        displayPanAndZoomFrame: true,

    });
    
    var tfclient = new window.ROSLIB.TFClient({
        ros : this.state.ros,
        angularThres: 0.01,
        transThres: 0.01,
        rate: 10.0,
        fixedFrame: '/map'
    });
    var mapClient = new ROS3D.OccupancyGridClient({
        ros : this.state.ros,
        rootObject : viewer.scene,
        continuous: true,
    });

    
    mapClient.on('change', function() {
        viewer.scaleToDimensions(mapClient.currentGrid.width, mapClient.currentGrid.height);
        viewer.shift(mapClient.currentGrid.pose.position.x, mapClient.currentGrid.pose.position.y);
    });
    
}
    render() { 
        return (
            <div id="nav_div"> Viewer </div>
        );
    }
}
 
export default Map;