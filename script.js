import { AssignmentService } from "./assignment-service.js";
import { LocalStorageRepository } from "./storage.js";

const assignmentForm = document.getElementById("assignment-form");
const assignmentNameInput = document.getElementById("assignment-name");
const courseNameInput = document.getElementById("course-name");
const dueDateInput = document.getElementById("due-date");
const errorMessage = document.getElementById("error-message");
const assignmentList = document.getElementById("assignment-list");
const emptyMessage = document.getElementById("empty-message");

const repository = new LocalStorageRepository(window.localStorage);
const assignmentService = new AssignmentService(repository);

function formatDate(dateString) {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day).toLocaleDateString();
}

function displayAssignments() {
    const assignments = assignmentService.getAssignments();
    assignmentList.innerHTML = "";
    emptyMessage.style.display = assignments.length === 0 ? "block" : "none";

    assignments.forEach((assignment) => {
        const listItem = document.createElement("li");
        listItem.className = `assignment-card${assignment.completed ? " completed" : ""}`;

        const details = document.createElement("div");
        details.className = "assignment-details";

        const assignmentTitle = document.createElement("h3");
        assignmentTitle.textContent = assignment.name;

        const courseText = document.createElement("p");
        courseText.textContent = `Course: ${assignment.course}`;

        const dueDateText = document.createElement("p");
        dueDateText.textContent = `Due: ${formatDate(assignment.dueDate)}`;

        const statusText = document.createElement("p");
        statusText.className = "status-text";
        statusText.textContent = assignment.completed ? "Status: Completed" : "Status: Pending";

        const completeButton = document.createElement("button");
        completeButton.type = "button";
        completeButton.className = "complete-button";
        completeButton.textContent = assignment.completed ? "Mark Pending" : "Mark Complete";
        completeButton.addEventListener("click", () => {
            assignmentService.toggleCompleted(assignment.id);
            displayAssignments();
        });

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            const confirmed = window.confirm(`Delete "${assignment.name}"?`);
            if (confirmed) {
                assignmentService.deleteAssignment(assignment.id);
                displayAssignments();
            }
        });

        const actions = document.createElement("div");
        actions.className = "assignment-actions";
        actions.append(completeButton, deleteButton);

        details.append(assignmentTitle, courseText, dueDateText, statusText);
        listItem.append(details, actions);
        assignmentList.appendChild(listItem);
    });
}

assignmentForm.addEventListener("submit", (event) => {
    event.preventDefault();

    try {
        assignmentService.addAssignment(
            assignmentNameInput.value,
            courseNameInput.value,
            dueDateInput.value
        );
        assignmentForm.reset();
        errorMessage.textContent = "";
        displayAssignments();
    } catch (error) {
        errorMessage.textContent = error.message;
    }
});

displayAssignments();
