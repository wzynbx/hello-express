var express=require('express')
var app=express();

//express.static() 操作静态资源
app.use(express.static('./public'));//app.use()注册中间函数

function middleware1(req,res,next){
    if(req.query.chain){
        req.message='hello from middleware 1\n';
        next();
    }else{
        res.send('halt from middleware 1');
    }
}

function middleware2(req,res,next){
    req.message+='hello from middleware 2\n';
    next();
}

app.get('/',middleware1,middleware2,function(req,res,next){
    res.send(req.message+' middleware 3');
});

app.get('/someurl',function(req,res,next){
    res.send('hello express from someurl [GET]');
});

app.post('/someurl',function(req,res,next){
    res.send('hello express from someurl[POST]');
});

app.listen(3000);
console.log('express server working on port 3000');