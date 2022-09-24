import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { Url } from "url";

const Algorithms = () => {
  return (
    <div className="p-8">
      <h1 className="mt-12">Algorithms</h1>
      <div className="grid-3x">
        <WorkCard
          imgSrc="/uni.jpg"
          title="Dijkstra Algorithm"
          link="/dijkstra"
        />
        <WorkCard imgSrc="/uni.jpg" title="Matriz Deciciones" link="matriz" />
      </div>

      <h1 className="mt-12">CSS</h1>
      <div className="grid-3x">
        <WorkCard imgSrc="/uni.jpg" title="Buttons" />
        <WorkCard imgSrc="/uni.jpg" title="Dijkstra Algorithm" />
        <WorkCard imgSrc="/uni.jpg" title="Dijkstra Algorithm" />
      </div>
    </div>
  );
};

interface WorkCardProps {
  imgSrc: string;
  title: string;
  description?: string;
  link?: string;
}
const WorkCard = ({ imgSrc, title, link }: WorkCardProps) => {
  const { push } = useRouter();

  const handleNavigate = () => link && push(link);
  return (
    <div className="wrapper-practice hover-sound" onClick={handleNavigate}>
      <Image src={imgSrc} alt="image text" width={355} height={200} />
      <div className="absolute top-0 left-0 p-3 wrapper-overlay">
        <h2>{title}</h2>
      </div>
    </div>
  );
};
export default Algorithms;
