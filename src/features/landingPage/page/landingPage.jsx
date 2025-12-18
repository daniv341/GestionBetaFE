import React from "react";
import LoginPanel from "../../auth/components/panelLogin";

const LandingPage = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#f4f6f9" }}
    >
      <div className="text-center">
        <h1 className="fw-bold mb-4">Gestión Beta</h1>

        <LoginPanel />
      </div>
    </div>
  );
};

export default LandingPage;
