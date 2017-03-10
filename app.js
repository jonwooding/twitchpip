var express = require('express');
var body_parser = require('body-parser');
var path = require('path');

var app = express();

// TODO: Are we using this?
app.use(body_parser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, function() {
	console.log('listening on 3000');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
});

module.exports = app;
exports = app;