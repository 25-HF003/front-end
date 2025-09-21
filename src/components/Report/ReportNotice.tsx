import { Link, useLocation } from "react-router-dom";

function ReportNotice() {

  const location = useLocation();
  const path = location.pathname;

  const deep = path.includes("detection");
  // const wam = path.includes("watermark");

  let message = deep ? (
    <>
      해당 영상/이미지는 AI 분석 결과 <strong className="text-red-600">딥페이크</strong>일 가능성이 높습니다.
      이는 원본 영상이 조작되었을 가능성을 의미하며, 신뢰할 수 있는 추가 검증이 필요합니다.
    </>
  ) : (
    <>
      탐지된 워터마크가 원본과 다릅니다!<br/>
      필요한 경우 신고를 진행하세요.
    </>
  );

  return(
    <div className="bg-gray-100 p-6 rounded-xl">
        <h3 className="text-3xl font-extrabold text-red-100 mb-4">⚠️ 주의 사항</h3>
        <ul className="list-disc ml-5 space-y-5 text-xl">
          <p>
            {message}
          </p>
          <li>
            잘못된 정보 유포 주의: 딥페이크 기술은 현실과 매우 유사한 가짜 영상을 만들어낼 수 있습니다.
            확인되지 않은 정보를 공유할 경우 허위 사실 유포로 인한 법적 책임이 발생할 수 있습니다.
          </li>
          <li>
            금융 및 사기 관련 위험: 딥페이크는 보이스 피싱, 사기 광고, 신원 도용 등의 악용될 가능성이 있습니다.
          </li>
          <li>
            개인정보 보호: 딥페이크 영상이 개인의 동의 없이 제작되었을 가능성이 있습니다. 본인의 초상권이나 개인정보가 침해되었다면 즉시 신고를 고려하세요.
          </li>
          <li>
            법적 대응 가능성: 일부 국가에서는 딥페이크 제작 및 유포가 불법으로 간주될 수 있습니다.
          </li>
        </ul>

        <div className="mt-6 grid grid-cols-2 gap-6 text-center text-white-100 text-xl">
          <a
            href="https://ecrm.police.go.kr/minwon/main"
            target="_blank" //새탭에서 열기
            rel="noopener noreferrer" //새탭에서 열기
            className="bg-green-200 py-2 rounded-xl w-full block"
          >
            사이버범죄 신고 및 상담
            <br />
            경찰청 사이버범죄 신고페이지
          </a>
          <a
            href="https://d4u.stop.or.kr/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-200 py-2 rounded-xl w-full block"
          >
            사이버범죄 신고 및 상담
            <br />
            디지털 성범죄 피해자 지원센터
          </a>
        </div>
      </div>



    /*<div className="bg-gray-50 rounded-[44px] h-[730px] p-[30px]">
        <h3 className="text-[36px] font-extrabold text-red-100 mb-4">⚠️ 주의 사항</h3>
        <ul className="list-disc ml-5 space-y-7 text-[28px] ">
          <p>
            {message}
          </p>
          <li>
            잘못된 정보 유포 주의: 딥페이크 기술은 현실과 매우 유사한 가짜 영상을 만들어낼 수 있습니다.
            확인되지 않은 정보를 공유할 경우 허위 사실 유포로 인한 법적 책임이 발생할 수 있습니다.
          </li>
          <li>
            금융 및 사기 관련 위험: 딥페이크는 보이스 피싱, 사기 광고, 신원 도용 등의 악용될 가능성이 있습니다.
          </li>
          <li>
            개인정보 보호: 딥페이크 영상이 개인의 동의 없이 제작되었을 가능성이 있습니다. 본인의 초상권이나 개인정보가 침해되었다면 즉시 신고를 고려하세요.
          </li>
          <li>
            법적 대응 가능성: 일부 국가에서는 딥페이크 제작 및 유포가 불법으로 간주될 수 있습니다.
          </li>
        </ul>

        <div className="mt-6 flex justify-evenly text-center text-white-100 text-[20px]">
          <button className="w-[360px] bg-green-200 py-2 rounded-xl">사이버범죄 신고 및 상담<br />전화 1377</button>
          <button className="w-[360px] bg-green-200 py-2 rounded-xl">사이버범죄 신고 및 상담<br />카카오톡 채널</button>
        </div>
    </div>*/
  );
}

export default ReportNotice;