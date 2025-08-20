import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import UserInfo from './UserInfo';
import DeepfakePanel from './Panel/DeepfakePanel';
import NoisePanel from './Panel/NoisePanel';
import WatermarkPanel from './Panel/WatermarkPanel';

type Tab = "deepfake" | "noise" | "watermark";

function MyPage() {

  const [searchParams, setSearchParams] = useSearchParams();

  // URL(tab) → 세션스토리지 → 기본값 순으로 초기 탭 결정
  const initialTab = useMemo<Tab>(() => {
    const fromUrl = searchParams.get("tab") as Tab | null;
    if (fromUrl === "deepfake" || fromUrl === "noise" || fromUrl === "watermark") {
      return fromUrl;
    }
    const fromSS = sessionStorage.getItem("mypage.tab") as Tab | null;
    return (fromSS === "deepfake" || fromSS === "noise" || fromSS === "watermark")
      ? fromSS
      : "deepfake";
  }, [searchParams]);

  const [activeTab, setActiveTab] = useState<Tab>(initialTab);

  // 탭 변경 시 URL과 세션스토리지에 동기화
  useEffect(() => {
    sessionStorage.setItem("mypage.tab", activeTab);
    setSearchParams({ tab: activeTab }, { replace: true });
  }, [activeTab, setSearchParams]);


    const renderTabContent = () => {
    switch (activeTab) {
      case 'deepfake':
        return <DeepfakePanel />;
      case 'noise':
        return <NoisePanel />;
      case 'watermark':
        return <WatermarkPanel />;
      default:
        return null;
    }
  };

  return(
    <div className="flex min-h-screen bg-black-100 text-white-100 p-6 space-x-6">
      <UserInfo/>
      <div className="flex-1 bg-white-100 text-black-100 rounded-xl p-6 shadow-lg">
        {/* 탭 메뉴 */}
        <div className="flex space-x-6 border-b pb-2 mb-6 text-xl font-semibold">
          <button
            className={`pb-1 ${activeTab === 'deepfake' ? 'text-green-100 border-b-2 border-pink-400' : 'text-gray-900'}`}
            onClick={() => setActiveTab('deepfake')}>
            딥페이크
          </button>
          <button
            className={`pb-1 ${activeTab === 'noise' ? 'text-green-100 border-b-2 border-pink-400' : 'text-gray-900'}`}
            onClick={() => setActiveTab('noise')}>
            적대적 노이즈
          </button>
          <button
            className={`pb-1 ${activeTab === 'watermark' ? 'text-green-100 border-b-2 border-pink-400' : 'text-gray-900'}`}
            onClick={() => setActiveTab('watermark')}>
            디지털 워터마킹
          </button>
        </div>

        {/* 탭 콘텐츠 */}
        {renderTabContent()}
      </div>
    </div> 
  )
}

export default MyPage;