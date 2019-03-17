import React, { Component } from 'react';
import './App.css';
import {observer , inject} from 'mobx-react';

import Home from './components/app/home';

@inject('ProfileStore')
@observer
export default class App extends Component {

  
 
  render() {
      return (
        <div style={{backgroundColor:"white",display:'flex',justifyContent: 'center',height:'100vh',flexDirection: 'column'}}>
            <Home/>
        </div>
        
      );
    
  }
}

