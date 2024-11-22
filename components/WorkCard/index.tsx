import React from "react";
import Image from "next/image";

interface WorkCardProps {
  img: string;
  name: string;
  description: string;
  onClick: () => void;
}

const WorkCard: React.FC<WorkCardProps> = ({
  img,
  name,
  description,
  onClick,
}) => {
  return (
    <div
      className="overflow-hidden rounded-lg p-2 first:ml-0 link cursor-pointer"
      onClick={onClick}
    >
      <div
        className="relative rounded-lg overflow-hidden transition-all ease-out duration-300 w-full"
        style={{ paddingBottom: "61.8%" }} // 1/1.618 ≈ 0.618 or 61.8%
      >
        <Image
          alt={name}
          src={img}
          fill
          className="object-cover hover:scale-110 transition-all ease-out duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <h1 className="mt-5 text-3xl font-medium">
        {name ? name : "Project Name"}
      </h1>
      <h2 className="text-xl opacity-50">
        {description ? description : "Description"}
      </h2>
    </div>
  );
};

export default WorkCard;
