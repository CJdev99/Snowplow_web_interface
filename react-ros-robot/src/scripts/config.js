const Config ={
    ROSBRIDGE_SERVER_IP: '192.168.1.28',
    ROSBRIDGE_SERVER_PORT: '9090',
    RECONNECTION_TIMEOUT: 5000,
    CMD_VEL_TOPIC: '/cmd_vel',
    ROBOT_POSE_TOPIC: '/pose',
    ROBOT_ODOM_TOPIC: '/odom',
    ROBOT_GPS_TOPIC: '/trimble/fix',
}

export default Config;