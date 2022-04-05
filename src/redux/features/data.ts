import { createAsyncThunk, createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootStateOrAny } from 'react-redux'

const apiAddress = `https://pokeapi.co/api/v2/`
const limit = 20

interface Type {
  type: { name: string };
}

interface Pokemon {
  name: string;
  url: string;
  types: Array<Type>;
  sprites: {
    back_default: string;
    back_female: string;
    back_shiny: string;
    back_shiny_female: string;
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_female: string;
  };
  weight: number;
  height: number;
}

export const dataSlice = createSlice({
  name: 'data',
  initialState: {
    names: [] as Pokemon[],
    detailsSource: [] as Pokemon[],
    details: [] as Pokemon[],
    nameFilter: "" as string,
    typeFilter: "" as string,
    loading: false as boolean,
    dark: false as boolean,
  },
  reducers: {
    changeNameFilter: (state, action: PayloadAction<string>) => {
      state.nameFilter = action.payload
    },
    changeTypeFilter: (state, action: PayloadAction<string>) => {
      state.typeFilter = action.payload
    },
    loadNames: (state, action: PayloadAction<Pokemon[]>) => {
      state.names = [...state.names, ...action.payload]
    },
    loadDetails: (state, action: PayloadAction<Pokemon>) => {
      state.detailsSource = [...state.detailsSource, action.payload]
    },
    applyFilter: (state, action: PayloadAction<Pokemon[]>) => {
      state.details = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    changeTheme: (state) => {
      state.dark = !state.dark
    },
  }
})

export const refreshLoading = () => (dispatch: Dispatch<any>, state: RootStateOrAny) => {
  if (state().names.length === state().detailsSource.length) {
    dispatch(setLoading(false))
  } else {
    dispatch(setLoading(true))
  }
}

export const filterDetails = () => (dispatch: Dispatch<any>, state: RootStateOrAny) => {

  const filtered = state().detailsSource.filter((pokemonSource: Pokemon) => {

    const includesName = pokemonSource.name.includes(state().nameFilter)

    const includesType = pokemonSource.types.find((type: RootStateOrAny) => {
      return type.type.name.includes(state().typeFilter)
    }) != undefined

    return includesName && includesType && true
  })
  dispatch(applyFilter(filtered))
}

export const getNamesThunk = createAsyncThunk(
  'pokemons/getNames',
  async () => {
    axios.get(`${apiAddress}pokemon?limit=${limit}&offset=0`, { headers: { "Access-Control-Allow-Origin": "*" } }).then(r => {
      return r.data.results
    })
  }
)

export const fetchDetails = () => (dispatch: Dispatch<any>, state: RootStateOrAny) => {

  state().names.map((pokemonShortcut: Pokemon) => {
    axios.get(`${pokemonShortcut.url}`, { headers: { "Access-Control-Allow-Origin": "*" } }).then(r => {
      if (!state().detailsSource.find((pokemon: Pokemon) => pokemonShortcut.name === pokemon.name)) {
        dispatch(loadDetails(r.data))
        dispatch(filterDetails())
        dispatch(refreshLoading())
      }
    })
  })
}

export const fetchNames = () => (dispatch: Dispatch<any>, state: RootStateOrAny) => {
  dispatch(refreshLoading())
  axios.get(`${apiAddress}pokemon?limit=${limit}&offset=${state().names.length}`, { headers: { "Access-Control-Allow-Origin": "*" } }).then(r => {

    const results = r.data.results.filter((pokemon: Pokemon) => {
      return state().names.find((pokemonByName: Pokemon) => {
        return pokemonByName.name === pokemon.name
      }) == undefined
    })

    dispatch(loadNames(results))
    dispatch(fetchDetails())
    dispatch(refreshLoading())
  })
}

export const { loadNames, loadDetails, changeNameFilter, changeTypeFilter, applyFilter, setLoading, changeTheme } = dataSlice.actions

export default dataSlice.reducer