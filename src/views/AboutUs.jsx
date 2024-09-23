import React from "react";
import { OurMission } from "../components/about-us/OurMission";
import { OurValues } from "../components/about-us/OurValues";
import { OurTeam } from "../components/about-us/OurTeam";
export function AboutUs() {
  return (
    <div className="aboutus-container">
      <OurMission />
      <OurValues />
      <OurTeam />

    </div>
  );
}
