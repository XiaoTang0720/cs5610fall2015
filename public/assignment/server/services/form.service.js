module.exports = function(app, model) {

    app.post("/api/assignment/user/:userId/form", create);
    app.get("/api/assignment/user/:userId/form", findAll);
    app.get("/api/assignment/form/:formId", findById);
    app.get("/api/assignment/form", findByTitle);
    app.put("/api/assignment/form/:formId", updateForm);
    app.delete("/api/assignment/form/:formId", deleteForm);

    function create(req, res) {
        model
            .createForm(req.body)
            .then(function(form) {
                res.json(form);
            });
    }

    function findAll(req, res) {
        var uid = req.params.userId;
        model
            .findAllFormsForUser(uid)
            .then(function(forms) {
                res.json(forms);
            });
    }

    function findById(req, res) {
        var formId = req.params.formId;
        model
            .findFormById(formId)
            .then(function(form) {
                res.json(form);
            });
    }

    function findByTitle(req, res) {
        var title = req.query.title;
        model
            .findFormByTitle(title)
            .then(function(form) {
                res.json(form);
            });
    }

    function updateForm(req, res) {
        var formId = req.params.formId;
        var form = req.body;
        model
            .updateForm(formId, form)
            .then(function(form) {
                res.json(form);
            });
    }

    function deleteForm(req, res) {
        var formId = req.params.formId;
        model
            .deleteForm(formId)
            .then(function(form) {
                res.json(form);
            });
    }
};