import React from "react";
import Header from "./components/Header";
import "tailwindcss/tailwind.css";
import "./styles/globals.scss";
import Footer from "./components/Footer";
import List from "./components/List";
import { RootStateOrAny, useSelector } from "react-redux";

function App() {
  const dark = useSelector((state: RootStateOrAny) => state.dark);

  return (
    <div className={`${dark ? "dark" : ""}`}>
      <div
        className={`flex justify-center dark:bg-slate-900 dark:text-slate-200 min-h-screen`}
      >
        <div className="md:w-4/5 lg:w-3/5 2xl:w-2/5 relative ">
          <Header />
          <List />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
