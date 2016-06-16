Highcharts.setOptions({
    global : {
        useUTC : false
    }
});

Tracker.autorun(function() {
    var error = Session.get("error");
    if(error) {
        $.notify({
            // options
            icon: 'glyphicon glyphicon-warning-sign',
            title: 'Error: ',
            message: error
            /*url: 'https://github.com/mouse0270/bootstrap-notify',
             target: '_blank'*/
        },{
            // settings
            type: "danger",
            allow_dismiss: true,
            newest_on_top: false,
            placement: {
                from: "top",
                align: "center"
            },
            delay: 3000,
            mouse_over: 'pause'
        });
        Session.set("error","");
    }
});

Tracker.autorun(function() {
    var success = Session.get("success");
    if(success) {
        $.notify({
            // options
            icon: 'glyphicon glyphicon-check',
            title: 'Success: ',
            message: success
            /*url: 'https://github.com/mouse0270/bootstrap-notify',
             target: '_blank'*/
        },{
            // settings
            type: "success",
            allow_dismiss: true,
            newest_on_top: false,
            placement: {
                from: "top",
                align: "center"
            },
            delay: 3000,
            mouse_over: 'pause'
        });
        Session.set("success","");
    }
});

Tracker.autorun(function() {
    var warning = Session.get("warning");
    if(warning) {
        $.notify({
            // options
            icon: 'glyphicon glyphicon-remove',
            /*title: 'Success: ',*/
            message: warning
            /*url: 'https://github.com/mouse0270/bootstrap-notify',
             target: '_blank'*/
        },{
            // settings
            type: "warning",
            allow_dismiss: true,
            newest_on_top: false,
            placement: {
                from: "top",
                align: "center"
            },
            delay: 3000,
            mouse_over: 'pause'
        });
        Session.set("warning","");
    }
});