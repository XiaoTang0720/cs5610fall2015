var model = require("../models/form.model.js")();

module.exports = function(app) {

    app.post("/api/assignment/user/:userId/form", create);
    app.get("/api/assignment/user/:userId/form", findAll);
    app.get("/api/assignment/form/:formId", findById);
    app.get("/api/assignment/form", findByTitle);
    app.put("/api/assignment/form/:formId", updateForm);
    app.delete("/api/assignment/form/:formId", deleteForm);

    function create(req, res) {
        var uid = req.params.userId;
        var form = req.body;
        res.json(model.createForm(uid, form));
    }

    function findAll(req, res) {
        var uid = req.params.userId;
        res.json(model.findAllFormsForUser(uid));
    }

    function findById(req, res) {
        var formId = req.params.formId;
        res.json(model.findFormById(formId));
    }

    function findByTitle(req, res) {
        var title = req.query.title;
        res.json(model.findFormByTitle(title));
    }

    function updateForm(req, res) {
        var formId = req.params.formId;
        var form = req.body;
        res.json(model.updateForm(formId, form));
    }

    function deleteForm(req, res) {
        var formId = req.params.formId;
        res.json(model.deleteForm(formId));
    }
};