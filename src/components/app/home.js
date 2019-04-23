import React, { Component } from 'react'
import { observer, inject } from 'mobx-react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { uniqBy } from 'lodash/array';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import {
  Autocomplete, DatePicker,
  Button,
  DialogContainer,
  Toolbar
} from 'react-md';

import StateChip from './stateChip';
import { toJS } from 'mobx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose, faFilter } from '@fortawesome/free-solid-svg-icons';

@inject('ProfileStore')
@observer
export default class Home extends Component {
  constructor(props) {

    super(props);
  }

  apply = ()=>{
      this.props.ProfileStore.callChartWithFilters();
  }

  search = () => {
    this.props.ProfileStore.searchbyFilter();
  }

  onChange = value => {
    this.props.ProfileStore.selectedOption = value
  };

  onExpChange = value => {
    this.props.ProfileStore.selectedExpOption = value
  };

  render() {


    let { jobsfeed,selectedOption, chartsList, sampleData, showFilteredData, filteredData, showBusinessDialog, title, showFilterDialog, selectedMails, filteredMails } = this.props.ProfileStore;

    
    
    filteredData = toJS(filteredData);
    selectedMails = toJS(selectedMails);
    filteredMails = toJS(filteredMails);
    debugger;
    // if(filteredData.length>0){
    //   jobsfeed = toJS(filteredData);
    // }
    // else{
    //   jobsfeed = toJS(jobsfeed);
    // }

    jobsfeed = toJS(jobsfeed);

    let jobsfeedContent = jobsfeed && jobsfeed.map((item) =>
      <div key={item.id} className="card" >
        <div className="profile">


          <div className='profileItems'>
            <div className="profileLabel">{`JobTitle`}</div>
            <div className="profileContent">{item.title}</div>
          </div>
          <div className='profileItems'>
            <div className="profileLabel">{`Company`}</div>
            <div className="profileContent">{item.companyname}</div>
          </div>
          <div className='profileItems'>
            <div className="profileLabel">{`Location`}</div>
            <div className="profileContent">{item.location}</div>
          </div>
          <div className='profileItems'>
            <div className="profileLabel">{`Salary`}</div>
            <div className="profileContent">{item.salary}</div>
          </ div>
          <div className='profileItems'>
            <div className="profileLabel">{`Start Data`}</div>
            <div className="profileContent">{item.startdate}
            </div>
          </div>
          <div className='profileItems'>
            <div className="profileLabel">{`End Date`}</div>
            <div className="profileContent">{item.enddate}</div>
          </div>
          <div className='profileItems'>
            <div className="profileLabel">{`Apply Link`}</div>
            <div className="profileContent"><a href={item.applylink} target="_blank">{item.applylink}</a></div>
          </div>

        </div>
      </div>
    );

    const options = [
      { value: 'bengaluru', label: 'Bengaluru' },
      { value: 'mumbai', label: 'Mumbai' },
      { value: 'kochi', label: 'Kochi/Cochin' },
      { value:'Kolkata', label:'Kolkata' },
      { value:'Hyderabad', label:'Hyderabad' },
      { value:'New Delhi', label:'New Delhi' },
      { value:'Thiruvananthapuram', label:'Thiruvananthapuram' },
      { value:'Tumkur', label:'Tumkur' }
    ];

    const expOptions = [
      { value: '0', label: 'Fresher' },
      { value: '1', label: '1' },
      { value: '2', label: '2' },
      { value:'3', label:'3' },
      { value:'4', label:'4' },
      { value:'5', label:'5' },
      { value:'6', label:'6' },
      { value:'7', label:'7' },
      { value:'8', label:'8' },
      { value:'9', label:'9' },
      { value: '10', label: '10' },
      { value: '11', label: '11' },
      { value: '12', label: '12' },
      { value:'13', label:'13' },
      { value:'14', label:'14' },
      { value:'15', label:'15' },
      { value:'16', label:'16' },
      { value:'17', label:'17' },
    ];

    return (
      <div style={{ backgroundColor: "white", display: 'flex', height: '100vh', flexDirection: 'column' }}>


        <div className="header">
          <div className='heading'>Search Jobs</div>
        </div>
        <div className='displaySection'>
          <div className="filterSection">
            <div className='filterItems'>
              <Select
                value={selectedOption}
                onChange={this.onChange}
                options={expOptions}
                placeholder={`experience`}
              />
            </div>
            <div className='filterItems'>
              <Select
                value={selectedOption}
                onChange={this.onChange}
                options={options}
                placeholder={`location`}
              />
            </div>
            <div className='filterItems'>
              <Button raised primary swapTheming onClick={this.search}>Search</Button>
            </div>
          </div>

          <div className="displayBarItem">
            <div className="searchbarItem">
              <div className="profile">
              <Select
                value={selectedOption}
                onChange={this.onChange}
                options={options}
                placeholder={`experience`}
              />
              </div>
            </div>
            <div className="displayBarIframe">
              {jobsfeedContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
