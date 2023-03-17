const axios = require("axios");
const createError = require("http-errors");


exports.search = function (req, res) {
    const searchParam = req.params.search
    const searchType = req.params.type
    const searchLimit = req.params.limit

    const options = {
        method: "GET",
        url: "https://spotify23.p.rapidapi.com/search/",
        params: {
          q: searchParam,
          type: searchType,
          offset: "0",
          limit: searchLimit,
          numberOfTopResults: "5",
        },
        headers: {
          "X-RapidAPI-Key": `${process.env.SPOTIFY_API_KEY}`,
          "X-RapidAPI-Host": `${process.env.SPOTIFY_API_HOST}`,
        },
      };
  
  axios
    .request(options)
    .then(function (response) {
      res.send(response.data)
    })
    .catch(function (error) {
      console.error(error);
    });
};



// const search = axios.get(`${options.url}?q=${req.params.string}&type=multi&offset=0&limit=10&numberOfTopResults=5`).then(data)

//    const songs = axios.get("spotifyapi/${req.params.id}").then(data => {
//     if (data) {
//         res.send(data.data)
//     }
//    }).catch(err => {
//     res.send(500)
//    })
