import React, { useState, useCallback } from "react";
import ActorGrid from "../components/actor/ActorGrid";
import CustomRadio from "../components/CustomRadio";
import MainPageLayout from "../components/MainPageLayout";
import ShowGrid from "../components/show/ShowGrid";
import { apiGet } from "../misc/config";
import { useLastQuery} from "../misc/custom-hooks";
import {
  RadioInputsWrapper,
  SearchButtonWrapper,
  SearchInput,
} from "./Home.styled";

const renderResults = (results) => {
  if (results && results.length === 0) {
    return <div>No results</div>;
  }
  if (results && results.length > 0) {
    return results[0].show ? (
      <ShowGrid data={results} />
    ) : (
      <ActorGrid data={results} />
    );
  }
  return null;
};

const Home = () => {
  const [input, setInput] = useLastQuery();
  const [results, setResults] = useState(null);
  const [searchOptions, setSearchOptions] = useState("shows");
  const isShowSearch = searchOptions === "shows";
  const onSearch = () => {
    // https://api.tvmaze.com/search/shows?q=men
    apiGet(`/search/${searchOptions}?q=${input}`).then((result) => {
      setResults(result);
    });
  };

  const onInputChange = useCallback(
    (event) => {
      setInput(event.target.value);
    },
    [setInput]
  );
  const onKeyDown = (event) => {
    if (event.keyCode === 13) {
      onSearch();
    }
    // console.log(event.keyCode);
  };

  const onRadioChange = useCallback((event) => {
    setSearchOptions(event.target.value);
  }, []);


  return (
    <MainPageLayout>
      <SearchInput
        type="text"
        placeholder="Search for something"
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        value={input}
      />
      <RadioInputsWrapper>
        <div>
          <CustomRadio
            label="Shows"
            id="shows-search"
            value="shows"
            checked={isShowSearch}
            onChange={onRadioChange}
          />
        </div>
        <div>
          <CustomRadio
            label="Actors"
            id="actors-search"
            value="people"
            checked={!isShowSearch}
            onChange={onRadioChange}
          />
        </div>
      </RadioInputsWrapper>
      <SearchButtonWrapper>
        <button type="button" onClick={onSearch}>
          Search
        </button>
      </SearchButtonWrapper>
      {renderResults(results)}
    </MainPageLayout>
  );
};

export default Home;
