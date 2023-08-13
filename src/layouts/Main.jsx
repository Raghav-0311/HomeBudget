import React from 'react'

// React-Router-DOM imports
import { Outlet, useLoaderData } from 'react-router-dom';

// Assets import
import wave from "../assets/wave.svg";

// helper functions import
import { fetchData } from '../helpers'

// components import
import Nav from '../components/Nav';

// loader (loader function)
export function mainLoader () {
    const userName = fetchData("userName"); //fetch data from local storage
    return { userName }; // return data
}

const Main = () => {
    const { userName } = useLoaderData(); //whatever data is present in our loader save it in a variable

  return (
    <div className='layout'>
        <Nav userName={userName} />
        <main>
            <Outlet /> {/* whatever is in the children of main it will be displayed */}
        </main>
        <img src={wave} alt="footer" />
    </div>
  )
}

export default Main