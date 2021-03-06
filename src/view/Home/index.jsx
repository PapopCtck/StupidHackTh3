import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import homeStyle from "../../assets/jss/homeStyle";
import Dropzone from "react-dropzone";
import { Grid, Button } from "@material-ui/core";
import styled, { ThemeProvider } from "styled-components";
import { createMuiTheme } from "@material-ui/core/styles";
import { palette, spacing, typography } from "@material-ui/system";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import { connect } from "react-redux";
import { sendLotto, sendNumLotto } from "../../actions/firebase";
import Modal from "../../Components/Modal";
import CircularProgress from "@material-ui/core/CircularProgress";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      lottoId: "test",
      file: "",
      imgUrl: "",
      ready: false,
      display: false,
      number: [],
      tempDigit: [],
      selectNum: []
    };
  }
  handleModal = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleChange = files => {
    var fileTypes = ["jpg", "jpeg", "png"];
    let reader = new FileReader();
    let file = files[0];
    var fileType = file.name
      .split(".")
      .pop()
      .toLowerCase();
    if (fileTypes.includes(fileType)) {
      // input is image file
      reader.onloadend = () => {
        this.setState({
          file: file,
          imgUrl: reader.result,
          display: true
        });
      };
      reader.readAsDataURL(file);
    } else {
      //input wrong
    }
  };

  handleSubmit = () => {
    this.setState({ modal: true, ready: false });
    this.props.sendLotto(this.state.file).then(res => {
      this.setState({ lottoId: res.id, number: res.data, ready: true });
    });
  };
  handleRealSubmit = () => {
    this.props.sendNumLotto(this.state.selectNum, this.state.lottoId);
    this.setState({file:"", imgUrl:"" ,display:false})
  };

  handleSelectDigit = num => {
    let a = this.state.tempDigit;
    a.unshift(num);
    a.length === 3 && a.pop();
    this.setState({ tempDigit: a });
  };
  handleDelDigit = index => {
    let a = this.state.tempDigit;
    a = a.filter((num, i) => i !== index);
    this.setState({ tempDigit: a });
  };
  handleDelNum = index => {
    let a = this.state.selectNum;
    a = a.filter((num, i) => i !== index);
    this.setState({ selectNum: a });
  };
  handleSelectNum = () => {
    const { tempDigit, selectNum } = this.state;
    var x = tempDigit.join("");
    let a = selectNum;
    a.push(x);
    this.setState({ selectNum: a, tempDigit: [] });
  };

  render() {
    const { number, selectNum, ready, tempDigit } = this.state;
    const Box = styled.div`${palette}${spacing}${typography}`;
    const theme = createMuiTheme({
      typography: {
        useNextVariants: true
      }
    });
    const inner = (
      <Box
        bgcolor="background.paper"
        m={1}
        border={1}
        style={{ width: "5rem", height: "5rem" }}
      />
    );
    const { classes } = this.props;
    const { imgUrl } = this.state;

    const fontdrag = {
      flex: 1,
      color: "Black",
      opacity: "0.14",
      fontSize: "88px",
      justifyContent: "center",
      alignItems: "center"
    };
    const modalstyle = {
      fontSize: "50px",
      justifyContent: "center",
      alignItems: "center",
      width: "20%"
    };

    return (
      <div>
        <Grid container direction="row" justify="center" alignItems="center">
          <div>
            <ThemeProvider theme={theme}>
              <Box
                color="white"
                // bgcolor="background.paper"
                fontFamily="h1.fontFamily"
                fontSize={{
                  xs: "h6.fontSize",
                  sm: "h4.fontSize",
                  md: "h3.fontSize"
                }}
                p={{ xs: 2, sm: 3, md: 4 }}
              >
                <h1>DIG LOTTO</h1>
              </Box>
            </ThemeProvider>
            <Dropzone
              onDrop={acceptedFiles => this.handleChange(acceptedFiles)}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <Grid
                    container
                    {...getRootProps()}
                    className={classes.dropZone}
                  >
                    <input {...getInputProps()} />
                    {this.state.display ? (
                      <img
                        src={imgUrl}
                        className={classes.image}
                        alt="preview"
                      />
                    ) : (
                      <p style={fontdrag}>Drop Here</p>
                    )}
                  </Grid>
                </section>
              )}
            </Dropzone>
          </div>
        </Grid>

        <Grid container direction="row" justify="center" alignItems="center">
          <ButtonBase
            focusRipple
            key={"sfas"}
            onClick={this.handleSubmit}
            className={classes.image}
            focusVisibleClassName={classes.focusVisible}
            style={{
              marginTop: "1rem",
              marginBottom: "20%",
              marginLeft: "20%",
              marginRight: "20%",

              width: "60%"
            }}
          >
            <span
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${imgUrl})`
              }}
            />
            <span className={classes.imageBackdrop} />
            <span className={classes.imageButton}>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                className={classes.imageTitle}
              >
                {"submit"}
                <span className={classes.imageMarked} />
              </Typography>
            </span>
          </ButtonBase>

          <Modal
            isOpen={this.state.modal}
            title={"Select number"}
            content={
              !ready ? (
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <div style={modalstyle}>
                    <CircularProgress
                      className={classes.progress}
                      color="secondary"
                    />
                  </div>
                </Grid>
              ) : (
                <div>
                  <hr/>
                  {selectNum.length !== 3 &&
                    number.map(num => (
                      <Button onClick={() => this.handleSelectDigit(num)}>
                        {num}
                      </Button>
                    ))}
                  <br /><hr/>
                  <div>
                    {tempDigit.map((num, index) => (
                      <Button onClick={() => this.handleDelDigit(index)}>
                        {num}
                      </Button>
                    ))}
                    {selectNum.length < 3 && tempDigit.length === 2 && (
                      <Button color="secondary" onClick={this.handleSelectNum}>
                        +
                      </Button>
                    )}
                  </div>
                  <br /><hr/>
                  {selectNum.map((num, index) => (
                    <Button onClick={() => this.handleDelNum(index)} color="primary">
                      {num}
                    </Button>
                  ))}
                </div>
              )
            }
            submit={ready&&selectNum.length!==0 ? this.handleRealSubmit : undefined}
            handleModal={this.handleModal}
          />
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = state => ({});

const mapDispatchToProps = {
  sendLotto,
  sendNumLotto
};

export default withStyles(homeStyle)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
);
