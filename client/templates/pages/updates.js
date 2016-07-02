Template.updates.helpers({
    updates: function() {
        return Updates.find({}, {sort: {time:-1}});
    }
});