import classes from "./VideoBackground.module.css";

const VideoBackground = () => {
  return (
      <div
        className={`z-0 absolute top-0 left-0 h-screen w-full ${classes["video_background"]}`}
      >
        <video
          className="w-full h-full object-cover"
          autoplay=""
          loop=""
          muted=""
          poster="https://res.cloudinary.com/ngasco/video/upload/v1622743058/bonsai_background/background_wdl1cb.jpg"
        >
          <source
            src="https://res.cloudinary.com/ngasco/video/upload/v1622748594/bonsai_background/Background-1_g14o5n.mp4"
            type="video/mp4"
          />
        </video>
      </div>
  );
};

export default VideoBackground;
