
const express = require('express');
const app = express();

// importing files for setup of ejs
const path = require('path');
app.set('view engine','ejs');
app.use(express.static((__dirname, 'public')));

// for perform curd operation on file using node file system
const fs = require('fs');

// to parse from data
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.get('/',(req, res)=>{
    fs.readdir('./files',(err, files)=>{
        res.render('index',{files : files})
    })
})

app.get('/files/:filename',(req, res)=>{
    fs.readFile(`./files/${req.params.filename}`, "utf-8" ,(err, filedata)=>{
        res.render('show', {filename: req.params.filename, filedata: filedata})
    })
})

app.get('/edit/:filename',(req, res)=>{
    res.render('edit',{filename : req.params.filename})
})

app.post('/edit',(req, res)=>{
    fs.rename(`./files/${req.body.prev}`,`./files/${req.body.new}`,(err)=>{
        res.redirect('/')
    })
    console.log(req.body)
})

app.post('/create',(req, res)=>{
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details, (err)=>{
        res.redirect('/');
    })
})


app.listen(3000,()=>{
    console.log('server started at port 3000..')
});