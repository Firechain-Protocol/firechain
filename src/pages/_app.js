/** Uncomment the below codeblock if you want to add google analytics for more info please visit our docs analytics section */
/** 
import { useEffect } from 'react';
import Router from 'next/router';
import { initGA, logPageView } from 'analytics';
*/
import 'assets/css/react-slick.css';
import 'tailwindcss/tailwind.css';
import './Superfluidstyles.css';
import './calculateFlowRate.css';
import './createFlow.css';
import "../hooks/styles.css";
import "../components/Stream.css";

export default function CustomApp({ Component, pageProps }) {
  /** 
   useEffect(() => {
     initGA();
     logPageView();
     Router.events.on('routeChangeComplete', logPageView);
   }, []);
   */

  return <Component {...pageProps} />;
}
