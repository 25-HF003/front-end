import { useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";

function HomeHeader() {

  const [navOpen, setNavOpen] = useState(false);

  return(
    <div className="relative flex h-[90px] items-center">
        <AiOutlineMenu className="w-[50px] h-[50px] text-white-200" onClick={() => setNavOpen(!navOpen)} />
        {navOpen && (
          <div className="z-50 fixed inset-0 bg-black bg-opacity-50">
            <Navbar navOpen={navOpen} setNavOpen={setNavOpen} />
          </div>
        )}
      <Link to="/"
        className="text-white-200 text-[64px] font-bold mx-auto">DeepTruth</Link>
    </div>
  );
}

export default HomeHeader;