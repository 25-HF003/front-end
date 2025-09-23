import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function SecondHome() {
  
  const targetRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // 스크롤 이벤트
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting) // 보이면 true
      },
      { threshold: 0.9, }
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) observer.unobserve(targetRef.current);
    }
  }, []);

  return(
      <div ref={targetRef} className="gap-6 mt-6 bg-white flex flex-col justify-center items-center text-white-100 text-[64px]" style={{ minHeight: "calc(100vh + 90px)" }}>
        <Link to="/detection" className="flex items-center gap-6 hover:scale-105 hover:[text-shadow:0_0_3px_white] transition-transform duration-300">
          <span>딥페이크 탐지</span>
          <img src="/arrow1.svg" alt="화살표" />
          <p>Now</p>
        </Link>
        <Link to="/adversarial-noise" className="flex items-center gap-6 hover:scale-105 hover:[text-shadow:0_0_3px_white] transition-transform duration-300">
          <span>적대적 노이즈 삽입</span>
          <img src="/arrow2.svg" alt="화살표" />
          <p>Now</p>
        </Link>
        <Link to="/watermark-insert" className="flex items-center gap-6 hover:scale-105 hover:[text-shadow:0_0_3px_white] transition-transform duration-300">
          <span>디지털 워터마크 삽입</span>
          <img src="/arrow3.svg" alt="화살표" />
          <p>Now</p>
        </Link>
      </div>
  );
}

export default SecondHome;