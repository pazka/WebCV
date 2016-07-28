var express = require('express');

var app = express();
var path = require('path'); // on demande le module path

app.use(express.static('../client')); // par d�faut il affichera index si il ne connait rien

app.use(function (req, res, next) {

    if(req.method === 'OPTIONS'){
        return res.send(200);
    }
    else{
        next();
    }
});

// cette page sert à l'acc�ès depuis une url brut , accesible � la main comme par un service � distance
app.get('/api/testitems', function(req, res, next){
   return res.json([
       {
           id : 0,
           title : "first item",
           text : "haye"
       },
       {
           id : 1,
           title : "second item",
           text : "yes"
       }
   ]);
});

app.use(function (req, res){
    console.log("didn't find " + req.url);
    res.sendFile(path.resolve('../client/index.html')); // on passe par un path car le ".." est consid�r� comme malicieux
});

app.listen(3000, function(){
    console.log("listening on port 3000...");
});
