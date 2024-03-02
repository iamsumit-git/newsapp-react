import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 5,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string.isRequired,
    pageSize: PropTypes.number.isRequired,
  };

  capitalizeFirstLetter = (string) => {
    return (
      this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)
    );
  };

  constructor(props) {
    super(props);
    console.log("Hello, I am a constructor");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)}`;
  }
  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=79cc98956a9d41b793e5f01d0e4b5db8&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    const data = await fetch(url);
    const parseData = await data.json();
    console.log(parseData);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
    });
  }

  async componentDidMount() {
    console.log("componentDidMount runnning");
    this.updateNews();
  }

  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  fetchMoreData = async ()=> {
   this.setState({ page: this.state.page + 1 });
   const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=79cc98956a9d41b793e5f01d0e4b5db8&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    const data = await fetch(url);
    const parseData = await data.json();
    console.log(parseData);
    this.setState({
      articles:this.state.articles.concat(parseData.articles) ,
      totalResults: parseData.totalResults,
      loading: false,
    });

  }

  render() {
    return (
      <>
        <h1 className="text-center" style={{ margin: "35px, 0px" }}>
          Newsdonkey- Top {this.capitalizeFirstLetter(this.props.category)}{" "}
          headlines !!!
        </h1>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}         
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((ele, index) => {
                return (
                  <div className="col-md-4 my-2" key={`${ele.url}-${index}`}>
                    <NewsItem
                      title={ele.title ? ele.title.slice(0, 40) : " "}
                      description={ele.description}
                      imageUrl={ele.urlToImage}
                      url={ele.url}
                      author={ele.author}
                      date={ele.publishedAt}
                      source={ele.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
