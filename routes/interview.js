const express = require("express");
const router = express.Router();

const interviews = require("../data/interviews");


// POST /interviews
router.post("/interviews", (req, res) => {

    const {
        candidateId,
        date,
        time,
        interviewer
    } = req.body;

    const interview = {
        id: interviews.length + 1,
        candidateId,
        date,
        time,
        interviewer,
        status: "Scheduled"
    };

    interviews.push(interview);

    res.status(201).json({
        message: "Interview scheduled",
        interview
    });

});


// GET /interviews
router.get("/interviews", (req, res) => {

    res.json(interviews);

});

router.get("/interviews/:candidateId", (req, res) => {
    const candidateId = parseInt(req.params.candidateId);

    const candidateInterviews = interviews.filter(
        i => parseInt(i.candidateId) === candidateId
    );

    if (candidateInterviews.length === 0) {
        return res.status(404).json({
            message: "No interviews found for this candidate"
        });
    }

    const response = candidateInterviews.map(i => ({
        id: i.id,
        interviewer: i.interviewer,
        status: i.status,

        // 👇 THIS is what candidate needs to see
        date: i.date,
        time: i.time,

        // optional UI helper
        schedule: `${i.date} at ${i.time}`
    }));

    res.json({
        candidateId,
        interviews: response
    });
});



module.exports = router;