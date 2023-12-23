"use client";

import Snowfall from "react-snowfall";

export default function SnowfallClient() {
  return (
    <Snowfall
      snowflakeCount={50}
      style={{
        position: "fixed",
        top: "3rem",
        width: "100vw",
        height: "100vh",
        zIndex: "999999999999",
      }}
    />
  );
}
