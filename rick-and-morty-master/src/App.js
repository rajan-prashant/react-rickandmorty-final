import React, { Component } from "react";
import "./App.scss";
import Header from "./Components/Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Filters from "./Components/Filters/Filters";
import Container from "./Components/Container/Container";
import { connect } from "react-redux";
import { getCharacters } from "./store/actions/actions";

class App extends Component {
  state = { characterList: {}, displayedCharacter: {}, isExpanded: false };

  componentDidMount() {
    this.props.retrieveCharacters();
  }

  render() {
    return (
      <div className="App">
        <div className="content">
          <div className="row">
            {/* <!-- Left filters menu.  --> */}
            <div className="col-12 col-md-3 col-xl-3">
              <div className="ml-5 col-12">
                <h3>
                  <b>Filters</b>
                  <span
                    hidden={this.state.isExpanded}
                    class="btn btn-expand-collapse mx-1 ml-auto"
                    onClick={() => {
                      this.setState({ isExpanded: true });
                    }}
                  >
                    +
                  </span>
                  <span
                    hidden={!this.state.isExpanded}
                    class="btn btn-expand-collapse mx-1 ml-auto"
                    onClick={() => {
                      this.setState({ isExpanded: false });
                    }}
                  >
                    X
                  </span>
                </h3>
                <div
                  class={
                    this.state.isExpanded
                      ? "filters-expanded"
                      : "filters-collapsed"
                  }
                >
                  <Filters />
                </div>
              </div>
            </div>
            <div className="col-12 col-md-9 col-xl-9">
              <div className="row">
                <Header />
              </div>
              {/* <!-- Right side main pane.  --> */}
              <div className="row">
                <div className="col-12 col-lg-10 right-section">
                  <Container characters={this.state.characterList.characters} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    filteredData: state.displayedCharacterList,
  };
};

const mapDispathToProps = (dispach) => {
  return {
    retrieveCharacters: () => dispach(getCharacters()),
  };
};

export default connect(mapStateToProps, mapDispathToProps)(App);
