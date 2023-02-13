import reduxThunk from "redux-thunk";
import axios from "axios";
import { applyMiddleware, createStore } from "redux";
import { connect } from "react-redux";
import QuoteGenerator from "./QuoteGenerator";

const initialState = {};

// create the store
export const store = createStore(
  quoteReducer,
  initialState,
  applyMiddleware(reduxThunk)
);

// define a reducer
function quoteReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_DATA_REQUEST":
      return { ...state, isLoading: true };
    case "FETCH_DATA_SUCCESS":
      console.log(action.data);
      return {
        ...state,
        quoteText: action.data.message,
        quoteAuthor: "DTrump",
        isLoading: false
      };
    case "FETCH_DATA_FAILURE":
      return { ...state, error: action.error, isLoading: false };
    default:
      return state;
  }
}

// action creators go here
const fetchDataRequest = () => ({ type: "FETCH_DATA_REQUEST" });
const fetchDataSuccess = (data) => ({ type: "FETCH_DATA_SUCCESS", data });
const fetchDataFailure = (error) => ({ type: "FETCH_DATA_FAILURE", error });

function fetchQuote() {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      const response = await axios.get(
        "https://api.whatdoestrumpthink.com/api/v1/quotes/random"
      );
      dispatch(fetchDataSuccess(response.data));
    } catch (error) {
      dispatch(fetchDataFailure(error));
    }
  };
}

// map state and actions to props
const mapStateToProps = (state) => ({
  quoteText: state.quoteText,
  quoteAuthor: state.quoteAuthor,
  isLoading: state.isLoading,
  error: state.error
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuote: () => dispatch(fetchQuote())
});

// connect the component to the store
export const ConnectedQuoteComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuoteGenerator);
