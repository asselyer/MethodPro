import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSVLink } from 'react-csv';
import { 
  Row,
  Alert,
  Col,
} from 'reactstrap';
import './Files.css';
import csv from '../my-news.csv';
import json from '../my-news.json';
import xsl from '../my-news.xlsx';

class Files extends Component {
  render() {
    return (
        <div>
<a href={csv}>Download CSV            </a>
           <a href={json}>Download JSON        </a>
           <a href={xsl}>Download EXCEL        </a>
        
      </div>
    );
  }
}


export default Files;

