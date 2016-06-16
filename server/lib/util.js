/**
 * Created by Ankur on 5/23/2016.
 */
getSolvedIds = function(team) {
    var solvedIds = [];
    if(team.solves) {
        team.solves.forEach(function(prob) {
            solvedIds.push(prob.id);
        });
    }
    //console.log(solvedIds);
    return solvedIds;
};