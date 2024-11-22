import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cursor from "../components/Cursor";
import Header from "../components/Header";
import ProjectResume from "../components/ProjectResume";
import { useTheme } from "next-themes";
// Data
import portfolio from "../data/portfolio.json";

const Resume: React.FC = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const [mount, setMount] = useState(false);
  const name = portfolio.name;
  const tagline = portfolio.resume.tagline;

  useEffect(() => {
    setMount(true);
    if (!portfolio.showResume) {
      router.push("/");
    }
  }, []);

  return (
    <>
      {portfolio.showCursor && <Cursor />}
      <div
        className={`container mx-auto mb-10 ${
          portfolio.showCursor && "cursor-none"
        }`}
      >
        <Header isBlog />
        {mount && (
          <div className="mt-10 w-full flex flex-col items-center">
            <div
              className={`w-full ${
                mount && theme === "dark" ? "bg-slate-800" : "bg-gray-50"
              } max-w-4xl p-20 mob:p-5 desktop:p-20 rounded-lg shadow-sm`}
            >
              <h1 className="text-3xl font-bold">{name}</h1>
              <h2 className="text-xl mt-5">{tagline}</h2>
              <h2
                className="w-4/5 text-xl mt-5 opacity-50"
                dangerouslySetInnerHTML={{
                  __html: portfolio.resume.description,
                }}
              />

              <div className="mt-5">
                <h1 className="text-2xl font-bold">Experience</h1>

                {portfolio.resume.experiences.map(
                  ({ id, dates, type, position, bullets }) => (
                    <ProjectResume
                      key={id}
                      dates={dates}
                      type={type}
                      position={position}
                      bullets={bullets}
                    />
                  )
                )}
              </div>
              <div className="mt-5">
                <h1 className="text-2xl font-bold">Education</h1>
                <div className="mt-2">
                  <h2 className="text-lg">
                    {portfolio.resume.education.universityName}
                  </h2>
                  <h3 className="text-sm opacity-75">
                    {portfolio.resume.education.universityDate}
                  </h3>
                  <p className="text-sm mt-2 opacity-50">
                    {portfolio.resume.education.universityPara}
                  </p>
                </div>
              </div>
              <div className="mt-5">
                <h1 className="text-2xl font-bold">Skills</h1>
                <div className="grid mob:grid-cols-1 desktop:grid-cols-3 gap-6">
                  {portfolio.resume.languages && (
                    <div className="mt-2 mob:mt-5">
                      <h2 className="text-lg">Languages</h2>
                      <ul className="list-disc min-w-[200px]">
                        {portfolio.resume.languages.map((language, index) => (
                          <li key={index} className="ml-5 py-2">
                            {language}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {portfolio.resume.frameworks && (
                    <div className="mt-2 mob:mt-5">
                      <h2 className="text-lg">Frameworks</h2>
                      <ul className="list-disc min-w-[200px]">
                        {portfolio.resume.frameworks.map((framework, index) => (
                          <li key={index} className="ml-5 py-2">
                            {framework}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {portfolio.resume.others && (
                    <div className="mt-2 mob:mt-5">
                      <h2 className="text-lg">Others</h2>
                      <ul className="list-disc min-w-[200px]">
                        {portfolio.resume.others.map((other, index) => (
                          <li key={index} className="ml-5 py-2">
                            {other}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Resume;
