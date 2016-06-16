/**
 * Created by Ankur on 5/23/2016.
 */

Template.updates.helpers({
    updates: function() {
        return Updates.find({}, {sort: {time:-1}});
    }
});