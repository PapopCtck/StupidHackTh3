import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import {
  fetchLeaderboards,
  fetchUserScore,
  getImgfromStorage
} from "../../actions/firebase";
import { connect } from "react-redux";
import Modal from "../../Components/Modal";
import ModalListItemSection from "./Sections/ModalListItemSection";
import leaderStyle from "../../assets/jss/leaderStyle";
import StarIcon from "@material-ui/icons/Star";
export class LeaderBoards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectUserList: [],
      modal: false,
      imgList: [],
      selectUser: ""
    };
  }

  componentDidMount() {
    this.props.fetchLeaderboards();
  }
  handleModal = () => {
    this.setState({ modal: !this.state.modal });
  };
  handleOpen = user => {
    fetchUserScore(user.id).then(list => {
      this.setState({ selectUser: user, modal: true, selectUserList: list });
    });
  };

  render() {
    const { modal, selectUser, selectUserList } = this.state;
    const { classes, content } = this.props;
    return content.hasContent ? (
      <List className={classes.root}>
        {content.data.map((user, index) => (
          <ListItem
            button
            onClick={() => {
              this.handleOpen(user);
            }}
            alignItems="flex-start"
          >
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={user.data.photoURL} />
            </ListItemAvatar>
            <ListItemText primary={user.data.displayName} />
            <ListItemSecondaryAction>
              <React.Fragment>
                <Typography
                  component="span"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {user.data.star}
                  <StarIcon />
                </Typography>{" "}
                <Typography component="span" className={classes.inline}>
                  {user.data.digged}%
                </Typography>
                <star_rate />
              </React.Fragment>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
        {selectUser.data !== undefined && (
          <Modal
            className={classes.modals}
            title={selectUser.data.displayName}
            isOpen={modal}
            handleModal={this.handleModal}
            content={
              <List>
                {selectUserList.map(item => (
                  <ModalListItemSection lotto={item} />
                ))}
              </List>
            }
          />
        )}
      </List>
    ) : (
      <p>Loading</p>
    );
  }
}

const mapStateToProps = state => ({
  content: state.content
});

const mapDispatchToProps = {
  fetchLeaderboards
};

export default withStyles(leaderStyle)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LeaderBoards)
);
