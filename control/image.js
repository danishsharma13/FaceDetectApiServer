import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: '277a3b73e30b49e2a4ebc0eb67fb46cf'
});

export const handleApiCall = (req,res) => {
	app.models.predict('c0c0ac362b03416da06ab3fa36fb58e3', req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json('Api not available'))
	};

const handleImage = (db) => (req,res) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
		})
	.catch(err => res.status(400).json('Unable to get entries'))
	};

	export default handleImage;