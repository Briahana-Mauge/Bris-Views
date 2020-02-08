const express = require('express');
const router = express.Router();
const historyQueries = require('../db/queries/history')
const {loginRequired} = require('../auth/helpers');

router.get('/', loginRequired, async (req, res, next) => {
  console.log(req.session)
  try {
    let videos = await historyQueries.getAllVideos(req.body.username)
    res.json({
      payload: videos,
      msg: "Retrieved all videos",
      err: false
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      payload: null,
      msg: "Failed retrieving all videos",
      err: true
    })
  }
});

router.post('/', loginRequired, async (req, res, next) => {
  let videoInfo = {
    username: req.body.username,
    video_id:req.body.video_id
  }
  try {
    let videos = await historyQueries.addNewVideo(videoInfo)
    res.json({
      payload: videos,
      msg: "posted videos",
      err: false
    })
  } catch (err) {
    res.status(500).json({
      payload: null,
      msg: "video not posted",
      err: true
    })
  }
});

module.exports = router;