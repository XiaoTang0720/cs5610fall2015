module.exports = function(mongoose) {
    var FieldSchema = require("./field.schema.js")(mongoose);
    var FormSchema = mongoose.Schema({
        title: {type: String, required: true},
        userId: {type: String, required: true},
        fields: {type: [FieldSchema], default: []}
    }, {collection: "cs5610.assignment.form"});
    return FormSchema;
}