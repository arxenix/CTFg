sortTeams = function(teams) {
    teams.sort(function(a,b) {
        if(a.score>b.score)
            return -1;
        else if(a.score<b.score)
            return 1;
        else {
            //sort based on time of last solve
            var aMaxTime = 0;
            if(a.solves) {
                a.solves.forEach(function(s){
                    aMaxTime = Math.max(aMaxTime,s.time.getTime());
                });
            }

            var bMaxTime = 0;
            if(b.solves) {
                b.solves.forEach(function(s){
                    bMaxTime = Math.max(bMaxTime,s.time.getTime());
                });
            }
            return aMaxTime-bMaxTime;
        }
    });
};

getTimeChartData = function(team) {
    if(!team.solves) return [];
    team.solves.sort(function(a,b) {
        return a.time.getTime() - b.time.getTime();
    });

    data = [[Meteor.settings.public.startTime, 0]];
    var score = 0;
    team.solves.forEach(function(s) {
        score+= s.points;
        data.push([s.time.getTime(), score]);
    });

    var timeNow = Date.now();
    if(Meteor.settings.public.endTime<timeNow) {
        //if competition over
        data.push([Meteor.settings.public.endTime, score]);
    }
    else {
        data.push([timeNow, score]);
    }
    return data;
};

getTimeChart = function(team) {
    var data = getTimeChartData(team);
    return {
        title: {
            text: 'Score Over Time'
        },
        /*subtitle: {
            text: '<b>Team</b>: '+team.name
        },*/
        credits: false,
        xAxis: {
            type: 'datetime',
            /*dateTimeLabelFormats: { // don't display the dummy year
             month: '%e. %b',
             year: '%b'
             },*/
            title: {
                text: 'Time'
            }
        },
        yAxis: {
            title: {
                text: 'Score'
            },
            min: 0,
            allowDecimals: false
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: '{point.x:%e %b. @ %H:%M:%S}: {point.y} points'
        },
        plotOptions: {
            series: {
                step: 'left'
            }
        },
        series: [{
            name: 'Score',
            data: data
        }]
    };
};


getScoreboardChart = function(sortedTeams, amount) {
    var datas = [];
    for(var x = 0;x<amount;x++) {
        if(x<sortedTeams.length)
            datas.push({name: sortedTeams[x].name, data: getTimeChartData(sortedTeams[x]) });
    }
    return {
        title: {
            text: 'Score Over Time'
        },
        subtitle: {
            text: '<b>Top '+amount+' Teams</b>'
        },
        credits: false,
        xAxis: {
            type: 'datetime',
            /*dateTimeLabelFormats: { // don't display the dummy year
             month: '%e. %b',
             year: '%b'
             },*/
            title: {
                text: 'Time'
            }
        },
        yAxis: {
            title: {
                text: 'Score'
            },
            min: 0,
            allowDecimals: false
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: '{point.x:%e %b. @ %H:%M:%S}: {point.y} points'
        },
        plotOptions: {
            series: {
                step: 'left'
            }
        },
        series: datas
    };
};

getProgressChart = function(problems, team) {
    var categories = getCategoryCounts(problems, team);
    var solved = [];
    var unsolved = [];

    _.each(categories, function(cat, c) {
        solved.push(cat.solved);
        unsolved.push(cat.total-cat.solved);
    });

    return {
        chart: {
            type: 'column'
        },
        credits: false,
        title: {
            text: 'Problems Solved'
        },
        xAxis: {
            categories: Object.keys(categories)
        },
        yAxis: {
            min: 0,
            allowDecimals: false,
            title: {
                text: ''
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
            column: {
                stacking: 'normal'
            }
        },
        series: [{
            name: 'Unsolved',
            data: unsolved,
            color: '#222222'
        }, {
            name: 'Solved',
            data: solved,
            //color: '#42BD24',
            dataLabels: {
                enabled: true,
                color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                style: {
                    textShadow: '0 0 3px black'
                }
            }
        }]
    };
};


getCategoryCounts = function(problems, team) {
    var solvedIds = team.getSolvedIds();
    var categories = {};
    problems.forEach(function(prob) {
        if(!(prob.category in categories)) {
            categories[prob.category] = {total: 1, solved: (prob.id in solvedIds)?1:0};
        }
        else {
            categories[prob.category].total++;
            if(prob.id in solvedIds)
                categories[prob.category].solved++;
        }
    });
    return categories;
};