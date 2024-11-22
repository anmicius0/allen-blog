import React from "react";
import Button from "../Button";

import yourData from "../../data/portfolio.json";

interface Social {
  title: string;
  link: string;
}

interface SocialsProps {
  className?: string;
}

const Socials: React.FC<SocialsProps> = ({ className }) => {
  return (
    <div className={`${className} flex flex-wrap mob:flex-nowrap link`}>
      {yourData.socials.map((social: Social, index: number) => (
        <Button
          key={index}
          type="secondary"
          onClick={() => window.open(social.link)}
        >
          {social.title}
        </Button>
      ))}
    </div>
  );
};

export default Socials;
