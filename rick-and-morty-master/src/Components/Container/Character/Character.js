import React, { Fragment, useState } from "react";
import "./Character.scss";

const Character = (props) => {
  let characterDetails = props["characterDetails"];

  return (
    <div className="Character col-lg-3 col-xl-3 col-6">
      <div className="image-wrapper mb-5">
        <img className="character-image" src={characterDetails.image} />
        <div className="character-introduction px-2">
          <h4>{characterDetails.name}</h4>
          <div>
            id: {characterDetails.id} created &nbsp;
            {new Date().getFullYear() -
              new Date(characterDetails.created).getFullYear()}
            &nbsp;years ago
          </div>
        </div>
      </div>
      <div className="character-description px-1">
        <div className="row">
          <div className="col-4 text-center">STATUS</div>
          <div className="col-8 detail">{characterDetails.status}</div>
        </div>
        <hr />
        <div className="row">
          <div className="col-4 text-center">SPECIES</div>
          <div className="col-8 detail">{characterDetails.species}</div>
        </div>
        <hr />
        <div className="row">
          <div className="col-4 text-center">GENDER</div>
          <div className="col-8 detail">{characterDetails.gender}</div>
        </div>
        <hr />
        <div className="row">
          <div className="col-4 text-center">ORIGIN</div>
          <div className="col-8 detail">{characterDetails.origin.name}</div>
        </div>
        <hr />
        <div className="row">
          <div className="col-4 text-center">LAST LOCATION</div>
          <div className="col-8 detail">{characterDetails.location.name}</div>
        </div>
      </div>
    </div>
  );
};

export default Character;
