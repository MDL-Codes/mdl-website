import { useEffect, useRef, useState } from "react";
import "../styles/mission.css";

import mdlTeam from "../assets/mission/mdl-team.webp";
import largeEvent from "../assets/mission/large-event.webp";
import communityPizza from "../assets/mission/community-pizza.webp";
import cadWorkshop from "../assets/mission/cad-workshop.webp";
import printer from "../assets/mission/3d-printer.webp";

const words = [
  { text: "design.", color: "#f3f0e8" },
  { text: "build.", color: "#b9d4ff" },
  { text: "learn.", color: "#f1c7ff" },
  { text: "connect.", color: "#bfe8d0" },
  { text: "create.", color: "#ffd8b8" },
];

const media = [
  {
    src: largeEvent,
    alt: "A large group of students gathered at an MDL event",
    caption: "A room full of students showing up to create.",
    className: "",
  },
  {
    src: communityPizza,
    alt: "MDL members serving pizza during a community event",
    caption: "Community is part of the experience too.",
    className: "mission-media-card--tall",
  },
  {
    src: cadWorkshop,
    alt: "Students participating in a hands-on CAD workshop",
    caption: "Learning CAD by actually using it.",
    className: "",
  },
  {
    src: printer,
    alt: "A 3D printer creating a prototype",
    caption: "From digital models to physical prototypes.",
    className: "mission-media-card--wide",
  },
];

export default function Mission() {
  const [wordIndex, setWordIndex] = useState(0);
  const [wordPhase, setWordPhase] = useState<"in" | "out">("in");
  const [openPhoto, setOpenPhoto] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setWordPhase("out");
      window.setTimeout(() => {
        setWordIndex((current) => (current + 1) % words.length);
        setWordPhase("in");
      }, 260);
    }, 2100);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(".mdl-mission .mission-reveal, .mdl-mission .mission-image-intro")
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const scrollCarousel = (direction: number) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    carousel.scrollBy({ left: direction * Math.max(320, carousel.clientWidth * 0.72), behavior: "smooth" });
  };

  const togglePhoto = (id: string) => {
    setOpenPhoto((current) => (current === id ? null : id));
  };

  return (
    <div className="mdl-mission">
      <div className="mission-blueprint-grid" aria-hidden="true" />

      {/* A div, not a <main>: Layout already provides the page's single <main>,
          and on /full six pages render at once — six nested landmarks. */}
      <div id="mission-top">
        <section className="mission-shell mission-hero">
          <div className="mission-hero-copy mission-reveal is-visible">
            <h1>
              We’re here to
              <span className="mission-rotator" aria-label="design, build, learn, connect, and create">
                <span
                  className={`mission-rotating-word mission-word-${wordPhase}`}
                  style={{ color: words[wordIndex].color }}
                >
                  {words[wordIndex].text}
                </span>
              </span>
            </h1>
            <p className="mission-hero-body">
              McMaster Design League is a student-run community for people who want to get better at CAD,
              try out design ideas, and meet other students who like making things.
            </p>
            <a className="mission-story-link" href="#mission-media">
              SEE WHAT WE DO <span>↓</span>
            </a>
          </div>

          <div className="mission-image-intro is-visible">
            <figure
              className={`mission-interactive-photo mission-hero-photo ${openPhoto === "hero" ? "is-open" : ""}`}
              tabIndex={0}
              role="button"
              aria-label="MDL team members at an event. Press to show a note."
              onClick={() => togglePhoto("hero")}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  togglePhoto("hero");
                }
              }}
            >
              {/* Above the fold, so eager — lazy here would delay the hero. */}
              <img
                src={mdlTeam}
                alt="McMaster Design League team members at an event"
                decoding="async"
              />
              <figcaption className="mission-photo-pop-blurb">
                MDL brings students together to learn, build, share ideas, and make things with people who
                are interested in design.
              </figcaption>
            </figure>
          </div>
        </section>

        <section id="mission-media" className="mission-media-section">
          <div className="mission-shell mission-media-heading mission-reveal">
            <h2>
              A few moments
              <br />
              from MDL.
            </h2>
            <div className="mission-carousel-controls" aria-label="Media carousel controls">
              <button type="button" aria-label="Previous photo" onClick={() => scrollCarousel(-1)}>
                ←
              </button>
              <button type="button" aria-label="Next photo" onClick={() => scrollCarousel(1)}>
                →
              </button>
            </div>
          </div>

          <div className="mission-carousel-wrap mission-reveal">
            <div
              ref={carouselRef}
              className="mission-carousel"
              tabIndex={0}
              aria-label="Photos from MDL events and community activities"
            >
              {media.map((item) => (
                <figure className={`mission-media-card ${item.className}`} key={item.src}>
                  {/* Off-screen until the strip is scrolled, and the only images
                      on the page besides the hero — every other page already
                      lazy-loads, Mission did not. */}
                  <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
                  <figcaption>{item.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="mission-focus-section" id="mission-focus">
          <div className="mission-shell">
            <div className="mission-focus-heading mission-reveal">
              <h2>
                What we focus
                <br />
                on.
              </h2>
              <p>
                Our Designathon, hands-on workshops, and a community where students can learn from one another.
              </p>
            </div>

            <div className="mission-focus-grid">
              {/* data-number feeds the ghosted display numeral in the card's
                  corner (mission.css .mission-focus-card::after). */}
              <article className="mission-focus-card mission-reveal" data-number="01">
                <span className="mission-focus-number">01</span>
                <div className="mission-focus-rule" />
                <h3>Designathon.</h3>
                <p>
                  Our annual CAD Designathon brings students together to take on industry-sponsored design
                  challenges. It’s a chance to work in a team, try new ideas, and put your CAD skills into practice.
                </p>
                <span className="mission-focus-tags">COMPETE / COLLABORATE</span>
              </article>

              <article className="mission-focus-card mission-reveal" data-number="02">
                <span className="mission-focus-number">02</span>
                <div className="mission-focus-rule" />
                <h3>Workshops.</h3>
                <p>
                  We run hands-on workshops around tools like SolidWorks and other design skills. They give students
                  a practical way to learn outside of class, no matter how much experience they start with.
                </p>
                <span className="mission-focus-tags">LEARN / BUILD</span>
              </article>

              <article className="mission-focus-card mission-reveal" data-number="03">
                <span className="mission-focus-number">03</span>
                <div className="mission-focus-rule" />
                <h3>Community.</h3>
                <p>
                  MDL is also a place to meet people who are interested in design. Students can share projects,
                  ask for feedback, and learn from each other as they build.
                </p>
                <span className="mission-focus-tags">SHARE / CONNECT</span>
              </article>
            </div>
          </div>
        </section>

        <section className="mission-final-message">
          <div className="mission-shell mission-final-inner mission-reveal">
            <h2>
              Learn by actually
              <br />
              <em>making things.</em>
            </h2>
            <p>
              We want MDL to be a place where students can try something new, get better through practice, and
              learn alongside people who are doing the same.
            </p>
            <div className="mission-final-ticker" aria-hidden="true">
              <span>DESIGN</span><i>×</i><span>BUILD</span><i>×</i><span>TEST</span><i>×</i>
              <span>SHARE</span><i>×</i><span>REPEAT</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
