import React, { useState } from "react";
import {
  changeNameFilter,
  changeTypeFilter,
  applyFilter,
  filterDetails,
  changeTheme,
} from "../redux/features/data";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();

  const [nameFilter, setNameFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const handleNameFilter = (value: string) => {
    setNameFilter(value);
    dispatch(changeNameFilter(value));
    dispatch(filterDetails());
  };

  const handleTypeFilter = (value: string) => {
    setTypeFilter(value);
    dispatch(changeTypeFilter(value));
    dispatch(filterDetails());
  };

  const resetFilters = () => {
    handleNameFilter("");
    handleTypeFilter("");
  };

  return (
    <div className="m-2 px-4 py-3 bg-white dark:bg-slate-800 flex justify-between items-center w-100 rounded-xl shadow-2xl border-2 border-slate-300 dark:border-sky-800 sticky top-2">
      <div>
        <h1 className="text-2xl text-bold">Pokedex App</h1>
        <button
          className="underline hover:text-blue-400 transition ease-in-out duration-150"
          onClick={(e) => {
            e.preventDefault();
            dispatch(changeTheme());
          }}
        >
          Switch theme
        </button>
      </div>

      <form action="" className="flex flex-col space-x-1">
        <p className="px-1 font-bold">Filters:</p>
        <div className="flex items-end space-x-1">
          <label htmlFor="" className="flex flex-col">
            <p className="text-sm italic">name</p>
            <input
              type="text"
              className="bg-neutral-50 dark:bg-slate-700 border border-neutral-400 dark:border-slate-500 rounded-lg px-1"
              onChange={(e) => {
                handleNameFilter(e.target.value);
              }}
              value={nameFilter}
              autoFocus
            />
          </label>
          <label htmlFor="" className="flex flex-col">
            <p className="text-sm italic">type</p>
            <input
              type="text"
              className="bg-neutral-50 dark:bg-slate-700 border border-neutral-400 dark:border-slate-500 rounded-lg px-1"
              onChange={(e) => {
                handleTypeFilter(e.target.value);
              }}
              value={typeFilter}
            />
          </label>
          <button
            className="underline italic hover:text-blue-400 transition ease-in-out duration-150"
            onClick={(e) => {
              e.preventDefault();
              resetFilters();
            }}
          >
            Reset filters
          </button>
        </div>
      </form>
    </div>
  );
};

export default Header;
