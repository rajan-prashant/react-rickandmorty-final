import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { filterCharacters } from "./../../../store/actions/actions";

const Filter = (props) => {
  const [filterList, setFilterList] = useState([]);

  useEffect(() => {
    setFilterList(props["filterValues"]);
    return () => {};
  }, [props]);

  return (
    <Fragment>
      <div className="my-5 p-2">
        <strong>{props.name}</strong>
        <div className="mt-2">
          {filterList.map((filter) => {
            return (
              <div key={filter.name}>
                <input
                  type="checkbox"
                  id={props.name + filter.name}
                  value={filter.name}
                  checked={filter.selected}
                  onChange={() => {
                    props.filterCharacters(props.name, filter);
                  }}
                />
                &nbsp;&nbsp;
                <label htmlFor={props.name + filter.name}>{filter.name}</label>
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};

const mapDispathToProps = (dispach) => {
  return {
    filterCharacters: (filterType, filter) =>
      dispach(filterCharacters(filterType, filter)),
  };
};

export default connect(null, mapDispathToProps)(Filter);
