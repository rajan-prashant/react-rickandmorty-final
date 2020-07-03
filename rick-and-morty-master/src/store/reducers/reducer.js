import * as actions from "../actions/actions";

const initialState = {
  searchString: "",
  pristineData: {
    characters: [],
  },
  displayedCharacterList: {
    filteredCharacters: [],
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SEARCH: {
      return { ...state, ...action.data };
    }
    case actions.SORT: {
      return { ...state, ...action.data };
    }
    case actions.FILTER: {
      return { ...state, ...action.data };
    }
    case actions.GETCHARACTERS: {
      return action.data;
    }

    default:
      return state;
  }
};

export default reducer;
