const db = require('../db')

const getAllVideos = async (username) => {
	const videos = await db.any("SELECT * FROM history WHERE username = $1", [username])
	return videos;
}

const addNewVideo = async (video) => {
	const newVideoQuery = `
		INSERT INTO history(video_id, username)
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
