import { useEffect, useRef } from "react";
// import "./Stream.css";
import { Client } from "@livepeer/webrtmp-sdk";
import { ThemeProvider } from 'theme-ui';
import theme from 'theme';
import SEO from 'components/seo';
import Layout from 'components/layout2';
import { jsx, Box } from 'theme-ui';

function Stream() {
  // const inputEl = useRef(null);
  const videoEl = useRef(null);
  const stream = useRef(null);

  useEffect(() => {
    (async () => {
      videoEl.current.volume = 0;

      stream.current = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      videoEl.current.srcObject = stream.current;
      videoEl.current.play();
    })();
  });

  const onButtonClick = async () => {
    // const streamKey = inputEl.current.value;
    const streamKey = "0c17-x366-j4li-c0fo"; 

    if (!stream.current) {
      alert("Video stream was not started.");
    }

    if (!streamKey) {
      alert("Invalid streamKey.");
      return;
    }

    const client = new Client();

    const session = client.cast(stream.current, streamKey);

    session.on("open", () => {
      console.log("Stream started.");
      alert("Stream started; click on Watch-Live-Stream to view or visit Livepeer Dashboard.");
    });

    session.on("close", () => {
      console.log("Stream stopped.");
    });

    session.on("error", (err) => {
      console.log("Stream error.", err.message);
    });
  };

  return (
        <Box as="section"  sx={styles.section} className="bg-blue-200 ">
        <div className="text-4xl text-center text-white font-bold  mb-10">
      <h1> Live Video Stream Page</h1>
    </div>
    <>
    <div className="App">

      <video className="App-video" ref={videoEl}>
        <track
          default
          kind="captions"
          srcLang="en"
          src="/media/examples/friday.vtt"
        />
      </video>
      <button type="button" className="App-button" onClick={onButtonClick}>
        Start Live Streaming
      </button>
      {/**
      <button type="button" className="App-button" onClick={onButtonClick}>
        Stop Streaming
      </button>
          */}
    </div>
    </>
    </Box>
  );
}

export default Stream;
const styles = {
  section: {
    backgroundColor: 'primary',
    pt: [17, null, null, 20, null],
    pb: [6, null, null, 12, 16],
  },
 };