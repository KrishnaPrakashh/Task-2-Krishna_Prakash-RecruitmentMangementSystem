const express = require("express");
const router = express.Router();

const applications = require("../data/application");


// Apply for Job
router.post("/apply", (req, res) => {

    const { name, email, position, about } = req.body;

    if (!name || !email || !position) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const application = {
        id: applications.length + 1,
        name,
        email,
        position,
        about,
        status: "Applied"
    };

    applications.push(application);

    res.status(201).json({
        message: "Application submitted",
        application
    });

});


// Get All Applications
router.get("/applications", (req, res) => {

    res.json(applications);

});


// Check Applicant Status
router.get("/application-status/:email", (req, res) => {

    const email = req.params.email;

    const application = applications.find(
        app => app.email === email
    );

    if (!application) {
        return res.status(404).json({
            message: "Application not found"
        });
    }

    res.json(application);

});


// Update Application Status
router.put("/applications/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const { status } = req.body;

    const application = applications.find(
        app => app.id === id
    );

    if (!application) {
        return res.status(404).json({
            message: "Application not found"
        });
    }

    application.status = status;

    res.json({
        message: "Status updated",
        application
    });

});


module.exports = router;