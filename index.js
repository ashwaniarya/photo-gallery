const express = require("express");
const path = require('path');
const cors = require("cors");
const app = express();
const fetch = require("node-fetch");

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const flicker = {
  getRecentPhoto:
    "https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&format=json&api_key=8d6f541f7bdeeccdc9236f14015cee7e&extras={{extras}}&per_page={{perPage}}&page={{page}}&safe_search=1",
  serchPhotos: "https://www.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=8d6f541f7bdeeccdc9236f14015cee7e&extras={{extras}}&per_page={{perPage}}&page={{page}}&safe_search=1&text={{searchQuery}}"
};

app.get("/v1/api/photos", (req, res) => {
  let { extras = '', perPage = 50 , page = 1 } = req.query 
  const formattedUrl = flicker.getRecentPhoto.replace('{{extras}}',extras).replace('{{perPage}}',perPage).replace('{{page}}',page);
  fetch(formattedUrl, {
    method: "GET",
  })
    .then((res) => {
      return res.text();
    })
    .then((text) => {
      let splittedString = text.slice(14, text.length - 1);
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(splittedString);
    })
    .catch(err=>{
      res.status(500).send(err);
    })
});

app.get("/v1/api/photos/search", (req, res) => {
  let { extras = '', perPage = 50 , page = 1, searchQuery = '' } = req.query 
  const formattedUrl = flicker.serchPhotos.replace('{{extras}}',extras).replace('{{perPage}}',perPage).replace('{{page}}',page).replace('{{searchQuery}}',searchQuery);
  fetch(formattedUrl, {
    method: "GET",
  })
    .then((res) => {
      return res.text();
    })
    .then((text) => {
      let splittedString = text.slice(14, text.length - 1);
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(splittedString);
    })
    .catch(err=>{
      res.status(500).send(err);
    })
});

app.use(express.static(path.resolve(__dirname, './build'),{
  cacheControl: true
}));
app.get('*',(req,res)=>{
  res.sendFile(path.resolve(__dirname, './build/index.html'))
})

app.listen(PORT, () => {
  console.log("API server is running at ", PORT);
});
