import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import MeiHua from "./pages/MeiHua";
import Master from "./pages/Master";
import Bazi from "./pages/Bazi";
import Fortune from "./pages/Fortune";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";

export default function App() {
  // Splash plays EVERY refresh — no sessionStorage check
  const [splashDone, setSplashDone] = useState(false);

  return (
    <>
      {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="master" element={<Master />} />
            <Route path="meihua" element={<MeiHua />} />
            <Route path="bazi" element={<Bazi />} />
            <Route path="fortune" element={<Fortune />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
