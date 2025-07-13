import React, { useEffect, useRef } from 'react';
import { isDevMode } from '../config';

const JuicyAd = () => {
  const insRef = useRef(null);

  useEffect(() => {
    if (isDevMode) return;

    const script = document.createElement('script');
    script.src = "https://poweredby.jads.co/js/jads.js";
    script.async = true;
    script.setAttribute("data-cfasync", "false");

    script.onload = () => {
      // adsbyjuicy を明示的に初期化してから push
      window.adsbyjuicy = window.adsbyjuicy || [];

      if (insRef.current) {
        window.adsbyjuicy.push({ adzone: 1096016 });
      }
    };

    script.onerror = (e) => {
      console.warn("JuicyAds script load failed", e);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (isDevMode) return null;

  return (
    <div style={{ width: '300px', height: '50px', margin: '20px auto' }}>
      <ins
        ref={insRef}
        id="1096016"
        data-width="300"
        data-height="50"
        style={{ display: 'block' }}
      ></ins>
    </div>
  );
};

export default JuicyAd;
