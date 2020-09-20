import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import {
  optionsPieces,
  optionsOperas,
  optionsComposers,
  composerPost,
  operaPost,
  piecePost,
  search,
} from './SearchResultsHelper';
import { StyledResults } from '../css/styComp';

// I have to make three seperate searches. One for each category, composer, opera and piece. Here I define what the options for the searches should be. It doesn't need to be sorted, because I will have to combine the three lists myself into one big, and compare the search scores of the big array to discover which order of matching.

export default function SearchResults({ searchValue }) {
  const [pieces, setPieces] = useState(null);
  const [operas, setOperas] = useState(null);
  const [composers, setComposers] = useState(null);
  const [results, setResults] = useState(null);
  useEffect(() => {
    axios.get('/api/search').then(({ data }) => setPieces(data));
    axios.get('/api/operas').then(({ data }) => setOperas(data));
    axios.get('/api/composers').then(({ data }) => setComposers(data));
  }, []);

  useEffect(() => {
    if (searchValue.length > 1) {
      //Don't search if search if only one char. It is pointless, the results dont make sense.
      const allArray = [];
      if (pieces)
        allArray.push(search(pieces, 'piece', optionsPieces, searchValue));
      if (operas)
        allArray.push(search(operas, 'opera', optionsOperas, searchValue));
      if (composers)
        allArray.push(
          search(composers, 'composer', optionsComposers, searchValue)
        );
      setResults(sortArrays(allArray[0], allArray[1], allArray[2]));
    } else {
      setResults(null);
    }
  }, [searchValue, pieces, operas, composers]);

  function sortArrays(arr1, arr2, arr3) {
    // Sort the array so the objects with the best search scores are first.
    let result = [...(arr1 || []), ...(arr2 || []), ...(arr3 || [])];
    return result.sort((a, b) => a.score - b.score);
  }
  function TopResult() {
    let topResult = results[0];
    if (topResult === undefined) return <></>;
    const className = 'topResult';
    switch (topResult.resultType) {
      case 'composer': {
        return composerPost(topResult, className);
      }
      case 'opera': {
        return operaPost(topResult, className);
      }
      case 'piece': {
        return piecePost(topResult, className);
      }
      default:
        return <></>;
    }
  }
  function OtherResults() {
    if (results[1] === undefined) return <></>;
    const otherResults = [];
    const className = 'otherResult';
    for (let i = 1; i < 25; i++) {
      // Shows a maximum of 25 search results. Probably overkill to be honest. Undefined means that I have not found that many results, and should show all the results found, and not more.
      if (results[i] === undefined) break;
      otherResults.push(results[i]);
    }
    return otherResults.map((result, index) => {
      let container;
      switch (result.resultType) {
        case 'composer': {
          return composerPost(result, className, index);
        }
        case 'opera': {
          return operaPost(result, className, index);
        }
        case 'piece': {
          return piecePost(result, className, index);
        }
        default:
          container = <></>;
      }
      return container;
    });
  }

  return (
    <StyledResults>
        <Row className="topRow">{results ? <TopResult /> : null}</Row>
        <Row xs={1} sm={2} md={3} className="align-items-center bottomRow">
          {results ? <OtherResults /> : null}
        </Row>
    </StyledResults>
  );
}
