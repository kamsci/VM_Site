var express = require('express');
var app = express();
var ejsLayouts = require('express-ejs-layouts');
var fs = require('fs');
var procfs = require('procfs-stats');
var ps = procfs(process.pid);
var numeral = require('numeral');
var path = '/';

app.set('view engine', 'ejs');

app.use(ejsLayouts);
app.use(express.static(__dirname + '/public/'));
////////////////////////////////////////////////

app.get('/procfs', function(req, res) {
    procfs.meminfo(function(err, data) {
        // if(err) { throw err; };

        console.log("mem: ", data);
        res.render('procfs', { memInfo: data, numeral: numeral });
    });
});

app.get(['/', '/*'], function(req, res) {
    var path = req.url;
    path = path.replace(/%20/, ' ');
    console.log("Path: ", path);
    
    fs.readdir(path, function(err, files){
        // if(err) { throw err; };
        // files.forEach(function(file) {

        // })
        console.log("files: ", files);
        res.render('index', { files: files });
    });
});

////////////////////////////////////////////////
app.listen(4000, function() {
    console.log('App running..');
});