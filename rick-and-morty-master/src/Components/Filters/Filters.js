import React, { useState, Fragment, useEffect } from "react";
import Filter from "./Filter/Filter";
import { connect } from "react-redux";

const Filters = (props) => {
  const [filterList, setFilterList] = useState({});

  useEffect(() => {
    if (props["filteredCharacterDetails"]) {
      setFilterList(props["filteredCharacterDetails"]);
    }
    return () => {};
  }, [props]);

  return (
    <Fragment>
      {filterList["filters"] ? (
        Object.keys(filterList["filters"]).map((filterType, index) => {
          return (
            <Filter
              key={"filter" + index}
              name={filterType}
              filterValues={filterList["filters"][filterType]}
            />
          );
        })
      ) : (
        <div></div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    filteredCharacterDetails: state.displayedCharacterList,
  };
};

export default connect(mapStateToProps)(Filters);
