import React, { Component } from 'react'
import {getImgfromStorage } from "../../../actions/firebase";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import * as moment from "moment"
export class ModalListItemSection extends Component {
    state={
        img:null
    }
    componentDidMount() {
        console.log(this.props.lotto.id);
        
      getImgfromStorage(this.props.lotto.id+".jpg").then((img)=>{
        this.setState({img:img})
      })
    }
    
  render() {
      const {lotto} = this.props
    return (
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={this.state.img} />
        </ListItemAvatar>
        <ListItemText primary={moment(lotto.date.toDate()).fromNow()} />
        <ListItemSecondaryAction >
                
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

export default ModalListItemSection
