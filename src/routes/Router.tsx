import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Signin from "../pages/Signin";
import Login from "../pages/Login";
import Features from "../pages/Features";
import MyPage from "../pages/Mypage/MyPage";
import PwCheck from "../pages/Mypage/PwCheck"
import EditProfile from "../pages/Mypage/EditProfile";
import Detection from "../pages/Deepfake/Detection";
import WatermarkInsert from "../pages/Watermark/WatermarkInsert";
import WatermarkDetection from "../pages/Watermark/WatermarkDetection";
import AdversarialNoise from "../pages/AdversarialNoise/AdversarialNoise";
import Quiz from "../pages/Quiz";
import NotFound from "../pages/NotFound";
import RootLayout from "../layout/RootLayout";
import WatermarkSuccess from "../pages/Watermark/WatermarkSuccess";
import InsertLoading from "../components/InsertLoading";
import DetectionReport from "../pages/Deepfake/DetectionReport";
import WatermarkReport from "../pages/Watermark/WatermarkReport";
import NoiseResult from "../pages/AdversarialNoise/NoiseResult";

const Router = createBrowserRouter([
  {
    path: '/',
    errorElement: <NotFound />,
    element: (
      <RootLayout />
    ),
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/signin',
        element: <Signin />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/features',
        element: <Features />
      },
      {
        path: '/mypage',
        element: <MyPage />
      },
      {
        path: '/mypage/check',
        element: <PwCheck />
      },
      {
        path: '/mypage/edit',
        element: <EditProfile />
      },
      {
        path: '/detection',
        element: <Detection />
      },
      {
        path: '/detection/loading',
        element: <InsertLoading text="탐지중..."/>
      },
      {
        path: '/detection/report',
        element: <DetectionReport />
      },
      {
        path: '/watermark-insert',
        element: <WatermarkInsert />
      },
      {
        path: '/watermark-detection',
        element: <WatermarkDetection />
      },
      {
        path: '/watermark-success',
        element: <WatermarkSuccess />
      },
      {
        path: '/watermark-report',
        element: <WatermarkReport />
      },
      {
        path: '/adversarial-noise',
        element: <AdversarialNoise />
      },
      {
        path: '/adversarial-noise/result',
        element: <NoiseResult />
      },
      {
        path: '/quiz',
        element: <Quiz />
      }
    ]
  }
])

export default Router;