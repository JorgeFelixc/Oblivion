import anime from "animejs";

export const ActiveIndexAnimation = () => {
  const tl = anime.timeline({
    duration: 1000,
    easing: "easeOutExpo",
  });

  tl.add({
    targets: ".clear-initial",
    opacity: 1,
    translateY: {
      value: [-100, 0],
      duration: 800,
    },
  });

  tl.add(
    {
      targets: ".wrapper-presentation",
      height: 50,
      width: 50,
      left: "50%",
      top: "50%",
      // opacity: 0,
      color: "#FFF",
      backgroundColor: "#FFF",
      borderRadius: 360,
      duration: 1000,
    },
    "+=800"
  );

  tl.add({
    targets: ".wrapper-presentation",
    translateY: -2000,
    opacity: 0,
    easing: "easeOutElastic(1, .8)",
    loop: true,
  });
};
