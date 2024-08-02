import { BrowserRouter, Routes, Route } from "react-router-dom";
import { basename } from "../../config";
import Home from '../../screens/home/Home'
import Like from "../../screens/like/Like";

export default function Navigation() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/like" element={<Like />} />
      </Routes>
    </BrowserRouter>
  )
}