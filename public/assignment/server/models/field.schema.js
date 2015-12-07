module.exports = function(mongoose) {
    var FieldSchema = mongoose.Schema({
        _id : {type: String, required: true},
        label : {type: String, required: true},
        fieldType: {type: String, required: true, enum: ["text", "email", "textarea", "radio", "email", "checkbox", "select", "date"]},
        placeholder: {type: String},
        options: [{
            label: {type: String, required: false},
            value: {type: String, required: false}
        }]
    }, {collection: "cs5610.assignment.field"});
    return FieldSchema;
}