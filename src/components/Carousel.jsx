import { useEffect, useRef, useState } from 'react';

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function Carousel({ children }) {
  const trackRef = useRef(null);
  const [activeDot, setActiveDot] = useState(0);
  const count = Array.isArray(children) ? children.length : 1;

  const cardWidth = () => {
    const track = trackRef.current;
    if (!track || !track.firstElementChild) return 300;
    return track.firstElementChild.getBoundingClientRect().width + 20;
  };

  const scrollToCard = (idx) => {
    trackRef.current?.scrollTo({ left: cardWidth() * idx, behavior: prefersReduced ? 'auto' : 'smooth' });
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      requestAnimationFrame(() => {
        setActiveDot(Math.round(track.scrollLeft / cardWidth()));
      });
    };
    track.addEventListener('scroll', onScroll);
    return () => track.removeEventListener('scroll', onScroll);
  }, []);

  const onKeyDown = (e) => {
    const track = trackRef.current;
    if (!track) return;
    if (e.key === 'ArrowRight') track.scrollBy({ left: cardWidth(), behavior: 'smooth' });
    if (e.key === 'ArrowLeft') track.scrollBy({ left: -cardWidth(), behavior: 'smooth' });
  };

  return (
    <div className="carousel-shell">
      <div className="carousel" ref={trackRef} tabIndex={0} onKeyDown={onKeyDown}>
        {children}
      </div>
      <div className="carousel-arrows">
        <button
          className="arrow-btn"
          aria-label="previous"
          onClick={() => trackRef.current?.scrollBy({ left: -cardWidth(), behavior: 'smooth' })}
        >
          &#10094;
        </button>
        <button
          className="arrow-btn"
          aria-label="next"
          onClick={() => trackRef.current?.scrollBy({ left: cardWidth(), behavior: 'smooth' })}
        >
          &#10095;
        </button>
      </div>
      <div className="carousel-dots">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            className={`dot${i === activeDot ? ' active' : ''}`}
            aria-label={`slide ${i + 1}`}
            onClick={() => scrollToCard(i)}
          />
        ))}
      </div>
    </div>
  );
}
