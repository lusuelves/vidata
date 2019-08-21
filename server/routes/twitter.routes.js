const express = require('express')
const router = express.Router()
require("dotenv").config()
var Twitter = require('twitter')
const fetch = require('node-fetch')
 
var client = new Twitter({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  // access_token_key: process.env.access_token_key,
  // access_token_secret: process.env.access_token_secret
  bearer_token: process.env.bearer_token
})

router.get('/search/tweets', (req, res) => {
    // client.get('tweets/search/fullarchive/vidata.json', {query: '@donaldtrump has:mentions'})
    // .then(tweets => console.log(tweets))
    // .catch(err=> console.log(err))
    // })
    client.get('trends/available.json', {})
    .then(x => console.log(x)) })
    // client.get('trends/place.json', {id: '1'})
    // .then(tweets => {
    //   tweets[0].trends.forEach(elm => console.log(elm.name))
    //   console.log(tweets[0].locations)
    // })
    // .catch(err=> console.log(err))
    // })

  //   client.get('search/tweets', {q: '#ios #swift'}, function(error, tweets, response) {
  //     tweets.statuses.forEach(function(tweet) {
  //       console.log("tweet: " + tweet.text)
  //     });
  //  });
  // })    
    //  client.get('search/fullarchive/vidata.json?query=@donaldtrump has:mentions', {q: 'trump'})
    //  .then(function(tweets){
    //      let array = []
    //      tweets.statuses.forEach(tweet => {     
    //      array.push(tweet.text)})
    //      console.log(array)
    // return array
    //  })
    // .then(response => console.log(response))
    // .catch(err => console.log(err))

   
// fetch(`https://api.twitter.com/1.1/tweets/search/fullarchive/vidata.json/query=@donaldtrump has:mentions`, {
//          headers: 
//          {
//             'Authorization': `Token ${process.env.bearer_token}`,
//             'content-type': 'application/json'
           
//          }
// }).then(response => console.log(response))

// .then(response => console.log(response)).catch(err => console.log(err))
// })
    


module.exports = router