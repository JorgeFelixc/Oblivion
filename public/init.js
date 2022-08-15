console.log("On init");

const DomHoverElements = document.getElementsByClassName("hover-sound");
for (let i = 0; i < DomHoverElements.length; i++) {
  DomHoverElements[i].addEventListener("mouseenter", () => {
    const audio = new Audio("/hover.wav");
    audio.play();
  });
}
