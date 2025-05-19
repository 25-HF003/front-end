import { useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdPerson } from "react-icons/io";

function CommonHeader() {

  const [navOpen, setNavOpen] = useState(false)

  return(
    <div className="relative w-full flex bg-white-200 h-[90px] items-center">
        <AiOutlineMenu className="w-[40px] h-[40px] mx-[10px]" onClick={() => setNavOpen(!navOpen)} />
        {navOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50">
            <Navbar navOpen={navOpen} setNavOpen={setNavOpen} />
          </div>
        )}
        <Link to="/"
          className="text-black-200 text-[32px] font-bold">DeepTruth</Link>
        <Link to="mypage" className="absolute right-0 mx-[10px]">
          <IoMdPerson className="w-[40px] h-[40px]"/>
        </Link>
    </div>
  );
}

export default CommonHeader;