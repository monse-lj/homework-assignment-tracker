export class AssignmentService {
    constructor(repository) {
        this.repository = repository;
    }

    getAssignments() {
        return this.repository.load().map((assignment, index) => ({
            ...assignment,
            id: assignment.id || `assignment-${index}`,
            completed: Boolean(assignment.completed)
        }));
    }

    addAssignment(name, course, dueDate) {
        const cleanName = name.trim();
        const cleanCourse = course.trim();

        if (!cleanName || !cleanCourse || !dueDate) {
            throw new Error("Please enter an assignment name, course name, and due date.");
        }

        const assignments = this.getAssignments();
        const assignment = {
            id: `assignment-${Date.now()}-${assignments.length}`,
            name: cleanName,
            course: cleanCourse,
            dueDate,
            completed: false
        };

        assignments.push(assignment);
        this.repository.save(assignments);
        return assignment;
    }

    toggleCompleted(id) {
        const assignments = this.getAssignments();
        const assignment = assignments.find((item) => item.id === id);

        if (!assignment) {
            throw new Error("Assignment not found.");
        }

        assignment.completed = !assignment.completed;
        this.repository.save(assignments);
        return assignment;
    }
}
