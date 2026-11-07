import { useLayoutEffect, useRef } from "react";

export default function PhoenixPageDecor() {
  const decorRef = useRef(null);

  useLayoutEffect(() => {
    const decor = decorRef.current;
    const surface = decor?.closest(".phoenix-page-surface");
    const hero = surface?.querySelector(".phoenix-hero-v2");
    if (!hero) return undefined;

    const syncDecorStart = () => {
      const heroEnd = hero.getBoundingClientRect().bottom - surface.getBoundingClientRect().top;
      decor.style.setProperty("--phoenix-decor-start", `${heroEnd}px`);
    };

    syncDecorStart();
    const observer = new ResizeObserver(syncDecorStart);
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return <div ref={decorRef} className="phoenix-page-decor" aria-hidden="true">
    <span className="phoenix-page-decor__asset phoenix-page-decor__asset--hero-handoff" />
    <span className="phoenix-page-decor__asset phoenix-page-decor__asset--section-header-left" />
    <span className="phoenix-page-decor__asset phoenix-page-decor__asset--section-header-right" />
    <span className="phoenix-page-decor__asset phoenix-page-decor__asset--tabs-flow" />
    <span className="phoenix-page-decor__asset phoenix-page-decor__asset--teachers-scatter" />
    <span className="phoenix-page-decor__asset phoenix-page-decor__asset--section-bridge" />
    <span className="phoenix-page-decor__asset phoenix-page-decor__asset--stories-wave" />
    <span className="phoenix-page-decor__asset phoenix-page-decor__asset--cta-flow" />
  </div>;
}
