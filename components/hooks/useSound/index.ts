import { useEffect } from "react";

interface Props {
  target: string;
}
const useSound = (target: string | string[]) => {
  const handleActiveSound = () => {
    const audio = new Audio("/hover.wav");
    audio.play();
  };
  useEffect(() => {
    if (Array.isArray(target)) {
    } else {
      const DomHoverElements = document.getElementsByClassName(target);
      for (let i = 0; i < DomHoverElements.length; i++) {
        DomHoverElements[i].removeEventListener(
          "mouseenter",
          handleActiveSound
        );
        DomHoverElements[i].addEventListener("mouseenter", handleActiveSound);
      }
    }
  }, [target]);
};

export default useSound;
