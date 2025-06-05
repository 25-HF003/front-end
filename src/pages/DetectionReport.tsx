import { PieChart, Pie, Cell } from 'recharts';
import React, { useEffect, useState } from "react";
import {uploadDeepfakeVideo, DeepfakeResponse } from "../api/deepfake_api";

export default function DetectionReport() {
  const [result, setResult] = useState<DeepfakeResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPrediction() {
      try {
        //const prediction = await uploadVideoForPrediction(); // 🔁 비디오 없이 결과만 요청
        //setResult(prediction);
      } catch (err) {
        setError("예측 실패: " + (err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchPrediction();
  }, []);

  if (loading) return <div className="text-white p-10">분석 중입니다...⏳</div>;
  if (error) return <div className="text-red-600 p-10">❌ {error}</div>;
  if (!result) return null;

  const pieData = [
    { name: 'Fake', value: result.average_fake_confidence * 100 },
    { name: 'Real', value: 100 - result.average_fake_confidence * 100 },
  ];
  const COLORS = ['#ffffff', '#1F2937'];

  return (
    <div className="min-h-screen text-white px-10 py-10">
      {/* 헤더 */}
      <div className="bg-white text-black p-6 rounded-xl mb-6">
        <h2 className="text-lg font-semibold mb-2">딥페이크 탐지 결과</h2>
        <p className="text-sm">분석 날짜: {new Date().toLocaleString()} | 서버 최신 영상 분석</p>
      </div>

      {/* 분석 결과 */}
      <div className="bg-gray-100 text-black p-6 rounded-xl mb-6 flex gap-6 items-center">
        <PieChart width={120} height={120}>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={60}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold">📊 분석 결과</h3>
          <p className="text-base">
            딥페이크 가능성:{" "}
            <strong>{(result.average_fake_confidence * 100).toFixed(2)}%</strong>
          </p>
          <p className="text-sm">최고 의심 확률: {(result.max_confidence * 100).toFixed(2)}%</p>
        </div>
      </div>

      {/* 탐지된 영역 */}
      {result.most_suspect_image && (
        <div className="bg-gray-100 text-black p-6 rounded-xl mb-6">
          <h3 className="text-lg font-bold mb-4">✔️ 가장 의심되는 영역</h3>
          <img
            src={`data:image/jpeg;base64,${result.most_suspect_image}`}
            alt="가장 의심되는 얼굴"
            className="w-[45%] object-cover rounded-md"
          />
        </div>
      )}

      {/* 주의 사항 */}
      <div className="bg-gray-100 text-black p-6 rounded-xl">
        <h3 className="text-lg font-bold text-red-600 mb-4">⚠️ 주의 사항</h3>
        <ul className="list-disc ml-5 space-y-2 text-sm">
          <li>
            해당 영상은 AI 분석 결과 <strong className="text-red-600">딥페이크</strong>일 가능성이 높습니다.
          </li>
          <li>잘못된 정보 유포 주의: 확인되지 않은 정보 공유는 법적 책임을 초래할 수 있습니다.</li>
          <li>보이스피싱, 신원 도용 등 악용 가능성에 주의하세요.</li>
          <li>본인의 초상권/개인정보 침해 시 신고를 고려하세요.</li>
          <li>딥페이크는 일부 국가에서 불법일 수 있습니다.</li>
        </ul>
        <div className="mt-6 grid grid-cols-2 gap-4 text-center text-white text-sm">
          <div className="bg-green-200 py-2 rounded-xl">사이버범죄 신고<br />전화 1377</div>
          <div className="bg-green-200 py-2 rounded-xl">사이버범죄 상담<br />카카오톡 채널</div>
        </div>
      </div>
    </div>
  );
}
