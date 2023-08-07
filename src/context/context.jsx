import React, { useReducer, useEffect } from "react";

const AppContext = React.createContext();
const apiUrl = "http://hn.algolia.com/api/v1/search?";

const initialState = {
  isLoading: true,
  query: "",
  nbPages: 0,
  page: 0,
  hits: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        isLoading: true,
      };

    case "GET_ARTICLES":
      return {
        ...state,
        isLoading: false,
        hits: action.payload.hits,
        nbPages: action.payload.nbPages,
      };

    case "SEARCH_QUERY":
      return {
        ...state,
        page: 0,
        query: action.payload,
      };

    case "GO_TO_NEXT":
      let pageNumMax = state.page + 1;

      if (pageNumMax >= state.nbPages) {
        pageNumMax = 0;
      }

      return {
        ...state,
        page: pageNumMax,
      };

    case "GO_TO_PREV":
      let pageNum = state.page - 1;

      if (pageNum <= 0) {
        pageNum = 0;
      }

      return {
        ...state,
        page: pageNum,
      };

    case "DELETE_ARTICLE":
      return {
        ...state,
        hits: state.hits.filter(
          (article) => article.objectID !== action.payload
        ),
      };
  }
  return state;
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function getNews(apiUrl) {
    dispatch({ type: "LOADING" });

    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data.hits);
    dispatch({
      type: "GET_ARTICLES",
      payload: {
        hits: data.hits,
        nbPages: data.nbPages,
      },
    });
  }

  const handleSearch = (searchQuery) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: searchQuery,
    });
  };

  const handlePrev = () => {
    dispatch({
      type: "GO_TO_PREV",
    });
  };

  const handleNext = () => {
    dispatch({
      type: "GO_TO_NEXT",
    });
  };

  const deleteArticle = (objectID) => {
    dispatch({
      type: "DELETE_ARTICLE",
      payload: objectID,
    });
  };

  useEffect(() => {
    getNews(`${apiUrl}query=${state.query}&page=${state.page}`);
  }, [state.query, state.page]);

  return (
    <AppContext.Provider
      value={{ ...state, handleSearch, handleNext, handlePrev, deleteArticle }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
