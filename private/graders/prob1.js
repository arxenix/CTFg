process.on('message', function(m) {
    if("ANSWER"===m.toUpperCase()) {
        process.send({correct: true, message: "Nice job!"});
    }
    else {
        process.send({correct: false, message: "Sorry. Nope"});
    }
});