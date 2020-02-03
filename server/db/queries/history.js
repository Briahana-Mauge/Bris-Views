const db = require('../db')

const getAllVideos = async () => {
	const videos = await db.any("SELECT * FROM history WHERE username = $1", [username])
	return videos;
}

const addVideo = async (video) => {
	const newVideoQuery = `
		INSERT INTO users(video_id, username)
			VALUES($/video_id/, $/username/)
			RETURNING video_id, username
	`
	const newVideo = await db.one(newVideoQuery, video)
	return newVideo;
}


module.exports = {
	getAllVideos,
	addNewVideo
}
