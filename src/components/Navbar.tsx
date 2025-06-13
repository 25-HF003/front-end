import { Link } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import { useState } from "react";

interface NavProps {
  navOpen: boolean;
  setNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Navbar({ navOpen, setNavOpen }: NavProps) {

  const [watermarkOpen, setWatermarkOpen] = useState(false);

  return(
    <div className="flex bg-white-200 h-full w-[600px]">
      <div className="flex flex-col text-[50px] relative ml-[20px] ">
          <IoCloseOutline
            className="w-[50px] mt-[20px] "
            onClick={() => setNavOpen(!navOpen)} />
        <div className="flex flex-col mt-[100px] gap-y-[20px] ">
          <Link to="/features" onClick={() => setNavOpen(!navOpen)}>기능 소개</Link>
          <Link to="/detection" onClick={() => setNavOpen(!navOpen)}>딥페이크 탐지</Link>
          <Link to="/adversarial-noise" onClick={() => setNavOpen(!navOpen)}>적대적 노이즈 삽입</Link>
          <div>
            <button onClick={() => setWatermarkOpen(!watermarkOpen)}>디지털 워터마킹</button>
            { watermarkOpen && (
              <div className="flex flex-col text-[40px]">
                <Link to="/watermark-insert" onClick={() => setNavOpen(!navOpen)}>삽입</Link>
                <Link to="/watermark-detection" onClick={() => setNavOpen(!navOpen)}>탐지</Link>
              </div>
            )}
          </div>
          <Link to="/quiz" onClick={() => setNavOpen(!navOpen)}>퀴즈/미션</Link>
        </div>
        <div className="flex absolute bottom-0">
          <Link to="/login" onClick={() => setNavOpen(!navOpen)}>로그인</Link>
          <p>/</p>
          <Link to="/signin" onClick={() => setNavOpen(!navOpen)}>회원가입</Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;