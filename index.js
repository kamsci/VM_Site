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

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/files/*', function(req, res) {

    fs.readdir(path, function(err, files){
        // if(err) { throw err; };

        console.log("files: ", files);
        res.render('files', { files: files });
    });
});

// app.get('/files-tree/:path', function(req, res) {
//     path += req.params.path + '/';
//     console.log('Path: ', req.params.path);
//     // res.redirect('files');
//     res.send(path);
// });

app.get('/procfs', function(req, res) {
    procfs.meminfo(function(err, data) {
        // if(err) { throw err; };

        console.log("mem: ", data);
        res.render('procfs', { memInfo: data, numeral: numeral });
    })
})

////////////////////////////////////////////////
app.listen(4000, function() {
    console.log('App running..');
});