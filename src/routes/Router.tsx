import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Signin from "../pages/Signin";
import Login from "../pages/Login";
import Features from "../pages/Features";
import MyPage from "../pages/MyPage";
import Detection from "../pages/Deepfake/Detection";
import WatermarkInsert from "../pages/Watermark/WatermarkInsert";
import WatermarkDetection from "../pages/Watermark/WatermarkDetection";
import AdversarialNoise from "../pages/AdversarialNoise";
import Quiz from "../pages/Quiz";
import NotFound from "../pages/NotFound";
import RootLayout from "../layout/RootLayout";
import InsertLoading from "../components/InsertLoading";
import DetectionReport from "../pages/Deepfake/DetectionReport";

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
        path: '/adversarial-noise',
        element: <AdversarialNoise />
      },
      {
        path: '/quiz',
        element: <Quiz />
      }
    ]
  }
])

export default Router;