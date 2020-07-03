import { getFilterParams } from "../../utilities/util";
import Axios from "axios";
import appStore from "../..";
import { doFilter } from "../../utilities/util";

export const SEARCH = "SEARCH";
export const SORT = "SORT";
export const FILTER = "FILTER";
export const GETCHARACTERS = "GET_CHARACTERS";

export const searchCharacters = (searchString) => {
  let storeCopy = appStore.getState();
  let displayedCharacterList = JSON.parse(
    JSON.stringify(storeCopy["displayedCharacterList"])
  );
  displayedCharacterList = doFilter(displayedCharacterList);

  if (displayedCharacterList.characters && searchString) {
    displayedCharacterList.characters = displayedCharacterList.characters.filter(
      (character) => {
        return character["name"].includes(searchString);
      }
    );
  }
  return {
    type: SEARCH,
    data: { displayedCharacterList, searchString },
  };
};

export const sortCharacters = (isAscending) => {
  let storeCopy = appStore.getState();
  let displayedCharacterList = JSON.parse(
    JSON.stringify(storeCopy["displayedCharacterList"])
  );
  displayedCharacterList.characters = displayedCharacterList.characters.sort(
    (el1, el2) => {
      if (isAscending === "ascending") {
        return el1["id"] - el2["id"];
      } else if (isAscending === "descending") {
        return el2["id"] - el1["id"];
      }
      return 0;
    }
  );
  return {
    type: SORT,
    data: { displayedCharacterList },
  };
};

export const filterCharacters = (filterType, filter) => {
  //Deep copy
  let storeCopy = appStore.getState();
  let displayedCharacterList = JSON.parse(
    JSON.stringify(storeCopy["displayedCharacterList"])
  );
  let filters = displayedCharacterList["filters"];

  // Toggle that filter
  filters[filterType].forEach((element, index) => {
    if (element["name"] === filter["name"]) {
      filter["selected"] = !filter["selected"];
      filters[filterType][index]["selected"] = filter["selected"];
    }
  });

  displayedCharacterList = doFilter(displayedCharacterList);
  if (displayedCharacterList.characters && storeCopy.searchString) {
    displayedCharacterList.characters = displayedCharacterList.characters.filter(
      (character) => {
        return character["name"].includes(storeCopy.searchString);
      }
    );
  }
  return {
    type: FILTER,
    data: { displayedCharacterList },
  };
};

/**
 * Used for API call.
 * @param {*} charactersData
 */
export const processData = (charactersData) => {
  return {
    type: GETCHARACTERS,
    data: charactersData,
  };
};

/**
 * Async action creator
 */
export const getCharacters = () => {
  return (dispach, getState) => {
    Axios.get("https://rickandmortyapi.com/api/character/").then((response) => {
      let filters = {
        ...getFilterParams(response.data.results),
      };
      dispach(
        processData({
          pristineData: {
            characters: response.data.results,
          },
          displayedCharacterList: {
            characters: response.data.results,
            filters: filters,
          },
        })
      );
    });
  };
};
