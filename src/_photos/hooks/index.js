import { useLayoutEffect, useRef, useState } from "react";
const THRESHOLD_FROM_BOTTOM = 50;

export function useBottomReached(node, from_bottom = THRESHOLD_FROM_BOTTOM) {
  let lastKnownScrollPosition = useRef(0);
  let ticking = useRef(false);
  let waitToSetIsBottomReached = useRef(false);
  let [isBottomReached, setIsBottomReached] = useState(false);

  useLayoutEffect(() => {
    function calculateIfScrollIsReacedAtBottom(scrollPos) {
      let atBottom =
        node.current.clientHeight -
          (window.innerHeight + scrollPos + from_bottom) <=
        0
          ? true
          : false;
      if (atBottom) {
        if (!waitToSetIsBottomReached.current) {
          waitToSetIsBottomReached.current = true;
          setIsBottomReached(true);
        }
      } else {
        if (waitToSetIsBottomReached.current) {
          waitToSetIsBottomReached.current = false;
          setIsBottomReached(false);
        }
      }
    }
    function listnerFunction() {
      lastKnownScrollPosition.current = window.scrollY;
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          calculateIfScrollIsReacedAtBottom(lastKnownScrollPosition.current);
          ticking.current = false;
        });
        ticking.current = true;
      }
    }
    node.current && document.addEventListener("scroll", listnerFunction);
    return () => {
      document.removeEventListener("scroll", listnerFunction);
    };
  }, []);

  return [isBottomReached];
}
