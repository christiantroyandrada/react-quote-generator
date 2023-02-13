import "./styles.css";
import React from "react";

// define the component itself
class QuoteGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quoteText: "",
      quoteAuthor: ""
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.props.fetchQuote();
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.quoteText !== nextProps.quoteText) {
      return true;
    }
    return false;
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.quoteText !== nextProps.quoteText) {
      return {
        quoteText: nextProps.quoteText,
        quoteAuthor: `${nextProps.quoteAuthor}${Math.floor(
          Math.random() * (1000 - 1 + 1) + 1
        )}`
      };
    }
    return null;
  }

  handleClick() {
    this.props.fetchQuote();
    console.log("test"); // logs the component instance
  }

  render() {
    // Tells React what HTML code to render
    return (
      <div className="card" id="quote-box">
        <h1 className="card-title">Random Quotes</h1>
        <div className="card-text">
          <p className="quote-message" id="text">
            <strong className="quote-mark">"</strong>
            {this.state.quoteText}
            <strong className="quote-mark">"</strong>
          </p>
        </div>
        <div className="card-footer">
          <h3 className="quote-author" id="author">
            -{this.state.quoteAuthor}
          </h3>
        </div>
        <div className="quote-button">
          <button id="new-quote" onClick={this.handleClick}>
            New Quote
          </button>
        </div>
        <div className="tweet-button">
          <a
            id="tweet-quote"
            href={`http://twitter.com/intent/tweet?text=${this.state.quoteText}&hashtags=RandomQuoteGen,ReactLearn`}
            target="_blank"
          >
            <button>Tweet It</button>
          </a>
        </div>
      </div>
    );
  }
}
export default QuoteGenerator;
