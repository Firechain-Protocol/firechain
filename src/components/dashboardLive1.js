/* eslint-disable jsx-a11y/anchor-is-valid */
import { React } from "react";
// import { useNavigate } from "react-router-dom";
import { useRouter } from 'next/router'
import { jsx, Box } from 'theme-ui';
import actions from "../data/livedata";

// eslint-disable-next-line no-unused-vars
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function LiveDashboard() {
  // const navigate = useNavigate();
  const router = useRouter();

  async function Live() {
    router.push("/watchstream");
  }
  async function Claim() {
    router.push("/liveVideo");
  }

  return (
    <Box as="section"  sx={styles.section} className="bg-blue-100 ">
    <>
    <div className=" bg-blue-100 mt-14">
   

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12 bg-blue-100 mt-14">
        <br />
        <div className="md:items-center">
          <center>
            <br />
            <h2 className="text-4xl font-bold leading-1 text-black-900 sm:text-4xl hover:opacity-25">Live Video Streaming Dashboard</h2>
            <br />
            <br />
          </center>
        </div>
      </div>
      <div className="col-span-3 text-white bg-indigo-500  text-4xl flex items-center justify-center">
  
                <div className="p-4 bg-indigo-500">
                  <button type="button" className="w-full bg-blue-800 text-white font-bold py-2 px-12 border-b-4 border-blue-200 hover:border-blue-500 rounded-full" onClick={() => Claim()}> Create Live Video Stream</button>
                </div>
                <div className="p-4 bg-indigo-500">
                  <button type="button" className="w-full bg-blue-800 text-white font-bold py-2 px-12 border-b-4 border-blue-200 hover:border-blue-500 rounded-full" onClick={() => Live()}>Watch Live Stream </button>
                </div>
            
    </div>


    </div>
    </>
    </Box>
  );
}

const styles = {
  section: {
    backgroundColor: 'primary',
    pt: [17, null, null, 20, null],
    pb: [6, null, null, 12, 16],
  },
 };
