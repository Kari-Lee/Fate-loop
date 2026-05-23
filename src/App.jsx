import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Elements from "./pages/Elements";
import ZodiacMatch from "./pages/ZodiacMatch";
import MeiHua from "./pages/MeiHua";
import Tarot from "./pages/Tarot";
import Qian from "./pages/Qian";
import Bazi from "./pages/Bazi";
import Fortune from "./pages/Fortune";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
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
  );
}
