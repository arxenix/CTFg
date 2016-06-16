process.on('message', function(m) {
    if("ADA LOVELACE"===m.toUpperCase()) {
        process.send({correct: true, message: "Yes!"});
    }
    else {
        process.send({correct: false, message: "Check your history books"});
    }
});