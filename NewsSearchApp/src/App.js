import React, { Component } from 'react';
import { Jumbotron, Button, NavLink } from 'reactstrap';
import { ListGroup, li } from 'reactstrap';
import { 
  Container
} from 'reactstrap';
import { animateScroll } from 'react-scroll';
import { SORT_OPTIONS } from './constants';
import { getArticles } from './api';
import Search from './components/Search';
import NewList from './components/NewList';
import Files from './components/Files';
import Pagination from './components/Pagination';
import './App.css';
import csv from './my-news.csv';

class App extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      sort: '',
      search: '',
      articles: [],
      page: 1,
      pageSize: 10,
      error: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
  }

  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;

    this.setState(prevstate=> {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  }

  handleKeyDown(e) {
    if(e.keyCode === 13){
      this.handleBasicSearch();
   }
  }

  handleSortChange(e) {
    if (this.state.search !== '') {
      this.setState({
        sort: e.target.value
      }, () => {
        this.handleBasicSearch();
      });
    }
  }

  handleSearch(e) {
    e.preventDefault();

    this.handleBasicSearch();
  }

  handleBasicSearch() {
    this.setState({
      loading: true,
      page: 1
    }, () => {
      this.handleGetArticles();
    });
  }

  handleGetArticles() {
    getArticles(this.state).then(res => {
      console.log(res.data)
      this.setState(prevState => {
        let newState = prevState;
        newState['loading'] = false;
        newState['totalResults'] = res.data.totalResults;
        newState['articles'] =  res.data.articles;
        newState['pages'] = Math.round(Number(res.data.totalResults) / Number(prevState['pageSize']));
        return newState;
      });
    }).catch(() => {
      this.setState({
        loading: false,
        error: true
      });
    });
  }

  handlePagination(e, direction) {
    e.preventDefault();

    let page = this.state.page;

    if (direction === 'left') {
      page -= 1;
    } else if (direction === 'right') {
      page += 1;
    }

    this.setState({
      page
    }, () => {
      this.handleGetArticles();
      animateScroll.scrollToTop();
    });
  }

  render() {
    return (
      <Container>
        <Search { ...this.state }
          onSearch={this.handleSearch}
          onChange={this.handleChange} 
          sortOptions={SORT_OPTIONS}
          onKeyDown={this.handleKeyDown}
          onSortChange={this.handleSortChange}
        />
        <NewList { ...this.state } />
        <Jumbotron className='container1'>
        <h1 className="display-3">News Search</h1>
        <p className="lead">Our easy news search app written on React, using machine learning for sentimental analysis</p>
        <hr className="my-2" />
     
        <li>Serikzhan</li>
        <li>Yernur</li>
        <li>Daribek</li>
        <li>Assel</li>
       <br/>
     
      
        <p className="lead">
          <a href="https://github.com/asselyer/MethodPro" >Наш github</a>
        </p>
      </Jumbotron>
      <hr className='ye'/>
      <Files />
        <Pagination { ...this.state } onClick={this.handlePagination} />
      
      </Container>

    );
  }
}

export default App;