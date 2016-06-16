/**
 * Created by Ankur on 11/11/2015.
 */

Template.classroom.helpers({
    classes: function() {
        return Classes.find({});
    }
});



/* GLOBAL HELPERS */
Handlebars.registerHelper("timeToDate", function(time) {
    return new Date(time);
});
Handlebars.registerHelper("titleCase", function(str){
    if(str)
        return str.replace("_"," ").replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    else return str;
});

Handlebars.registerHelper("ifCond", function(v1, operator, v2) {
    switch (operator) {
        case '==':
            return (v1 == v2);
        case '===':
            return (v1 === v2);
        case '<':
            return (v1 < v2);
        case '<=':
            return (v1 <= v2);
        case '>':
            return (v1 > v2);
        case '>=':
            return (v1 >= v2);
        case '&&':
            return (v1 && v2);
        case '||':
            return (v1 || v2);
        default:
            return false;
    }
});

Handlebars.registerHelper("math", function(v1, operator, v2) {
    switch (operator) {
        case '+':
            return (v1 + v2);
        case '-':
            return (v1 - v2);
        case '*':
            return (v1 * v2);
        case '/':
            return (v1 / v2);
        case '^':
            return (v1 ^ v2);
        case '%':
            return (v1 % v2);
        default:
            return false;
    }
});