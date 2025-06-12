import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Signin from "../pages/Signin";
import Login from "../pages/Login";
import Features from "../pages/Features";
import MyPage from "../pages/MyPage";
import Detection from "../pages/Detection";
import WatermarkInsert from "../pages/Watermark/WatermarkInsert";
import WatermarkDetection from "../pages/Watermark/WatermarkDetection";
import AdversarialNoise from "../pages/AdversarialNoise";
import Quiz from "../pages/Quiz";
import NotFound from "../pages/NotFound";
import RootLayout from "../layout/RootLayout";
import WatermarkSuccess from "../pages/Watermark/WatermarkSuccess";

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