import React, { useCallback, useEffect, useRef } from "react";
import p5 from "p5";
import FlowSetup from "../../../graphics/flow";
import ParticleSetup from "../../../graphics/particles";

interface SketchProps {
  variant: "flow" | "particles";
  customClass?: string;
}

interface DynMapping {
  [key: string]: any;
}
const MappingGraphics: DynMapping = {
  flow: FlowSetup,
  particles: ParticleSetup,
};

const Sketch = ({ customClass, variant }: SketchProps) => {
  const parent = useRef<HTMLDivElement>(null);
  // const [, useSketch] = useState<any>();

  const initSketch = useCallback(() => {
    console.log("What the fuck?");
    const isWindows = typeof window === "undefined";
    if (isWindows) return null;

    if (parent.current?.innerHTML) {
      parent.current.innerHTML = "";
    }
    const newSketch = new p5((pSketch: any) => {
      if (!parent.current || isWindows) return;

      pSketch.setup = () => {
        MappingGraphics[variant] &&
          MappingGraphics[variant].setup(pSketch, parent);
        // setup(pSketch, parent);
      };
      pSketch.draw = () => {
        MappingGraphics[variant] && MappingGraphics[variant].draw(pSketch);
        // draw(pSketch);
      };
    });
    // useSketch(newSketch);
    return () => newSketch.remove();
  }, [parent, variant]);

  useEffect(() => {
    initSketch();
  }, [initSketch]);

  return <div ref={parent} className={customClass || ""} />;
};

Sketch.defaultProps = {
  customClass: "",
};

export default Sketch;
