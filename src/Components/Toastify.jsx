import React from "react";
import { ToastContainer } from "react-toastify";

const Toastify = () => {
  return (
    <section>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        progress={undefined}
        theme="colored"
      />
    </section>
  );
};

export default Toastify;
