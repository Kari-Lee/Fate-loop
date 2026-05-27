import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Elements from "./pages/Elements";
import ZodiacMatch from "./pages/ZodiacMatch";
import MeiHua from "./pages/MeiHua";
import Master from "./pages/Master";
import Tarot from "./pages/Tarot";
import Qian from "./pages/Qian";
import Bazi from "./pages/Bazi";
import Fortune from "./pages/Fortune";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

export default function App() {
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("fl_splash_seen") === "1") {
        setSplashDone(true);
      }
    } catch (e) {
      setSplashDone(true);
    }
  }, []);

  const handleSplashDone = () => {
    try { sessionStorage.setItem("fl_splash_seen", "1"); } catch (e) {}
    setSplashDone(true);
  };

  return (
    <>
      {!splashDone && <SplashScreen onDone={handleSplashDone} />}
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="master" element={<Master />} />
            <Route path="elements" element={<Elements />} />
            <Route path="zodiac" element={<ZodiacMatch />} />
            <Route path="meihua" element={<MeiHua />} />
            <Route path="tarot" element={<Tarot />} />
            <Route path="qian" element={<Qian />} />
            <Route path="bazi" element={<Bazi />} />
            <Route path="fortune" element={<Fortune />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
