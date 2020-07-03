import React, { Fragment, useEffect, useState } from "react";
import "./Header.scss";
import {
  sortCharacters,
  searchCharacters,
  filterCharacters,
} from "../../store/actions/actions";
import { connect } from "react-redux";
import { getDisplayedFilterValues } from "../../utilities/util";

const Header = (props) => {
  const [displayedWedges, setDisplayedWedges] = useState([]);

  useEffect(() => {
    if (
      props["displayedCharacterList"] &&
      props["displayedCharacterList"]["filters"]
    ) {
      setDisplayedWedges(
        getDisplayedFilterValues(props["displayedCharacterList"]["filters"])
      );
    }
  }, [props]);

  return (
    <Fragment>
      <div className="Header col-12 col-lg-10">
        <div className="row my-2">
          <div className="col-12">
            <h3>
              <b>Selected Filters</b>
            </h3>
            <div className="filteredNames">
              {displayedWedges.map((wedge, index) => {
                return (
                  <span
                    key={"wedge" + index}
                    className="py-1 px-2 mx-2 my-1 selection-wedge"
                    onClick={() => {
                      props.filterCharacters(
                        wedge["filterType"],
                        wedge["filter"]
                      );
                    }}
                  >
                    {wedge["filter"]["name"]}&nbsp;&nbsp;
                    <span className="cross">x</span>
                  </span>
                );
              })}
            </div>
          </div>
        </div>
        <div className="row my-2">
          <div className="col-6 search-section">
            {/* <div className="col-9"> */}
            Search By Name
            <div>
              <input
                type="text"
                name="nameSearch"
                id="nameSearch"
                onInput={(event) => props.searchCharacters(event.target.value)}
              />
            </div>
          </div>
          <div className="col-6 sort-section">
            {/* <div className="col-3"> */}
            <select
              defaultValue="sortByID"
              id="sortOptions"
              onChange={(event) => props.sortCharacters(event.target.value)}
            >
              <option value="sortByID" disabled>
                Sort By ID
              </option>
              <option value="ascending">Ascending</option>
              <option value="descending">Descending</option>
            </select>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const matchpropsToState = (state) => {
  return {
    searchString: state.searchString,
    displayedCharacterList: state.displayedCharacterList,
  };
};

const mapDispathToProps = (dispach) => {
  return {
    sortCharacters: (isAscending) => dispach(sortCharacters(isAscending)),
    searchCharacters: (searchString) => dispach(searchCharacters(searchString)),
    filterCharacters: (filterType, filter) =>
      dispach(filterCharacters(filterType, filter)),
  };
};

export default connect(matchpropsToState, mapDispathToProps)(Header);
