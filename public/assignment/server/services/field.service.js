var model = require("../models/form.model.js")();

module.exports = function(app) {

    app.post("/api/assignment/form/:formId/field", create);
    app.get("/api/assignment/form/:formId/field", findFieldsByForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", findField);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateField);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteField);

    function create(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        res.json(model.createField(formId, field));
    }

    function findFieldsByForm(req, res) {
        var formId = req.params.formId;
        res.json(model.findAllFieldsForForm(formId));
    }

    function findField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        res.json(model.findFieldById(formId, fieldId));
    }

    function updateField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        res.json(model.updateField(formId, fieldId, field));
    }

    function deleteField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        res.json(model.deleteField(formId, fieldId));
    }
}