import { useRef, useState } from "react";

import React from "react";
// import ComplexFluidGrid from "./Components/ComplexFluidGrid.tsx";
import "./App.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button, Paper, TextField, Typography } from "@mui/material";
import PanelGen from "./Components/PanelGen";
import NumberInput from "./Components/NumberInput";

import NumberInputBasic from "./Components/NumberInput";

export default function App() {
  const [userPrompt1, setUserPrompt1] = useState("");
  const [imageData1, setImageData1] = useState("");
  const [imagesData, setImagesData] = useState({});
  const [panel, setpanel] = useState(2);

  const canvasRef = useRef(null);

  async function query(data) {
    const response = await fetch(
      "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
      {
        headers: {
          Accept: "image/png",
          Authorization:
            "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    // const response = await fetch(
    //   "https://random.imagecdn.app/600/400",
    //   {
    //     headers: {
    //       Accept: "image/png",
    //       Authorization:
    //         "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
    //       "Content-Type": "application/json",
    //     },
    //     method: "GET",
    //   }
    // );
    const result = await response.blob();
    return result;
  }

  async function generateImage1() {
    console.log(userPrompt1);
    query({ inputs: userPrompt1 }).then((response) => {
      setImageData1(URL.createObjectURL(response));
    });
  }

  function getImageData(vkey, ImageData) {
    var tImageData = imagesData;
    tImageData[vkey] = ImageData;
    setImagesData(tImageData);

    console.log(imagesData);
  }

  function getStrip() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    Object.keys(imagesData).forEach((k) => {
      const img = new Image(60, 45);
      img.onload = drawImageCanvas;
      img.src = imagesData[k];

      function drawImageCanvas() {
        ctx.drawImage(img, (k % 2) * 500, Math.floor(k / 2) * 300, 500, 300);
      }
    });
  }

  function getComic() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    var dataURL = canvas.toDataURL("image/png");
    var a = document.createElement("a");
    a.href = dataURL;
    a.download = "comic.png";
    a.click();
  }

  const ComplexFluidGrid = () => {
    var panelsIndices = [];

    for (var i = 0; i < panel; i++) {
      panelsIndices.push(i);
    }

    var panels = panelsIndices.map((val) => (
      <Grid item xs={5} key={val} sx={{ margin: "2px" }} container spacing={2}>
        {" "}
        <PanelGen genFunc={query} ids={val} getImageData={getImageData} />{" "}
      </Grid>
    ));

    console.log(panels);

    return (
      <Box sx={{ flexGrow: 1, borderRadius: 1 }}>
        <Typography variant="h5" sx={{ color: "black", margin: 2 }}>
          Enter Number of rows of Comic Panel :
        </Typography>
        <NumberInputBasic value={panel} setValue={setpanel} />
        <Grid container spacing={2}>
          {panels}
        </Grid>

        <Paper elevation={2}>
          <canvas
            ref={canvasRef}
            style={{ margin: 3 }}
            width={1000}
            height={(panel * 300) / 2}
          ></canvas>
          <Button variant="contained" onClick={getStrip} sx={{ margin: 1 }}>
            Get Strip
          </Button>
          <Button variant="contained" onClick={getComic} sx={{ margin: 1 }}>
            Download Strip
          </Button>
        </Paper>
      </Box>
    );
  };

  return (
    <div className="App">
      <div className="header">Generate comic images using Dashtoon AI</div>
      <div className="Grid">
        <ComplexFluidGrid />
      </div>
    </div>
  );
}
