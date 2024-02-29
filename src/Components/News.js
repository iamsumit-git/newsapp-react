import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

export class News extends Component {
  // we can set prop default values
  static defaultProps={
   country:'in',
   pageSize: 5,
   category: 'general',

  }

  static propTypes = {
    country: PropTypes.string.isRequired,
    pageSize: PropTypes.number.isRequired
  }

//    articles = [
//  {
//       "source": { "id": "espn-cric-info", "name": "ESPN Cric Info" },
//       "author": null,
//       "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
//       "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
//       "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
//       "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
//       "publishedAt": "${this.props.pageSize}${this.props.pageSize}-04-27T11:41:47Z",
//       "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
//     },
//     {
//       "source": { "id": "espn-cric-info", "name": "ESPN Cric Info" },
//       "author": null,
//       "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
//       "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
//       "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
//       "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
//       "publishedAt": "${this.props.pageSize}${this.props.pageSize}-03-30T15:26:05Z",
//       "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
//     }
//   ]

constructor() {
  super();
  console.log('Hello, I am a constructor');
  this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
  };
}

async fetchData(url) {
  this.setState({ loading: true });
  const data = await fetch(url);
  const parseData = await data.json();
  this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
  });
}

async componentDidMount() {
  const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=79cc98956a9d41b793e5f01d0e4b5db8&page=1&pageSize=${this.props.pageSize}`;
  this.fetchData(url);
}

async handlePrevNextClick(pageChange) {
  const nextPage = this.state.page + pageChange;
  if (!(nextPage > Math.ceil(this.state.totalResults / this.props.pageSize))) {
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=79cc98956a9d41b793e5f01d0e4b5db8&page=${nextPage}&pageSize=${this.props.pageSize}`;
      this.fetchData(url);
      this.setState({ page: nextPage });
  }
}

handlePrevClick = async () => {
  await this.handlePrevNextClick(-1);
};

handleNextClick = async () => {
  await this.handlePrevNextClick(1);
};

  render() {
    return (
      <div className='container my-3'>
       <h2 className='text-center' style={{margin:'35px, 0px'}}>Newsdonkey- Top headlines !!!</h2>
       {this.state.loading && <Spinner  />}
        <div className="row">
            {/* row 1 */}
         { !this.state.loading && this.state.articles.map((ele) => {
            return <div className="col-md-4 my-2" key={ele.url} >
            <NewsItem title ={ele.title ? ele.title.slice(0,40): " "} description= {ele.description}  imageUrl = {ele.urlToImage} url={ele.url} />
            </div>
          }) }

        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type='button' className='btn-sm btn btn-dark' onClick={this.handlePrevClick}> &larr; Previous</button>
          <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type='button' className='btn-sm btn btn-dark' onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
