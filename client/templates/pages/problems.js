/**
 * Created by Ankur on 5/24/2016.
 */
Template.problems.helpers({
    problems() {
        //return Problems.find({type: "short_answer"}, {sort: {id: 1}});
        return Problems.find({}, {sort: {id: 1}});
    }
});

Template.problems.onRendered(function(){
    jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/bootbox.js/4.4.0/bootbox.min.js', function(data, textStatus, jqxhr) {
        console.log("Bootbox.js loaded");
    });
});