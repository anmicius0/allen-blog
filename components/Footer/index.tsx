import React from "react";
import Socials from "../Socials";

const Footer: React.FC = () => {
  return (
    <>
      <div className="mt-5 laptop:mt-40 p-2 laptop:p-0">
        <div>
          <h1 className="text-2xl font-bold">Contact.</h1>
          <div className="mt-10">
            <h1 className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl font-bold">
              LET&apos;S WORK
            </h1>
            <h1 className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl font-bold">
              TOGETHER
            </h1>
            <div className="mt-10">
              <Socials className="" />
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-sm font-bold mt-2 laptop:mt-10 p-2 laptop:p-0">
        Made With ❤ by Allen Lin
      </h1>
    </>
  );
};

export default Footer;
