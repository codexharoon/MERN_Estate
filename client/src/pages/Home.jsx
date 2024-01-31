import React from "react";

const Home = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-5">
        Welcome to <span className="text-red-400">Code x Auth</span>!
      </h1>
      <p className="text-center text-sm font-bold mt-3">
        A{" "}
        <a
          className="underline text-red-400 hover:text-red-500"
          href="https://codexharoon.com"
          target="_blank"
          rel="noreferrer"
        >
          codexharoon
        </a>{" "}
        Project!
      </p>
    </div>
  );
};

export default Home;
