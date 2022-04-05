import React, { useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";

interface Type {
  type: { name: string };
}

interface Pokemon {
  name: string;
  url: string;
  types: Array<Type>;
  sprites: {
    [key: string]: string;
  };
  weight: number;
  height: number;
}

const sprites = [
  "front_default",
  "front_female",
  "front_shiny",
  "front_shiny_female",
  "back_default",
  "back_female",
  "back_shiny",
  "back_shiny_female",
];

const ListElement = ({ pokemon, i }: { pokemon: Pokemon; i: number }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div
      className="flex p-1 px-3 flex-col w-full hover:bg-blue-200 dark:hover:bg-blue-900 dark:border-slate-500 border-b-2 cursor-pointer transition ease-in-out duration-230"
      onClick={() => {
        handleShowDetails();
      }}
    >
      <div className="flex space-x-1.5 ">
        <p className="font-bold">{i + 1}.</p>
        <p>
          name: <span className="font-bold">{pokemon.name}</span>
        </p>
        <p>
          types:{" "}
          <span className="font-bold">
            {/* {JSON.stringify(pokemon.types)} */}
            {pokemon.types.map((type: Type) => {
              return `${type.type.name}, `;
            })}
          </span>
        </p>
        {showDetails ? (
          <p>
            weight: <span className="font-bold">{pokemon.weight}</span>
          </p>
        ) : (
          ""
        )}
        {showDetails ? (
          <p>
            height: <span className="font-bold">{pokemon.height}</span>
          </p>
        ) : (
          ""
        )}
      </div>

      <div className="flex flex-wrap">
        {sprites.map((spriteName: string) => {
          return pokemon.sprites[spriteName] ? (
            <img
              src={pokemon.sprites[spriteName]}
              key={pokemon.sprites[spriteName]}
            />
          ) : (
            ""
          );
        })}
      </div>
    </div>
  );
};

const List = () => {
  const names = useSelector((state: RootStateOrAny) => state.names);
  const details = useSelector((state: RootStateOrAny) => state.details);
  const dispatch = useDispatch();

  return (
    <div className="m-4 bg-neutral-100 dark:bg-slate-700 flex justify-between items-center rounded-xl shadow-lg border border-grey dark:border-slate-500 flex flex-col  overflow-hidden">
      {details.map((pokemon: Pokemon, i: number) => {
        return <ListElement key={pokemon.name} pokemon={pokemon} i={i} />;
      })}

      {details.length === 0 ? <p className="p-1">No results.</p> : ""}
    </div>
  );
};

export default List;
