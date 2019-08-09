let people = [
    {
        id: 1,
        name: "Chris"
    },
    {
        id: 2,
        name: "Brandon"
    },
    {
        id: 3,
        name: "Adrian"
    },
    {
        id: 4,
        name: "Kindel"
    },
    {
        id: 5,
        name: "Jesse"
    }
]

let chores = [
    {
        id: 1,
        description: "Take out the trash",
        notes: "Only do it if they're full",
        assignedTo: 1,
        completed: true
    },
    {
        id: 2,
        description: "Get oil change",
        assignedTo: 1,
        completed: false
    },
    {
        id: 3,
        description: "Clean up the house",
        notes: "Make sure to do it well",
        assignedTo: 2,
        completed: false
    }
]

module.exports = {
    people: people,
    chores: chores
}