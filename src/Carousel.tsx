import React, {
  useState,
  useEffect,
  ReactNode,
  ReactElement,
  useRef,
  useMemo,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CAROUSEL_TRANSITION_TIME = 500;

interface CarouselProps {
  children: ReactElement[];
  autoSlide?: boolean;
  autoSlideInterval: number;
}

const Carousel = ({
  children,
  autoSlide = false,
  autoSlideInterval = 3000,
}: CarouselProps) => {
  const childrenArray = React.Children.toArray(children);

  const carouselItemsToRender = [
    React.cloneElement(childrenArray.at(-1) as ReactElement, {
      key: "last-item",
    }),
    ...childrenArray,
    React.cloneElement(childrenArray[0] as ReactElement, { key: "first-item" }),
  ];

  const firstRealItemIdx = 1;
  const lastRealItemIdx = carouselItemsToRender.length - 2;

  const [isTransitionOn, setIsTransitionOn] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(firstRealItemIdx);

  const isCarouselMoving = useRef(false);

  const prev = () => {
    if (isCarouselMoving.current) return;
    isCarouselMoving.current = true;

    setIsTransitionOn(true);
    setCurrentIdx((prev) => prev - 1);

    const timeoutId = setTimeout(() => {
      if (currentIdx === firstRealItemIdx) {
        setIsTransitionOn(false);
        setCurrentIdx(lastRealItemIdx);
      }
      isCarouselMoving.current = false;
    }, CAROUSEL_TRANSITION_TIME);

    return () => clearTimeout(timeoutId);
  };

  const next = useMemo(
    () => () => {
      if (isCarouselMoving.current) return;
      isCarouselMoving.current = true;

      setIsTransitionOn(true);
      setCurrentIdx((prev) => prev + 1);

      const timeoutId = setTimeout(() => {
        if (currentIdx === lastRealItemIdx) {
          setIsTransitionOn(false);
          setCurrentIdx(firstRealItemIdx);
        }
        isCarouselMoving.current = false;
      }, CAROUSEL_TRANSITION_TIME);

      return () => clearTimeout(timeoutId);
    },
    [currentIdx, lastRealItemIdx]
  );

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval, next]);

  return (
    <div className="overflow-hidden relative">
      <div>{currentIdx}</div>
      <div>{isTransitionOn ? "on" : "off"}</div>
      <div
        className="flex transition-transform ease-out"
        style={{
          transform: `translateX(-${currentIdx * 100}%)`,
          transitionDuration: isTransitionOn
            ? `${CAROUSEL_TRANSITION_TIME}ms`
            : "0ms",
        }}
      >
        {carouselItemsToRender}
      </div>

      <div className="absolute inset-0 flex items-center justify-between p-4">
        <CarouselPrevious onClick={prev} />
        <CarouselNext onClick={next} />
      </div>

      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {[...new Array(childrenArray.length).keys()].map((i) => (
            <div
              key={i}
              className={`
              transition-all w-3 h-3 bg-white rounded-full
              ${currentIdx === i + 1 ? "p-2" : "bg-opacity-50"}
            `}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const CarouselItem = ({ children }: { children: ReactNode }) => {
  return <div className="min-w-full">{children}</div>;
};

const CarouselNext = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
    >
      <ChevronRight size={40} />
    </button>
  );
};

const CarouselPrevious = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
    >
      <ChevronLeft size={40} />
    </button>
  );
};

Carousel.Item = CarouselItem;

export default Carousel;
