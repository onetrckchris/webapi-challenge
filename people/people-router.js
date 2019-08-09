const router = require('express').Router();
const { people, chores } = require('../data');

router.post('/', (req, res) => {
    const person = req.body;

    if(req.body.name) {
        people.push(person);
        res.status(201).json(person);
    } else {
        res.status(400).json({ error: "Please provide a name for the person." });
    }
});

router.get('/', (req, res) => {
    if(people) {
        res.status(200).json(people);
    } else {
        res.status(500).json({ error: "Server error when attempting to GET all people." });
    }
});

module.exports = router;