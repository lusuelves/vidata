require("dotenv").config()
const express = require('express')
const router = express.Router()
var Twitter = require('twitter')
 
const Project = require('../models/Project.model')
const ProjectTrends = require('../models/ProjectTrends.model')
const ProjectWords = require('../models/ProjectWords.model')

var client = new Twitter({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  // access_token_key: process.env.access_token_key,
  // access_token_secret: process.env.access_token_secret
  bearer_token: process.env.bearer_token
})

router.get('/getAllProjects', (req, res) => {
    ProjectTrends.find()
        .then(allProjects => res.json(allProjects))
        .catch(err => console.log('Error', err))
})

router.get('/getOneProject/:id', (req, res) => {
    ProjectTrends.findById(req.params.id)
        .then(theProject => res.json(theProject))
        .catch(err => console.log('Error', err))
})

router.post('/postProject', (req, res) => {
    Project.create(req.body)
        .then(theNewProject => {
            console.log(theNewProject)
            res.json(theNewProject)})
        .catch(err => console.log('Error', err))
})

router.post('/postProject/Trends', (req, res) => {
    ProjectTrends.create(req.body)
        // .then(theNewProject => res.json(theNewProject))
        .then(x => client.get('trends/available.json', {}))
            .then(x => { let result = ''
            x.find(elm => {if(elm.name === req.body.place) return result = elm.woeid})
            return result
        })
            .then(x => {
                console.log('hola')
                console.log(x)
                client.get('trends/place.json', {id: x})
                .then(tweets => {
                    let results = []
                    tweets[0].trends.forEach(elm => {
                        elm = [elm.name, elm.tweet_volume]
                        results.push(elm)
                    })
                    ProjectTrends.findOneAndUpdate({title: req.body.title}, {$set: {trendsArray: results }}, {new:true})
                    .then(x=>{
                         res.json(x)
                    }).catch(err => console.log(err))
                  //console.log(tweets[0].locations)
            })})
        .catch(err => console.log('Error', err))
})

router.post('/updatePost/Trends', (req,res)=>{
    ProjectTrends.findOneAndUpdate({title: req.body.title}, {$set: {trendsArray: req.body.trendsArray }}, {new:true})
                    .then(x=>{
                        console.log('hola' + x)
                         res.json(x)
                    })
})

router.post('/postProject/Words', (req, res) => {
    console.log(req.body)
    let cosa
    ProjectWords.create(req.body)
        .then((data)=> {
            cosa = data
            return client.get('tweets/search/30day/develompment.json', {query: req.body.word})})
            // return {results: [{
            //     created_at: 'Fri Aug 23 08:02:22 +0000 2019',
            //     id: 1164810094485237800,
            //     id_str: '1164810094485237765',
            //     text: 'RT @RuanoFaxas: @larepublica_pe #ANALFABETISMO, COMO #TRUMP\n' +
            //       '¿#Bolsonaro burlándose de médicos #cubanos: “Si fueran buenos,habrían salvado a…',
            //     source: '<a href="http://www.unitss.cat" rel="nofollow">bot_deporte</a>',
            //     truncated: false,
            //     in_reply_to_status_id: null,
            //     in_reply_to_status_id_str: null,
            //     in_reply_to_user_id: null,
            //     in_reply_to_user_id_str: null,
            //     in_reply_to_screen_name: null,
            //     user: [Object],
            //     geo: null,
            //     coordinates: null,
            //     place: 'Madrid',
            //     contributors: null,
            //     retweeted_status: [Object],
            //     quoted_status_id: 1159802116736716800,
            //     quoted_status_id_str: '1159802116736716800',
            //     quoted_status: [Object],
            //     quoted_status_permalink: [Object],
            //     is_quote_status: true,
            //     quote_count: 0,
            //     reply_count: 0,
            //     retweet_count: 0,
            //     favorite_count: 0,
            //     entities: [Object],
            //     favorited: false,
            //     retweeted: false,
            //     filter_level: 'low',
            //     lang: 'es',
            //     matching_rules: [Array]
            //   },
            //   {
            //     created_at: 'Fri Aug 23 08:02:22 +0000 2019',
            //     id: 1164810093981925400,
            //     id_str: '1164810093981925377',
            //     text: 'Donald Trump says he is the second coming of God, but his mother was no Mary.',
            //     source: '<a href="https://mobile.twitter.com" rel="nofollow">Twitter Web App</a>',
            //     truncated: false,
            //     in_reply_to_status_id: null,
            //     in_reply_to_status_id_str: null,
            //     in_reply_to_user_id: null,
            //     in_reply_to_user_id_str: null,
            //     in_reply_to_screen_name: null,
            //     user: [Object],
            //     geo: null,
            //     coordinates: null,
            //     place: 'Paris',
            //     contributors: null,
            //     is_quote_status: false,
            //     quote_count: 0,
            //     reply_count: 0,
            //     retweet_count: 0,
            //     favorite_count: 0,
            //     entities: [Object],
            //     favorited: false,
            //     retweeted: false,
            //     filter_level: 'low',
            //     lang: 'en',
            //     matching_rules: [Array]
            //   },
            //   {
            //     created_at: 'Fri Aug 23 08:02:22 +0000 2019',
            //     id: 1164810093746987000,
            //     id_str: '1164810093746987008',
            //     text: 'RT @CaitlinPacific: “I did not meet one Biden voter who was in any way, shape or form excited about voting for Biden.” https://t.co/YL5U1ss…',
            //     source: '<a href="http://twitter.com/download/iphone" rel="nofollow">Twitter for iPhone</a>',
            //     truncated: false,
            //     in_reply_to_status_id: null,
            //     in_reply_to_status_id_str: null,
            //     in_reply_to_user_id: null,
            //     in_reply_to_user_id_str: null,
            //     in_reply_to_screen_name: null,
            //     user: [Object],
            //     geo: null,
            //     coordinates: null,
            //     place: 'London',
            //     contributors: null,
            //     retweeted_status: [Object],
            //     is_quote_status: false,
            //     quote_count: 0,
            //     reply_count: 0,
            //     retweet_count: 0,
            //     favorite_count: 0,
            //     entities: [Object],
            //     favorited: false,
            //     retweeted: false,
            //     filter_level: 'low',
            //     lang: 'en',
            //     matching_rules: [Array]
            //   },
            //   {
            //     created_at: 'Fri Aug 23 08:02:22 +0000 2019',
            //     id: 1164810093457576000,
            //     id_str: '1164810093457575937',
            //     text: 'RT @Porterhouse75: California, New York, Maryland, Illinois, Oregon, and Washington.  You may hate Donald Trump and you may hate Republican…',
            //     source: '<a href="http://twitter.com/download/android" rel="nofollow">Twitter for Android</a>',
            //     truncated: false,
            //     in_reply_to_status_id: null,
            //     in_reply_to_status_id_str: null,
            //     in_reply_to_user_id: null,
            //     in_reply_to_user_id_str: null,
            //     in_reply_to_screen_name: null,
            //     user: [Object],
            //     geo: null,
            //     coordinates: null,
            //     place: 'Berlin',
            //     contributors: null,
            //     retweeted_status: [Object],
            //     is_quote_status: false,
            //     quote_count: 0,
            //     reply_count: 0,
            //     retweet_count: 0,
            //     favorite_count: 0,
            //     entities: [Object],
            //     favorited: false,
            //     retweeted: false,
            //     filter_level: 'low',
            //     lang: 'en',
            //     matching_rules: [Array]
            //   },
            //   {
            //     created_at: 'Fri Aug 23 08:02:22 +0000 2019',
            //     id: 1164810093394706400,
            //     id_str: '1164810093394706434',
            //     text: "Apparently it wasn't Trump who chickened out, but the UAE and Saudi Arabia, who feared an Iranian response.\n" +
            //       '\n' +
            //       'What h… https://t.co/nzCSeLqeeP',
            //     display_text_range: [Array],
            //     source: '<a href="http://twitter.com/download/android" rel="nofollow">Twitter for Android</a>',
            //     truncated: true,
            //     in_reply_to_status_id: null,
            //     in_reply_to_status_id_str: null,
            //     in_reply_to_user_id: null,
            //     in_reply_to_user_id_str: null,
            //     in_reply_to_screen_name: null,
            //     user: [Object],
            //     geo: null,
            //     coordinates: null,
            //     place: 'New York',
            //     contributors: null,
            //     quoted_status_id: 1164664730939736000,
            //     quoted_status_id_str: '1164664730939736064',
            //     quoted_status: [Object],
            //     quoted_status_permalink: [Object],
            //     is_quote_status: true,
            //     extended_tweet: [Object],
            //     quote_count: 0,
            //     reply_count: 1,
            //     retweet_count: 0,
            //     favorite_count: 0,
            //     entities: [Object],
            //     favorited: false,
            //     retweeted: false,
            //     possibly_sensitive: false,
            //     filter_level: 'low',
            //     lang: 'en',
            //     matching_rules: [Array]
            //   },
            //   {
            //     created_at: 'Fri Aug 23 08:02:21 +0000 2019',
            //     id: 1164810092203499500,
            //     id_str: '1164810092203499521',
            //     text: "A psychologist just revealed the horrifying truth about Trump's malignant narcissism https://t.co/9AMveCmhwF",
            //     source: '<a href="http://twitter.com" rel="nofollow">Twitter Web Client</a>',
            //     truncated: false,
            //     in_reply_to_status_id: null,
            //     in_reply_to_status_id_str: null,
            //     in_reply_to_user_id: null,
            //     in_reply_to_user_id_str: null,
            //     in_reply_to_screen_name: null,
            //     user: [Object],
            //     geo: null,
            //     coordinates: null,
            //     place: 'Barcelona',
            //     contributors: null,
            //     is_quote_status: false,
            //     quote_count: 0,
            //     reply_count: 0,
            //     retweet_count: 0,
            //     favorite_count: 0,
            //     entities: [Object],
            //     favorited: false,
            //     retweeted: false,
            //     possibly_sensitive: false,
            //     filter_level: 'low',
            //     lang: 'en',
            //     matching_rules: [Array]
            //   },
            //   {
            //     created_at: 'Fri Aug 23 08:02:21 +0000 2019',
            //     id: 1164810091238789000,
            //     id_str: '1164810091238789120',
            //     text: "@JeremyLevine92 Of course they were, that was Butina's job, to sleep with as many REPUBLICANS as she could. Just lo… https://t.co/PGCoNxrEK2",
            //     display_text_range: [Array],
            //     source: '<a href="http://twitter.com/download/android" rel="nofollow">Twitter for Android</a>',
            //     truncated: true,
            //     in_reply_to_status_id: 1164746931656175600,
            //     in_reply_to_status_id_str: '1164746931656175616',
            //     in_reply_to_user_id: 935107884089860100,
            //     in_reply_to_user_id_str: '935107884089860096',
            //     in_reply_to_screen_name: 'JeremyLevine92',
            //     user: [Object],
            //     geo: null,
            //     coordinates: null,
            //     place: 'Moscow',
            //     contributors: null,
            //     is_quote_status: false,
            //     extended_tweet: [Object],
            //     quote_count: 0,
            //     reply_count: 0,
            //     retweet_count: 0,
            //     favorite_count: 0,
            //     entities: [Object],
            //     favorited: false,
            //     retweeted: false,
            //     filter_level: 'low',
            //     lang: 'en',
            //     matching_rules: [Array]
            //   },
            //   {
            //     created_at: 'Fri Aug 23 08:02:21 +0000 2019',
            //     id: 1164810091238789000,
            //     id_str: '1164810091238789120',
            //     text: "@JeremyLevine92 Of course they were, that was Butina's job, to sleep with as many REPUBLICANS as she could. Just lo… https://t.co/PGCoNxrEK2",
            //     display_text_range: [Array],
            //     source: '<a href="http://twitter.com/download/android" rel="nofollow">Twitter for Android</a>',
            //     truncated: true,
            //     in_reply_to_status_id: 1164746931656175600,
            //     in_reply_to_status_id_str: '1164746931656175616',
            //     in_reply_to_user_id: 935107884089860100,
            //     in_reply_to_user_id_str: '935107884089860096',
            //     in_reply_to_screen_name: 'JeremyLevine92',
            //     user: [Object],
            //     geo: null,
            //     coordinates: null,
            //     place: 'Athens',
            //     contributors: null,
            //     is_quote_status: false,
            //     extended_tweet: [Object],
            //     quote_count: 0,
            //     reply_count: 0,
            //     retweet_count: 0,
            //     favorite_count: 0,
            //     entities: [Object],
            //     favorited: false,
            //     retweeted: false,
            //     filter_level: 'low',
            //     lang: 'en',
            //     matching_rules: [Array]
            //   },
            //   {
            //     created_at: 'Fri Aug 23 08:02:21 +0000 2019',
            //     id: 1164810091012341800,
            //     id_str: '1164810091012341761',
            //     text: "RT @SethAbramson: @ChrisCuomo VIDEO5/ In other words, Byrne's saying the FBI was *so focused on Clinton* and so focused on *doing their job…",
            //     source: '<a href="http://twitter.com/#!/download/ipad" rel="nofollow">Twitter for iPad</a>',
            //     truncated: false,
            //     in_reply_to_status_id: null,
            //     in_reply_to_status_id_str: null,
            //     in_reply_to_user_id: null,
            //     in_reply_to_user_id_str: null,
            //     in_reply_to_screen_name: null,
            //     user: [Object],
            //     geo: null,
            //     coordinates: null,
            //     place: 'Rome',
            //     contributors: null,
            //     retweeted_status: [Object],
            //     is_quote_status: false,
            //     quote_count: 0,
            //     reply_count: 0,
            //     retweet_count: 0,
            //     favorite_count: 0,
            //     entities: [Object],
            //     favorited: false,
            //     retweeted: false,
            //     filter_level: 'low',
            //     lang: 'en',
            //     matching_rules: [Array]
            //   },
            //   {
            //     created_at: 'Fri Aug 23 08:02:21 +0000 2019',
            //     id: 1164810089879888000,
            //     id_str: '1164810089879887872',
            //     text: 'RT @TrumpWarRoom: Democrat John Delaney: "It feels like some Democrats are cheering on a recession because they want to stick it to Trump."…',
            //     source: '<a href="http://twitter.com/#!/download/ipad" rel="nofollow">Twitter for iPad</a>',
            //     truncated: false,
            //     in_reply_to_status_id: null,
            //     in_reply_to_status_id_str: null,
            //     in_reply_to_user_id: null,
            //     in_reply_to_user_id_str: null,
            //     in_reply_to_screen_name: null,
            //     user: [Object],
            //     geo: null,
            //     coordinates: null,
            //     place: 'Sevilla',
            //     contributors: null,
            //     retweeted_status: [Object],
            //     is_quote_status: false,
            //     quote_count: 0,
            //     reply_count: 0,
            //     retweet_count: 0,
            //     favorite_count: 0,
            //     entities: [Object],
            //     favorited: false,
            //     retweeted: false,
            //     filter_level: 'low',
            //     lang: 'en',
            //     matching_rules: [Array]
            //   },
            //   {
            //     created_at: 'Fri Aug 23 08:02:21 +0000 2019',
            //     id: 1164810089728884700,
            //     id_str: '1164810089728884736',
            //     text: '@Rtwingprivilege https://t.co/4FvSsAVBzr',
            //     display_text_range: [Array],
            //     source: '<a href="http://twitter.com/download/iphone" rel="nofollow">Twitter for iPhone</a>',
            //     truncated: false,
            //     in_reply_to_status_id: 1164661946928521200,
            //     in_reply_to_status_id_str: '1164661946928521216',
            //     in_reply_to_user_id: 1164349620417441800,
            //     in_reply_to_user_id_str: '1164349620417441793',
            //     in_reply_to_screen_name: 'Rtwingprivilege',
            //     user: [Object],
            //     geo: null,
            //     coordinates: null,
            //     place: 'Amsterdam',
            //     contributors: null,
            //     is_quote_status: false,
            //     quote_count: 0,
            //     reply_count: 0,
            //     retweet_count: 0,
            //     favorite_count: 0,
            //     entities: [Object],
            //     favorited: false,
            //     retweeted: false,
            //     possibly_sensitive: false,
            //     filter_level: 'low',
            //     lang: 'und',
            //     matching_rules: [Array]
            //   }
            // ]}
        //})
        .then(tweets => {
            console.log(tweets)
            let texts = []
            let places = []
            let likes = []
            let retweets = []
            tweets.results.forEach((elm)=> {
                texts.push(elm.text)
                places.push(elm.user.location)
                // places.push(elm.place)
                likes.push(elm.favorite_count)
                retweets.push(elm.retweeted_count)
            })
            ProjectWords.findByIdAndUpdate(cosa._id, {$set: {textsArray: texts, placesArray: places, likesArray: likes, retweetsArray: retweets }}, {new:true})
                .then(resulon => {
                    console.log(resulon)
                    res.json(resulon)
                })
                
        })
        .catch(err => console.log('Error', err))
})

module.exports = router