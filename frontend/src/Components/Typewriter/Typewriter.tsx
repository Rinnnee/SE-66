import React from "react";
import { Typewriter } from "react-simple-typewriter";

function Typewriters() {
  return (
    <div className="App">
      <h4 style={{ fontWeight: "normal", textAlign: "left" }}>
        MeGood.site{" "}
        <span style={{ color: "red", fontWeight: "bold" }}>
          {/* Style will be inherited from the parent element */}
          <Typewriter
            words={["ผมอยากใด้", "คะเเนน", "เยอะๆ", "👏👏👏👏"]}
            loop={false}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </span>
      </h4>
    </div>
  );
}

export default Typewriters;