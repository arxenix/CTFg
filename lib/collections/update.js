/**
 * Created by Ankur on 5/23/2016.
 */
Updates = new Mongo.Collection("updates");

UpdateSchema = new SimpleSchema({
    title: {
        type: String,
        label: "Update title",
        optional: true
    },
    description: {
        type: String,
        label: "Update description",
        autoform: {
            afFieldInput: {
                type: "textarea",
                rows: 10
            }
        }
    },
    time: {
        type: Date,
        label: "Update time",
        autoform: {
            afFieldInput: {
                type: "bootstrap-datetimepicker"
            }
        }
    }
});

Updates.attachSchema(UpdateSchema);