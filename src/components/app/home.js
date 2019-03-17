import React, { Component } from 'react'
import {observer , inject} from 'mobx-react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { uniqBy } from 'lodash/array';

import {
  Autocomplete,DatePicker,
  Button,
  DialogContainer,
  Toolbar
} from 'react-md';

import StateChip from './stateChip';
import { toJS } from 'mobx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faWindowClose, faFilter } from '@fortawesome/free-solid-svg-icons'

@inject('ProfileStore')
@observer
export default class Home extends Component {
  constructor(){
    super();
    this.show = this.show.bind(this);
  }

  setNextState = (selectedMails) => {
    this.props.ProfileStore.setNextState(selectedMails);
  };

  addState = (abbreviation, index, matches) => {
     const state = matches[index];
     let oldselectedMails =toJS(this.props.ProfileStore.selectedMails);
     const selectedMails = uniqBy([...oldselectedMails, state], s => s.name);
    this.setNextState(selectedMails);
  };

  getCharts = () => {
   this.props.ProfileStore.getCharts();
  }

  hide = () =>{
    this.props.ProfileStore.showBusinessDialog = false;
  }

  hideFilterDialog =() =>{
    this.props.ProfileStore.showFilterDialog = false;
  }
  showFilter = () =>{
    this.props.ProfileStore.getFiltersData(this.show);
  }

  handleOnItemClick = (item) => {
    let value = item.target.innerText ;
    this.props.ProfileStore.handleOnItemClick(value);
  }

  handleOnAutoComplete = (value) => {
    this.props.ProfileStore.handleOnAutoComplete(value);
  }

   show = function(list){
    this.props.ProfileStore.filteredMails = list.map((item)=>{
      item['name'] = item['id'];
      return item;
    });
    this.props.ProfileStore.showFilterDialog = true;
   }

   apply = ()=>{
      this.props.ProfileStore.callChartWithFilters();
   }

   handleOnChartClick = (item) => {
     debugger;
    let id = item._targetInst.key;
    id = parseInt(id,10)
    this.props.ProfileStore.handleOnChartClick(id);
  }

  onMyFrameLoad = (event) => {
    // let ev = event.currentTarget;
    
    // let ifstyle = document.getElementById('iframestyle')
    // let iframe = window.frames["MyFrame1"];
    // iframe.document.head.appendChild(ifstyle)
    

    // setTimeout(function(){
    //   var iframe = document.getElementById('MyFrame1');
    //   //var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
    //   document.getElementById("MyFrame1").contentWindow;

    //   //ev.getElementsByClassName('panel-default')
    // }.bind(ev),1000)
    
  };

  render() {

    
    let {chartsList,sampleData,showFilteredData,filteredData,showBusinessDialog,title,showFilterDialog,selectedMails, filteredMails } = this.props.ProfileStore;
    
    sampleData= toJS(sampleData);
    filteredData= toJS(filteredData);
    selectedMails= toJS(selectedMails);
    filteredMails = toJS(filteredMails);
    sampleData= showFilteredData? filteredData:sampleData;
    const chips = selectedMails && selectedMails.map(state => <StateChip key={state.abbreviation} state={state} />);
    

    let items =  sampleData && sampleData.map((item) =>
        <div onClick={this.handleOnItemClick}  key={item}  style={{backgroundColor:"#ef9f0ef7",width:'48vw',height:'19vh',display:'flex',justifyContent:'center',alignItems:'center',border: '4px solid grey'}}>
            <div className='sampleChartItem'>{item}</div>
        </div>
    )

    let charts =  chartsList && chartsList.map((item) =>
      <div key={item.id} className="card" onClick={this.handleOnChartClick} >
        <iframe key={item.id+'10'} onClick={this.handleOnChartClick} className="iframe-item" title="MyFrame" id={item.id} src={item.url}/>
      </div>
    );
    
    return (
        <div  style={{backgroundColor:"white",display:'flex',height:'100vh',flexDirection: 'column'}}>
            

           <div className="header">
             <div className='heading'> ANOBIS</div>
             <div className='subHeading'>powered by compass</div>
             </div>
           <div style={{backgroundColor:"white",display:'flex',justifyContent:'center',flexDirection: 'row',paddingBottom:'5vh'}}>
            <div style={{width:'98vw'}}>
                <Autocomplete
                    id="anobis"
                    label="Type to search"
                    placeholder="Type to search"
                    data={sampleData}
                    simplifiedMenu={false}
                    onAutocomplete={this.handleOnAutoComplete}
                />
            </div>
           
           </div>
           
            <div style={{display:'flex',height:'100vh',flexDirection: 'row',justifyContent:'space-around',flexWrap:'wrap'}}>
                {items}
            </div>
            <DialogContainer style={{width:"100vw",height:"100vh"}}
                id="business-dialog"
                visible={showBusinessDialog}
                fullPage
                onHide={this.hide}
                aria-labelledby="business-dialog-title"
                >
                <Toolbar
                    fixed
                    colored
                    title={title}
                    titleId="simple-full-page-dialog-title"
                     nav={<Button icon primary onClick={this.hide}><FontAwesomeIcon color="#ff0000b8"  icon={faWindowClose} size="2x"/></Button>}
                    actions={<Button icon primary onClick={this.showFilter}><FontAwesomeIcon color="#04a9f4" icon={faFilter} size="2x"/></Button>}
                />
                <section className="md-toolbar-relative">
                  <div className='displaySection'>
                  <div className="scrolling-wrapper">
                    {charts}
                  </div>
                      {/* <div className='scrollBar'>
                          <HorizontalExample />
                      </div> */}
                      <div id="chartRender" className='displayBar'>
                          <div className="displayBarItem">
                            <iframe onLoad={this.onMyFrameLoad} className="displayBarIframe" title="MyFrame1" id="MyFrame1" 
                              src="http://compass-mobile.swiggyops.de/superset/slice/412/">
                              <p>Your browser does not support iframes.</p>
                            </iframe>
                            {/* <div className="a"></div> */}
                          </div>
                          <div className="displayBarItem">
                            <iframe className="displayBarIframe" title="MyFrame2" id="MyFrame2" 
                              src="http://compass-mobile.swiggyops.de/superset/slice/425/">
                              <p>Your browser does not support iframes.</p>
                            </iframe>
                            {/* <div className="a"></div> */}
                          </div>

                          
                      </div>
                  
                  </div>
                </section>
            </DialogContainer>
            {filteredMails && <DialogContainer className='filterDialog'
                id="filter-dialog"
                visible={showFilterDialog}
                onHide={this.hideFilterDialog}
                aria-labelledby="filter-dialog-title"
                >
                <Toolbar
                    fixed
                    colored
                    title={`Select filters`}
                    titleId="simple-full-page-dialog-title"
                    actions={<Button icon primary onClick={this.hideFilterDialog}><FontAwesomeIcon color='#ff0000b8' icon={faWindowClose} size="2x"/></Button>
                    }
                />
                <section className="md-toolbar-relative">
                {/* <h4 className="md-cell md-cell--12">Using SVGIcons</h4>
    
                  <SelectField
                    id="select-field-8"
                    placeholder="Select Chart"
                    className="md-cell md-cell--bottom"
                    menuItems={STRING_ITEMS}
                    position={SelectField.Positions.BELOW}
                    dropdownIcon={icon}
                    simplifiedMenu={true}
                  /> */}

                  <div className="filterDialogContent">
                          
                    <CSSTransitionGroup
                          component="div"
                          transitionName="opacity"
                          transitionEnterTimeout={150}
                          transitionLeaveTimeout={150}
                        >
                          <div style={{height:"6vh",overflowX:'scroll',display:'flex'}}>{chips}</div>
                            <div>
                              <DatePicker
                                id="from-date"
                                label="From Date"
                                className="md-cell"
                                displayMode="portrait"
                              />
                              <DatePicker
                                id="to-date"
                                label="To Date"
                                className="md-cell"
                                displayMode="portrait"
                              />
                            </div>
                            <Autocomplete
                              id="states-autocomplete"
                              label="Select User/Users"
                              data={filteredMails}
                              dataLabel="name"
                              dataValue="abbreviation"
                              onAutocomplete={this.addState}
                              clearOnAutocomplete
                              deleteKeys="abbreviation"
                            />
                            <div style={{height:"6vh",display:'flex',justifyContent:"center",alignItems:"center"}}>
                              <Button raised primary swapTheming onClick={this.apply}>Apply</Button>
                            </div>
                        </CSSTransitionGroup>
                      </div>
                  
                </section>
            </DialogContainer>}
        
        </div>
    )
  }
}
