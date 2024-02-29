import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, url} = this.props
    return (
      <div className="my-3">
        <div className="card" >
          <img src={!imageUrl? "https://sportshub.cbsistatic.com/i/r/2024/02/26/7b64fd2d-c05f-49ca-a56e-dd2d945abc25/thumbnail/1200x675/2a07cab713e9f55aa679d98b8524546c/jokic-2024-still-vs-warriors.png" :imageUrl } className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">
             {description}....
            </p>
            <a href={url} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm btn-dark">
              read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
