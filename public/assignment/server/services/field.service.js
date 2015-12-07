module.exports = function(app, model) {
    app.post("/api/assignment/form/:formId/field", create);
    app.get("/api/assignment/form/:formId/field", findAll);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteField);

    function create(req, res) {
        model
            .createFieldForForm(req.params.formId, req.body)
            .then(function(field) {
                res.json(field);
            });
    }

    function findAll(req, res) {
        model
            .getFieldsForForm(req.params.formId)
            .then(function(fields) {
                res.json(fields);
            });
    }

    function deleteField(req, res) {
        model
            .deleteFieldFromForm(req.params.formId, req.params.fieldId)
            .then(function(field) {
                res.json(field);
            });
    }
};