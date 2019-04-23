import { observable  , action, toJS } from "mobx";
import React  from 'react';

class ProfileStore {

  @observable addDialogVisible = false;
  @observable showFilteredData = false;
  @observable showFilterDialog = false;
  @observable showBusinessDialog = false;
  @observable clickedProfile = {};
  @observable filterLabels = [];
  @observable filterValues = [];
  @observable filteredMails = [];
  @observable jobsfeed =[];
  
  @observable title = "";

  @observable filtersDataObject = {};
  

  @observable selectedMails =[];

  // @observable sampleFilterData =



  @observable filteredData = [];

  @observable clickedChartId=0;

  @observable charts =[];

  @observable selectedOption = undefined;
  @observable selectedExpOption = undefined;
 
  @action searchbyFilter = () =>{
    this.filteredData = this.jobsfeed.filter(person => person.location == this.selectedOption)
  }



  @action callChartWithFilters = (cb) => {
    let selectedArray= toJS(this.selectedMails);
    let selectArrayIdentifiers =[];

    for (let index = 0; index < selectedArray.length; index++) {
      selectArrayIdentifiers =[...selectArrayIdentifiers,selectedArray[index]["id"]] ;
    }

    
   

      const request = require('request');
      const options = {
        url: 'https://api.myjson.com/bins/kez8a',
      };
      var that = this; 
    request(options, function (error, response, body) {
      if(response){
        debugger;
        let responseObj = JSON.parse(response.body)
        that.jobsfeed = responseObj["jobsfeed"];
        
        cb(this.jobsfeed);
        
      }
    });
  };



  @action showFilter = () =>{
    //this.props.ProfileStore.getFiltersData();
    this.showFilterDialog = true;
  }

  

  @action  getFiltersData = (cb) => {
    const request = require('request');
    if(this.filteredMails.length>0){
      this.showFilterDialog = true;
      return
    }
    request('http://compass-mobile.swiggyops.de/superset/slice_json/400', function (error, response, body) {
      if(response){
        let responseObj = JSON.parse(response.body)
        this.filtersDataObject = responseObj["data"];
        this.filterLabels = Object.keys(this.filtersDataObject);
        let label = this.filterLabels.slice();
        this.filteredMails = this.filtersDataObject[label];
        

        if(this.filteredMails.length>0){
          cb(this.filteredMails)
        }
        
      }
    });
  }
};

export default new ProfileStore();
