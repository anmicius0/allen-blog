import { useRef, useCallback, useMemo } from "react";
import Header from "../components/Header";
import ServiceCard from "../components/ServiceCard";
import Socials from "../components/Socials";
import WorkCard from "../components/WorkCard";
import { useIsomorphicLayoutEffect } from "../utils";
import { stagger } from "../animations";
import Footer from "../components/Footer";
import Head from "next/head";
import Cursor from "../components/Cursor";

// Local Data
import data from "../data/portfolio.json";

export default function Home() {
  // Ref
  const workRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const textOne = useRef<HTMLHeadingElement | null>(null);
  const textTwo = useRef<HTMLHeadingElement | null>(null);
  const textThree = useRef<HTMLHeadingElement | null>(null);
  const textFour = useRef<HTMLHeadingElement | null>(null);

  // Destructure data
  const { showCursor, name, headerTagline, projects, services, aboutpara } =
    data;

  // Handling Scroll
  const handleWorkScroll = useCallback(() => {
    if (workRef.current) {
      window.scrollTo({
        top: workRef.current.offsetTop,
        left: 0,
        behavior: "smooth",
      });
    }
  }, []);

  const handleAboutScroll = useCallback(() => {
    if (aboutRef.current) {
      window.scrollTo({
        top: aboutRef.current.offsetTop,
        left: 0,
        behavior: "smooth",
      });
    }
  }, []);

  useIsomorphicLayoutEffect(() => {
    stagger(
      [textOne.current, textTwo.current, textThree.current, textFour.current],
      { y: 40, x: -10, transform: "scale(0.95) skew(10deg)" },
      { y: 0, x: 0, transform: "scale(1)" }
    );
  }, []);

  const memoizedProjects = useMemo(() => projects, [projects]);
  const memoizedServices = useMemo(() => services, [services]);

  return (
    <div className={`relative ${showCursor && "cursor-none"}`}>
      {showCursor && <Cursor />}
      <Head>
        <title>{name}</title>
      </Head>

      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>

      <div className="container mx-auto mb-10">
        <Header
          handleWorkScroll={handleWorkScroll}
          handleAboutScroll={handleAboutScroll}
          isBlog={false}
        />

        {/* Hero */}
        <div className="laptop:mt-20 mt-10">
          <div className="mt-5">
            <h1
              ref={textOne}
              className="text-2xl tablet:text-5xl laptop:text-5xl laptopl:text-7xl p-1 tablet:p-2 text-bold w-4/5 mob:w-full laptop:w-4/5"
              dangerouslySetInnerHTML={{ __html: headerTagline }}
            ></h1>
          </div>

          <Socials className="mt-2 laptop:mt-5" />
        </div>

        {/* Work */}
        <div className="mt-10 laptop:mt-30 p-2 laptop:p-0" ref={workRef}>
          <h2 className="text-3xl text-bold">Work.</h2>

          <div className="m-2 laptop:mt-10 grid grid-cols-1 tablet:grid-cols-2 gap-4">
            {memoizedProjects.map((project) => (
              <WorkCard
                key={project.id}
                img={project.imageSrc}
                name={project.title}
                description={project.description}
                onClick={() => window.open(project.url)}
              />
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="mt-10 laptop:mt-30 p-2 laptop:p-0">
          <h2 className="text-3xl text-bold">Services.</h2>
          <div className="m-2 grid grid-cols-1 laptop:grid-cols-2 gap-6">
            {memoizedServices.map((service, index) => (
              <ServiceCard
                key={index}
                name={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>

        {/* About */}
        <div className="mt-10 laptop:mt-40 p-2 laptop:p-0" ref={aboutRef}>
          <h2 className="text-3xl text-bold">About.</h2>
          <p
            className="m-2 text-xl laptop:text-3xl w-full laptop:w-3/5"
            dangerouslySetInnerHTML={{ __html: aboutpara }}
          />
        </div>
        <Footer />
      </div>
    </div>
  );
}
