import React, { useState } from "react";
import Character from "./Character/Character";
import { useEffect } from "react";
import { connect } from "react-redux";

const Container = (props) => {
  const [characterList, setCharacterList] = useState([]);

  useEffect(() => {
    if (props["filteredCharacterDetails"]) {
      setCharacterList(props["filteredCharacterDetails"]);
    }
    return () => {};
  }, [props]);

  return (
    <div className="CharacterContainer row">
      {characterList["characters"] && characterList["characters"].length ? (
        characterList["characters"].map((characterDetails, index) => {
          return <Character key={index} characterDetails={characterDetails} />;
        })
      ) : (
        <div>No characters match your criteria!!</div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    filteredCharacterDetails: state.displayedCharacterList,
  };
};

export default connect(mapStateToProps)(Container);
