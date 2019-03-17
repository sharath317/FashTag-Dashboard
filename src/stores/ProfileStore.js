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
  // @observable filteredMails = [{
  //   name: 'Alabama',
  //   abbreviation: 'AL',
  // }, {
  //   name: 'Alaska',
  //   abbreviation: 'AK',
  // }, {
  //   name: 'American Samoa',
  //   abbreviation: 'AS',
  // }];
  @observable title = "";

  @observable filtersDataObject = {};
  

  @observable chartsList = [
    {id:1,url:'http://compass-mobile.swiggyops.de/superset/slice/435/'},
    {id:2,url:'http://compass-mobile.swiggyops.de/superset/slice/438/'},
    {id:3,url:'http://compass-mobile.swiggyops.de/superset/slice/435/'},
    {id:4,url:'http://compass-mobile.swiggyops.de/superset/slice/438/'},
    {id:5,url:'http://compass-mobile.swiggyops.de/superset/slice/435/'}
  ];

  @observable sampleData = [
    'Business',
    'Funnel',
    'Ops',
    'Supply',
    'CX',
    'Consumer',
    'UE',
    'Strategic'
  ];

  @observable selectedMails =[];

  // @observable sampleFilterData =



  @observable filteredData = [];

  @observable clickedChartId=0;

  @observable charts =[];

  @action handleScrollLeft = () => {
    let count = this.chartsList.length;
    let data = {id:0};
    if(count){
      data.id = this.chartsList[count-1].id + 1;
    }
    else{
      data.id = 1;
    }
    this.chartsList.push(data);
  };

  @action setNextState = (selectedMails) => {
    this.selectedMails  = selectedMails;
  };

  @action callChartWithFilters = () => {
    let selectedArray= toJS(this.selectedMails);
    let selectArrayIdentifiers =[];

    for (let index = 0; index < selectedArray.length; index++) {
      selectArrayIdentifiers =[...selectArrayIdentifiers,selectedArray[index]["id"]] ;
    }

    
    let params ={
      filters:{
        "adhoc_filters": [
          {
            "field": "agentEmailId",
            "operator": "in",
            "value":selectArrayIdentifiers
            // "value": [
            //   "bk.sandhya_cb@external.swiggy.in"
            // ]
          }
        ],
        "chronic_filters": {
          "from": "3 day ago",
          "to": "now"
        }
      }
    }

      const request = require('request');
      const options = {
        url: 'http://compass-mobile.swiggyops.de/superset/slice/435/',
        qs:params
      };
      var that = this; 
    request(options, function (error, response, body) {
      
      if(response){
        let responseUrl = response.url;
        if(responseUrl){
          document.getElementById("MyFrame").src=responseUrl;
          that.showFilterDialog = false;
        } 
      }
    });

    // let responseUrl ='http://compass-mobile.swiggyops.de/?form_data={"datasource": "75__druid", "viz_type": "table", "granularity": null, "druid_time_origin": null, "since": "7 days ago", "until": "now", "groupby": ["agentEmailId"], "metrics": ["customer_satisfaction", "count"], "percent_metrics": [], "timeseries_limit_metric": "customer_satisfaction", "row_limit": null, "include_time": false, "order_desc": true, "all_columns": [], "order_by_cols": [], "adhoc_filters": [{"expressionType": "SIMPLE", "subject": "agentEmailId", "operator": "!=", "comparator": "NOTFILLED", "clause": "WHERE", "sqlExpression": null, "fromFormData": true, "filterOptionName": "filter_vf23kdqdhhl_pcexd5ho59"}, {"expressionType": "SIMPLE", "subject": "effortScore", "operator": "!=", "comparator": "-99", "clause": "WHERE", "sqlExpression": null, "fromFormData": true, "filterOptionName": "filter_av8g5fuz7xa_kflaghuk9p"}, {"comparator": ["s.anitha@swiggy.in"], "subject": "agentEmailId", "expressionType": "SIMPLE", "clause": "WHERE", "fromFormData": true, "sqlExpression": null, "operator": "in", "filterOptionName": "filter_juzaly9haa_83sxqjizd5h"}], "table_timestamp_format": "%Y-%m-%d %H:%M:%S", "page_length": 25, "include_search": true, "table_filter": true, "align_pn": true, "color_pn": true, "url_params": {}, "where": "", "having": "", "having_filters": [], "filters": [{"col": "agentEmailId", "op": "!=", "val": "NOTFILLED"}, {"col": "effortScore", "op": "!=", "val": "-99"}], "slice_id": 402}';
  };

  

  @action addState = (i) => {
    let selectedMails = this.selectedMails[i]
    this.selectedMails.push(selectedMails);
    // this.setNextState(selectedMails);
  };

  @action handleScrollRight = () => {
    let count = this.chartsList.length;
    let data = {id:0};
    if(count){
      data.id = this.chartsList[count-1].id + 1;
    }
    else{
      data.id = 1;
    }
    this.chartsList.push(data);
  };

  @action handleOnChartClick = (id) => {
    let src1,src2;
    if(id%2===0){
      src1 = "http://compass-mobile.swiggyops.de/superset/slice/412";
      src2 = "http://compass-mobile.swiggyops.de/superset/slice/425";
    }
    // else if(id===2){
    //   src1 = "http://compass-mobile.swiggyops.de/superset/slice/417";
    //   src2 = "https://www.espncricinfo.com/"
    //   //src = "http://compass-mobile.swiggyops.de/superset/explore/?form_data=%7B%22datasource%22%3A%2275__druid%22%2C%22viz_type%22%3A%22table%22%2C%22slice_id%22%3A402%2C%22granularity%22%3Anull%2C%22druid_time_origin%22%3Anull%2C%22since%22%3A%227+days+ago%22%2C%22until%22%3A%22now%22%2C%22groupby%22%3A%5B%22agentEmailId%22%5D%2C%22metrics%22%3A%5B%22customer_satisfaction%22%2C%22count%22%5D%2C%22percent_metrics%22%3A%5B%5D%2C%22timeseries_limit_metric%22%3A%22customer_satisfaction%22%2C%22row_limit%22%3Anull%2C%22include_time%22%3Afalse%2C%22order_desc%22%3Atrue%2C%22all_columns%22%3A%5B%5D%2C%22order_by_cols%22%3A%5B%5D%2C%22adhoc_filters%22%3A%5B%7B%22expressionType%22%3A%22SIMPLE%22%2C%22subject%22%3A%22agentEmailId%22%2C%22operator%22%3A%22%21%3D%22%2C%22comparator%22%3A%22NOTFILLED%22%2C%22clause%22%3A%22WHERE%22%2C%22sqlExpression%22%3Anull%2C%22fromFormData%22%3Atrue%2C%22filterOptionName%22%3A%22filter_vf23kdqdhhl_pcexd5ho59%22%7D%2C%7B%22expressionType%22%3A%22SIMPLE%22%2C%22subject%22%3A%22effortScore%22%2C%22operator%22%3A%22%21%3D%22%2C%22comparator%22%3A%22-99%22%2C%22clause%22%3A%22WHERE%22%2C%22sqlExpression%22%3Anull%2C%22fromFormData%22%3Atrue%2C%22filterOptionName%22%3A%22filter_av8g5fuz7xa_kflaghuk9p%22%7D%5D%2C%22table_timestamp_format%22%3A%22%25Y-%25m-%25d+%25H%3A%25M%3A%25S%22%2C%22page_length%22%3A25%2C%22include_search%22%3Atrue%2C%22table_filter%22%3Atrue%2C%22align_pn%22%3Atrue%2C%22color_pn%22%3Atrue%2C%22url_params%22%3A%7B%7D%2C%22where%22%3A%22%22%2C%22having%22%3A%22%22%2C%22having_filters%22%3A%5B%5D%2C%22filters%22%3A%5B%7B%22col%22%3A%22agentEmailId%22%2C%22op%22%3A%22%21%3D%22%2C%22val%22%3A%22NOTFILLED%22%7D%2C%7B%22col%22%3A%22effortScore%22%2C%22op%22%3A%22%21%3D%22%2C%22val%22%3A%22-99%22%7D%5D%7D"
    // }
    // else if(id===3){
    //   src1 = "http://compass-mobile.swiggyops.de/superset/slice/417";
    //   src2 = "https://www.espncricinfo.com/"
    //   //src = "http://compass-mobile.swiggyops.de/superset/explore/?form_data=%7B%22datasource%22%3A%2227__druid%22%2C%22viz_type%22%3A%22table%22%2C%22slice_id%22%3A178%2C%22cache_timeout%22%3A60%2C%22granularity%22%3A%22PT30S%22%2C%22druid_time_origin%22%3Anull%2C%22since%22%3A%22today+-+7+days%22%2C%22until%22%3A%22now%2B330+minutes+-+7+days%22%2C%22groupby%22%3A%5B%22restaurant_id%22%2C%22city%22%2C%22area%22%5D%2C%22metrics%22%3A%5B%22count_distinct__order_id%22%5D%2C%22percent_metrics%22%3A%5B%22count_distinct__order_id%22%5D%2C%22timeseries_limit_metric%22%3A%5B%5D%2C%22row_limit%22%3A500%2C%22include_time%22%3Afalse%2C%22order_desc%22%3Atrue%2C%22all_columns%22%3A%5B%5D%2C%22order_by_cols%22%3A%5B%5D%2C%22adhoc_filters%22%3A%5B%7B%22comparator%22%3A%5B%22The+Bowl+Company%22%5D%2C%22expressionType%22%3A%22SIMPLE%22%2C%22clause%22%3A%22WHERE%22%2C%22fromFormData%22%3Atrue%2C%22sqlExpression%22%3Anull%2C%22operator%22%3A%22in%22%2C%22filterOptionName%22%3A%22filter_juzaly9haa_83sxqjizd5h%22%2C%22subject%22%3A%22restaurant_name%22%7D%2C%7B%22comparator%22%3A%22failed%22%2C%22expressionType%22%3A%22SIMPLE%22%2C%22clause%22%3A%22WHERE%22%2C%22fromFormData%22%3Atrue%2C%22sqlExpression%22%3Anull%2C%22operator%22%3A%22%21%3D%22%2C%22filterOptionName%22%3A%22filter_dwzp2zwzu4f_njdv6hbz7e%22%2C%22subject%22%3A%22order_status%22%7D%5D%2C%22table_timestamp_format%22%3A%22%25Y-%25m-%25d+%25H%3A%25M%3A%25S%22%2C%22page_length%22%3A0%2C%22include_search%22%3Afalse%2C%22table_filter%22%3Afalse%2C%22align_pn%22%3Afalse%2C%22color_pn%22%3Atrue%2C%22url_params%22%3A%7B%7D%2C%22filters%22%3A%5B%7B%22col%22%3A%22restaurant_name%22%2C%22op%22%3A%22in%22%2C%22val%22%3A%5B%22The+Bowl+Company%22%5D%7D%2C%7B%22col%22%3A%22order_status%22%2C%22op%22%3A%22%21%3D%22%2C%22val%22%3A%22failed%22%7D%5D%2C%22having_filters%22%3A%5B%5D%2C%22having%22%3A%22%22%2C%22where%22%3A%22%22%7D"
    // }
    else{
      src1 = "http://compass-mobile.swiggyops.de/superset/slice/417";
      src2 = "ttp://compass-mobile.swiggyops.de/superset/slice/425"
    }
    document.getElementById("MyFrame1").src=src1;
    document.getElementById("MyFrame2").src=src2;

    //this.addDialogVisible = true;//to make dialog work
  };

  @action handleOnItemClick = (value) => {
    this.title= value;
    this.showBusinessDialog = true;
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

  @action handleOnAutoComplete = (value) => {
    this.filteredData = this.sampleData.filter((item)=>{
      
      return item === value;
    });
    this.showFilteredData = this.filteredData.length ? true:false;
  };



  @action getCharts = () => {
    let list = this.state.chartsList;

    this.charts =  list.map(item =>
          <span key ={new Date().getTime()} style={{
            width: '60vw',
            height: '15vh',
            padding: '10px',
            margin: '10px',
            display: 'inline-block',
            fontFamily: '"Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
          }}>{'Chart:'}{item}</span>
      )
  } 
};

export default new ProfileStore();
