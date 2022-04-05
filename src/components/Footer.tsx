import React, { useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import {
  fetchNames,
  filterDetails,
  refreshLoading,
} from "../redux/features/data";
import Loader from "./Loader";

const Footer = () => {
  const details = useSelector((state: RootStateOrAny) => state.details);
  const detailsSource = useSelector(
    (state: RootStateOrAny) => state.detailsSource
  );
  const loading = useSelector((state: RootStateOrAny) => state.loading);
  const dispatch = useDispatch();

  const fetch = () => {
    dispatch(refreshLoading());
    dispatch(fetchNames());
    dispatch(filterDetails());
    dispatch(refreshLoading());
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="m-2 px-4 py-3 bg-white dark:bg-slate-800 dark:border-sky-800 flex justify-between items-center w-100 rounded-xl shadow-2xl border-2 border-slate-300 sticky bottom-2 ">
      <p>
        Showing {`${details.length}`} Pokemons, loaded{" "}
        {`${detailsSource.length}`}
      </p>
      <p className="font-bold">Click a Pokemon for further details</p>
      <button
        className={`bg-blue-600 px-4 py-2 text-white rounded-lg transition ease-in-out duration-150 hover:bg-blue-500 flex items-center space-x-3 ${
          loading ? "opacity-60" : "opacity-100"
        }`}
        onClick={() => {
          if (!loading) {
            fetch();
          }
        }}
      >
        <p>Load more</p>
        <Loader loading={loading} />
      </button>
    </div>
  );
};

export default Footer;
