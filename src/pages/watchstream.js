/* eslint-disable jsx-a11y/media-has-caption */
import { React, useState } from "react";
// import ReactHlsPlayer from "react-hls-player";
import { ThemeProvider } from 'theme-ui';
import theme from 'theme';
import SEO from 'components/seo';
import Layout from 'components/layout2';
import { jsx, Box } from 'theme-ui';

export default function Liveclass() {
  // const router = useRouter();
  const [hlsUrl, setHlsUrl] = useState(
    "https://livepeercdn.com/hls/0c170x2rioy1yuzh/index.m3u8"
  ); 

  async function More() {
 
    <a href="https://livepeer.org/">Livepeer</a>;
    // router.push("/community");
  }
  return (
    <ThemeProvider theme={theme}>
    <Layout>
      <SEO
        title="Add new file"
        description="add a new file"
      />
        <Box as="section"  sx={styles.section} className="bg-blue-100 ">
    <>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 bg-blue-100 ">
        <br />
        <div className="md:items-center">
          <center>

            <h2 className="text-6xl font-bold leading-1 text-black-900 sm:text-5xl hover:opacity-25 pt-20"> Watch Live Stream </h2>

          </center>
        </div>
        <div className="w-full text-black font-bold pt-8 text-xl px-4 rounded text-justify">

          Note: The url below is the current live streaming url. If no livestream is active, you can enter a playback url in the textbox to watch a recoreded live session.

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4 pt-4 item-center">

          <input
            type="text"
            className="text-red-500 font-bold py-2 text-xl px-12 rounded w-full my-4 mt-5 border-4 p-4"
            placeholder="HLS Url..."
            value={hlsUrl}
            aria-label="hls-url"
            aria-describedby="set-hls-url"
            onChange={(e) => setHlsUrl(e.target.value)}
          />
          {/** 
          <ReactHlsPlayer
            src={hlsUrl}
            autoPlay={false}
            controls
            className="object-fill item-center"
            width="100%"
            height="auto"
          />
          */}
          {/**
          <div className="-bg-white border shadow rounded-xl overflow-hidden">

            <video id="stream" className="object-fill h-400 w-full" width="100%" height="450px" controls>
              <source src="https://livepeercdn.com/hls/eb3ee78g7crzmczd/index.m3u8" type="application/x-mpegURL" />

            </video>
            <br /><br />
            <iframe
              title="livestream"
              src="src=https://lvpr.tv?v=eb3ee78g7crzmczd"
              // https://livepeercdn.com/hls/eb3ee78g7crzmczd/index.m3u8"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; encrypted-media; picture-in-picture"
              sandbox="allow-scripts"
              className="object-fill h-400 w-full"
              width="100%"
              height="450px"
            />

          </div>
           */}
          <div className="w-full text-red-500 font-bold py-2 text-base px-4 rounded">

            Note: Live streaming is currently open now but will be token gated in the future. Only those with the required access token/NFT will be able to access live streams.

          </div>
          <div className="pb-8 bg-blue-100">
            <button type="button" className="w-full bg-blue-900 text-white font-bold py-2 text-xl px-12 rounded" onClick={() => More()}>Live streaming proudly powered by <b>Livepeer Studio</b></button>
          </div>
        </div>

      </div>
    </>
    </Box>
    </Layout>
    </ThemeProvider>
  );
}

const styles = {
  section: {
    backgroundColor: 'primary',
    pt: [17, null, null, 20, null],
    pb: [6, null, null, 12, 16],
  },
 };
