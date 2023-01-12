import { RefObject, TouchEvent, useEffect, useRef, useState } from "react";
import ProductCard, {
  ProductCardRollingProps,
  productInfoI,
} from "./ProductCard";

export interface useRollingProps {
  containerRef: RefObject<HTMLElement>;
  delay?: number;
  defaultLength: number;
  scrollCalc: (index: number, compWidth: number, isPC: boolean) => number;
}

export const useRolling = (props: useRollingProps) => {
  const { containerRef, delay = 300, defaultLength, scrollCalc } = props;
  const transitionString = `margin cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms 0s`;
  const startIndex = 2 * defaultLength;
  const endIndex = startIndex + defaultLength - 1;
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [touchPosition, setTouchPosition] = useState<null | number>(null);
  const doScroll = (newIndex: number, isStopped = false) => {
    if (!containerRef.current) return;
    const isPC = window.matchMedia("(min-width: 1024px)");
    const width = containerRef.current.offsetWidth;
    const target = scrollCalc(newIndex, width, isPC.matches);
    const targetTransition = isStopped ? "none" : transitionString;
    if (containerRef.current.style.transition !== targetTransition)
      containerRef.current.style.transition = targetTransition;
    containerRef.current.style.marginLeft = `-${target}px`;
  };

  const setCurrentIndexHandler = (newIndex: number, isStopped = false) => {
    doScroll(newIndex, isStopped);
    setCurrentIndex(newIndex);
  };
  useEffect(() => {
    console.log({ startIndex, defaultLength, currentIndex });
    setCurrentIndex(startIndex);
    doScroll(startIndex, true);
  }, [defaultLength]);

  useEffect(() => {
    doScroll(currentIndex, true);
  }, []);

  useEffect(() => {
    const resizeScroll = () => {
      if (!containerRef.current) return;
      doScroll(currentIndex, true);
    };
    window.addEventListener("resize", resizeScroll);
    return () => {
      window.removeEventListener("resize", resizeScroll);
    };
  }, [currentIndex]);

  const changeAfterMove = (target: number) => {
    setTimeout(() => {
      if (!containerRef.current) return;
      containerRef.current.style.transition = "none";
      setCurrentIndexHandler(target, true);
    }, delay);
  };
  const changeIndex = (diff: number) => {
    const newIndex = currentIndex + diff;
    let targetIndex = newIndex;
    if (newIndex > endIndex) targetIndex -= defaultLength;
    else if (newIndex < startIndex) targetIndex += defaultLength;
    if (targetIndex !== newIndex) {
      changeAfterMove(targetIndex);
    }
    setCurrentIndexHandler(newIndex);
  };
  const setIndex = (newIndex: number) => {
    const targetIndex = newIndex + startIndex;
    if (targetIndex < startIndex || targetIndex > endIndex) {
      console.error("setIndex는 배열 범위 내의 수만 받습니다.");
      return;
    }
    setCurrentIndexHandler(targetIndex);
  };
  const handleTouchStart = (e: TouchEvent<HTMLElement>) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };
  const handleTouchMove = (e: TouchEvent<HTMLElement>) => {
    const touchDown = touchPosition;
    if (touchDown === null) {
      return;
    }
    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;
    if (diff > 5) {
      changeIndex(1);
    }
    if (diff < -5) {
      changeIndex(-1);
    }
    setTouchPosition(null);
  };
  const getShowIndex = () => {
    let nowIndex = currentIndex;
    if (nowIndex > endIndex) nowIndex -= defaultLength;
    else if (nowIndex < startIndex) nowIndex += defaultLength;
    return nowIndex - startIndex;
  };
  const showIndex = getShowIndex();
  return {
    changeIndex,
    handleTouchStart,
    handleTouchMove,
    currentIndex,
    showIndex,
    setIndex,
  };
};

export default useRolling;
