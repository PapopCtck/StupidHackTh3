import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import homeStyle from "../../assets/jss/homeStyle";
import Dropzone from "react-dropzone";
import { Grid } from "@material-ui/core";
import styled, { ThemeProvider } from "styled-components";
import NoSsr from "@material-ui/core/NoSsr";
import { createMuiTheme } from "@material-ui/core/styles";
import { palette, spacing, typography } from "@material-ui/system";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      imgUrl: "",
      ready: false
    };
  }

  handleChange = files => {
    var fileTypes = ["jpg", "jpeg", "png"];
    console.log(files);

    let reader = new FileReader();
    let file = files[0];
    var fileType = file.name
      .split(".")
      .pop()
      .toLowerCase();
    if (fileTypes.includes(fileType)) {
      // input is image file
      reader.onloadend = () => {
        this.setState({ file: file, imgUrl: reader.result, ready: true });
      };
      reader.readAsDataURL(file);
    } else {
      //input wrong
    }
  };

  render() {
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

    return (
      <Grid container direction="row" justify="center" alignItems="center">
        <div>
          <ThemeProvider theme={theme}>
            <Box
              color="primary.main"
              // bgcolor="background.paper"
              fontFamily="h1.fontFamily"
              fontSize={{
                xs: "h6.fontSize",
                sm: "h4.fontSize",
                md: "h3.fontSize"
              }}
              p={{ xs: 2, sm: 3, md: 4 }}
            >
              <h1>Home Screen</h1>
            </Box>
          </ThemeProvider>

          <Dropzone onDrop={acceptedFiles => this.handleChange(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <Grid
                  container
                  {...getRootProps()}
                  className={classes.dropZone}
                >
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </Grid>
              </section>
            )}
          </Dropzone>
          <img src={imgUrl} className={classes.image} alt="preview" />
        </div>
      </Grid>
    );
  }
}

export default withStyles(homeStyle)(Home);
