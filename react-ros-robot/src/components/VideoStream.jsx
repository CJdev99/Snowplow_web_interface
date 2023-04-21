import React from 'react';
import placeholderImage from '../images/placeholder-image.jpg';
class VideoStream extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSrc: `http://192.168.1.28:8080/stream?topic=/camera/color/image_raw&t=${Date.now()}`,
      error: null,
    };
  }

  async fetchImage() {
    try {
      const response = await fetch(`http://192.168.1.28:8080/stream?topic=/camera/color/image_raw&t=${Date.now()}`);
      if (!response.ok) {
        throw new Error('Image could not be loaded');
      }
      const imageSrc = response.url;
      this.setState({ imageSrc, error: null });
    } catch (error) {
      console.error(error);
      this.setState({ error });
      setTimeout(() => {
        this.fetchImage();
      }, 5000);
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.fetchImage();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { error, imageSrc } = this.state;
    return (
      <div>
        {error && <p>Error: {error.message}</p>}
        <img src={imageSrc} alt="camera stream" onError={(e) => { e.target.src = placeholderImage }} />
      </div>
    );
  }
}
export default VideoStream;