import appStore from "..";

function getFilterParams(results) {
  let Species = {},
    Genders = {},
    Origins = {};
  results.forEach((element) => {
    Species[element.species] = 1;
    Genders[element.gender] = 1;
    Origins[element.origin.name] = 1;
  });
  return {
    Species: Object.keys(Species).map((species) => {
      return { type: "species", name: species, selected: true };
    }),
    Genders: Object.keys(Genders).map((gender) => {
      return { type: "gender", name: gender, selected: true };
    }),
    Origins: Object.keys(Origins).map((origin) => {
      return { type: "origin", name: origin, selected: true };
    }),
  };
}

function doFilter(displayedCharacterList) {
  let storeCopy = appStore.getState();
  let selectedSpecies = displayedCharacterList["filters"]["Species"]
    .filter((element) => {
      return element.selected;
    })
    .map((element) => element["name"]);
  let selectedGenders = displayedCharacterList["filters"]["Genders"]
    .filter((element) => {
      return element.selected;
    })
    .map((element) => element["name"]);
  let selectedOrigins = displayedCharacterList["filters"]["Origins"]
    .filter((element) => {
      return element.selected;
    })
    .map((element) => element["name"]);

  if (selectedSpecies && selectedGenders && selectedOrigins) {
    displayedCharacterList.characters = storeCopy.pristineData.characters.filter(
      (character) => {
        if (
          selectedSpecies.includes(character["species"]) &&
          selectedGenders.includes(character["gender"]) &&
          selectedOrigins.includes(character["origin"]["name"])
        ) {
          return true;
        }
      }
    );
  } else {
    displayedCharacterList.characters = storeCopy.pristineData.characters;
  }
  return displayedCharacterList;
}

function getDisplayedFilterValues(filters) {
  let filterList = [];
  filterList.push(
    ...filters["Species"].map((filter) => {
      return { filterType: "Species", filter: filter };
    })
  );
  filterList.push(
    ...filters["Genders"].map((filter) => {
      return { filterType: "Genders", filter: filter };
    })
  );
  filterList.push(
    ...filters["Origins"].map((filter) => {
      return { filterType: "Origins", filter: filter };
    })
  );

  filterList = filterList.filter((filter) => {
    if (filter["filter"]["selected"] === true) {
      return true;
    }
    return false;
  });
  return filterList;
}

export { getFilterParams, doFilter, getDisplayedFilterValues };
