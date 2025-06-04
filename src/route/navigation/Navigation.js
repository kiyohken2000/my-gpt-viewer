import { BrowserRouter, Routes, Route } from "react-router-dom";
import { basename } from "../../config";
import Home from '../../screens/home/Home'
import Like from "../../screens/like/Like";
import Links from "../../screens/links/Links";
import Videos from "../../screens/videos/Videos";
import Words from "../../screens/words/Words";
import Sample from "../../screens/sample/Sample";

export default function Navigation() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/like" element={<Like />} />
        <Route path="/links" element={<Links />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/words" element={<Words />} />
        <Route path="/sample" element={<Sample />} />
      </Routes>
    </BrowserRouter>
  )
}