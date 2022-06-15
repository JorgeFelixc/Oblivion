import { ActionIcon, Badge, Button, Image } from "@mantine/core";
import dynamic from "next/dynamic";
import React, { useEffect, useRef } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { FiGithub } from "react-icons/fi";
import { TiSocialLinkedin } from "react-icons/ti";
import { useParallax } from "react-scroll-parallax";

interface Props {
  tech: string[];
  name: string;
  image: string;
}

const links: any = {
  github: "https://github.com/JorgeFelixc",
  linkedin: "https://www.linkedin.com/in/jorge-felix-cazarez-69a783170/",
};

export const CardMe = ({ image, name, tech }: Props) => {
  const handleMailto = () => {
    window.location.href = "mailto:jorgefelix97@gmail.com";
  };

  const handleNavigateExternalUrl = (event: any) => {
    const name = event.target.name ? links[event.target.name] : null;
    name && window.open(name);
  };
  return (
    <div className="wrapper-card">
      <Image src={image} alt="jorge felix" width="100%" height={255} />
      <div className="card-content p-6">
        <h2 className="flex text-lg">
          {name}
          <span className="font-light text-xs mx-2 ml-auto">
            Sinaloa, Mexico.
          </span>
        </h2>
        <h3 className="font-light text-base">
          I&apos;m 24 years old{" "}
          {/* <span className="font-light text-xs mx-2">
            no matter when you read this
          </span> */}
        </h3>

        <p className="my-4 text-sm text-justify">
          Focused on Software Development since 2019 profesionally, more time as
          developer for fun. and dedicated to learn about web development
          experience and technologies, likes this page made 100% by me with the
          next stack:
        </p>
        <div className="grid-auto mb-9">
          {tech.map((item: string) => (
            <Badge variant="outline" key={item} className="m-2">
              {item}
            </Badge>
          ))}
        </div>
        <div className="row mt-auto">
          <div>
            <h4>Social Medias</h4>
            <div className="flex  space-x-3">
              <ActionIcon
                variant="outline"
                onClick={handleNavigateExternalUrl}
                name="linkedin"
              >
                <TiSocialLinkedin />
              </ActionIcon>
              <ActionIcon
                variant="outline"
                name="github"
                onClick={handleNavigateExternalUrl}
              >
                <FiGithub />
              </ActionIcon>
            </div>
          </div>
          <Button
            onClick={handleMailto}
            className="ml-auto"
            rightIcon={<AiOutlineMail />}
            variant="filled"
          >
            Send me a Email
          </Button>
        </div>
      </div>
    </div>
  );
};
