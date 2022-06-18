import React from "react";
import AddAd from "../addAd/AddAd";

function NewAdd({ handleAddAd, isLoading }) {
  return (
    <main className="main">
      <AddAd handleAddAd={handleAddAd} isLoading={isLoading} />
    </main>
  );
}

export default NewAdd;
