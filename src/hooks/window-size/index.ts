import { useState, useLayoutEffect } from 'react';

const useWindowSize = () => {
  const [size, setSize] = useState([0, 0, false]);
  useLayoutEffect(() => {
    function updateSize() {
      const isMobile = window.innerWidth < 960;
      setSize([window.innerWidth, window.innerHeight, isMobile]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
};

export { useWindowSize };
