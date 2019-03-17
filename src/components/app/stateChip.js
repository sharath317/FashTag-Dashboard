import React, { Component } from 'react';
import { Chip } from 'react-md';
import {observer , inject} from 'mobx-react';

@inject('ProfileStore')
@observer
export default class chipsState extends Component {
  

  handleRemove = () => {
    this.props.onClick(this.props.state);
  };

  render() {
    const { ...props } = this.props;
    return (
      <Chip
        {...props}
        className="state-chip"
        onClick={this.handleRemove}
        //removable
        label={this.props.state.name}
        // avatar={<Avatar random>{abbreviation.charAt(0)}</Avatar>}
      />

      
    );
  }
}
