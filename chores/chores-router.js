const router = require('express').Router();
const { people, chores } = require('../data');

const personExists = (req, res, next) => {
    const id = req.params.id;
    let exists = people.some(person => person['id'] == id);

    if(exists) {
        next();
    } else {
        res.status(404).json({ error: "Person with that ID does not exist." });
    }
}

const choreExists = (req, res, next) => {
    const id = req.params.id;
    let exists = chores.some(chore => chore['id'] == id);

    if(exists) {
        next();
    } else {
        res.status(404).json({ error: "Chore with that ID does not exist." });
    }
}

let idNumber = 4;

router.post('/', (req, res) => {
    const chore = req.body;

    if(chore.description && chore.assignedTo) {
        let newChore = {
            id: idNumber,
            description: chore.description,
            assignedTo: chore.assignedTo,
            notes: chore.notes,
            completed: chore.completed || false
        }

        idNumber++;

        chores.push(newChore);
        res.status(201).json(newChore);
    } else {
        res.status(400).json({ error: "Please provide a description and assignedTo for the chore." });
    }
});

router.get('/', (req, res) => {
    const completed = req.query.completed;


    if(!completed) {
        res.status(200).json(chores);
    } else {
        let newChores = chores.filter(chore => chore.completed === JSON.parse(completed))
        newChores.length ? 
            res.status(200).json(newChores) :
            res.status(500).json({ error: "Server error when attempting to GET all chores." })
    }
});

router.get('/:id', personExists, (req, res) => {
    const id = req.params.id;

    res.status(200).json(chores.filter(chore => chore.assignedTo == id));
});

router.put('/chore/:id', choreExists, (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    let exists = chores.some(chore => chore['id'] == id);

    if(changes.description && changes.assignedTo) {
        const changingObject = chores.find(chore => chore.id == id);
        Object.assign(changingObject, changes);
        res.status(202).json(changes)
    } else {
        res.status(400).json({ error: "Please provide description and assignedTo for the chore." })
    }
});

router.delete('/chore/:id', (req, res) => {
    const id = req.params.id;
    let exists = chores.some(chore => chore['id'] == id);

    if(exists) {
        for(let i = 0; i < chores.length; i++) {
            if(chores[i].id == id) {
                chores.splice(i, 1);
            } else {
                continue;
            }
        }

        res.status(202).json({ message: "Successfully deleted chore!" });
    } else {
        res.status(404).json({ erro: "Chore with that ID does not exist." });
    }
})

module.exports = router;