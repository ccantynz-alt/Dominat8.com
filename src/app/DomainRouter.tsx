"use client";

import React from "react";
import Dominat8Interface from "@/projects/Dominat8/Interface";
import BookeRideDashboard from "@/projects/BookeRide/Dashboard";

const DomainRouter = () => {
  const [hostname, setHostname] = React.useState<string | null>(null);

  React.useEffect(() => {
    setHostname(window.location.hostname);
  }, []);

  if (hostname === null) {
    return <Dominat8Interface />;
  }

  if (hostname.includes("dominat8.com")) {
    return <Dominat8Interface />;
  }

  if (hostname.includes("bookeride.co.nz")) {
    return <BookeRideDashboard />;
  }

  return (
    <div
      style={{
        backgroundColor: "#020202",
        color: "#fff",
        padding: "20px",
        minHeight: "100vh",
      }}
    >
      <h1>Aura System: Ready</h1>
      <p>Current Host: {hostname}</p>
    </div>
  );
};

export default DomainRouter;
