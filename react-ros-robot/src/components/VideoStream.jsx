import React, { Component } from "react";
import Config from "../scripts/config";
class VideoStream extends Component {
  constructor(props) {
    super(props);
    this.imgRef = React.createRef();
    this.wsRef = null;
    this.state = {
        isLoaded: false,
      };
  }

  componentDidMount() {
    // Create a WebSocket connection to the web_video_server
    const ws = new WebSocket("ws://"+Config.ROSBRIDGE_SERVER_PORT+":8080/stream?topic=/camera/color/image_raw");

    ws.onopen = () => {
      console.log("WebSocket connection established.");
      this.wsRef = ws;
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onmessage = (event) => {
      // When a new message is received, update the <img> element's src attribute with the data
      const blob = new Blob([event.data], { type: "image/jpeg" });
      const url = URL.createObjectURL(blob);
      this.imgRef.current.src = url;
      this.setState({
        isLoaded: true,
      });
    };
  }

  componentWillUnmount() {
    if (this.wsRef) {
      this.wsRef.close();
    }
  }

  render() {
    const { isLoaded } = this.state;
    return <img
     ref={this.imgRef} 
     alt="Video stream" 
     width={640}
     height={480}
     src={isLoaded ? "" : "/images/placeholder-image.jpg"}
     />;
  }
}

export default VideoStream;