import { Button, Paper, TextField } from "@mui/material";
import React, { Component } from "react";
import CircularProgress from "@mui/material/CircularProgress";

export class PanelGen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prompt: "",
      imageData: "",
      isLoading: false,
    };
  }

  promptHandler = (eve) => {
    this.setState({
      ...this.state,
      prompt: eve.target.value,
    });
  };

  submitHandler = () => {
    this.setState({
      ...this.state,
      isLoading: true,
    });
    this.props.genFunc({ inputs: this.state.prompt }).then((dat) => {
      this.setState({
        ...this.state,
        imageData: URL.createObjectURL(dat),
      });

      this.props.getImageData(this.props.ids, URL.createObjectURL(dat));
    });
  };

  resetHandler = () => {
    this.setState({
      ...this.state,
      imageData: "",
      isLoading: false,
    });
    this.props.getImageData(this.props.ids, "");
  };

  render() {
    return (
      <Paper elevation={2} sx={{ padding: 2, margin: 1 }}>
        <div className="grid-elements" style={{ margin: 1 }}>
          {this.state.imageData ? (
            <img
              src={this.state.imageData}
              className="image"
              alt="Placeholder"
              style={{ width: "35vw" }}
            />
          ) : this.state.isLoading ? (
            <CircularProgress sx={{ margin: 3 }} />
          ) : (
            <p>Enter Prompt and Click Submit to generate Image.</p>
          )}
        </div>
        <TextField
          id="outlined-basic"
          label="Prompt"
          variant="outlined"
          value={this.state.prompt}
          onChange={this.promptHandler}
        />
        <br />
        <Button
          variant="contained"
          onClick={this.submitHandler}
          sx={{ margin: 1 }}
        >
          Submit
        </Button>
        <Button
          variant="contained"
          onClick={this.resetHandler}
          sx={{ margin: 1 }}
        >
          Re-Enter Prompt
        </Button>
      </Paper>
    );
  }
}

export default PanelGen;
