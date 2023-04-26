# Snowplow_web_interface
## React Application for control of the snowplow over the web.
### Allows teleoperation, saving waypoints, and changing drive modes. 
* Publishers: /start_navigation (switches drive mode), /save_waypoint (saves current position as waypoint), /cmd_vel
* Subscribers: /rtabmap/grid_map, /tf
* Displays images streamed from ROS robot using web_video_server

![image](https://user-images.githubusercontent.com/55821619/234474184-85c83d6a-699a-4bc9-a862-811b8a6859d9.png)
