var express = require('express');
var app = express();
var lorem = require('lorem-ipsum');
var Post = function () {
	this.head = lorem({
		sentenceUpperBound: 5
	});
	this.body = lorem({
		sentenceLowerBound: 20,
		sentenceUpperBound: 50
	});
}
var posts = {
	first: new Post,
	second: new Post,
	third: new Post
}
app.use(express.static(__dirname));
app.get('/api/lorem/:id', function(req, res) {
	var id = req.params.id;
	var post = posts[id];
	if (!post) {
		res.status(404).send({
			error: "wrong request"
		})
		return;
	}
	setTimeout(function () {
		res.status(200).json({
			data: post
		})
	}, 3000);
	
});
app.get('/', function (req, res) {
	res.sendfile(__dirname + '/index.html');
})
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});