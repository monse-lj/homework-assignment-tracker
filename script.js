const assignmentForm = document.getElementById("assignment-form");
const assignmentNameInput = document.getElementById("assignment-name");
const courseNameInput = document.getElementById("course-name");
const dueDateInput = document.getElementById("due-date");
const errorMessage = document.getElementById("error-message");
const assignmentList = document.getElementById("assignment-list");
const emptyMessage = document.getElementById("empty-message");

let assignments = JSON.parse(localStorage.getItem("assignments")) || [];

function saveAssignments() {
    localStorage.setItem("assignments", JSON.stringify(assignments));
}

function formatDate(dateString) {
    const dateParts = dateString.split("-");
    const year = Number(dateParts[0]);
    const month = Number(dateParts[1]) - 1;
    const day = Number(dateParts[2]);

    return new Date(year, month, day).toLocaleDateString();
}

function displayAssignments() {
    assignmentList.innerHTML = "";

    if (assignments.length === 0) {
        emptyMessage.style.display = "block";
        return;
    }

    emptyMessage.style.display = "none";

    assignments.forEach(function (assignment) {
        const listItem = document.createElement("li");
        listItem.className = "assignment-card";

        const assignmentTitle = document.createElement("h3");
        assignmentTitle.textContent = assignment.name;

        const courseText = document.createElement("p");
        courseText.textContent = "Course: " + assignment.course;

        const dueDateText = document.createElement("p");
        dueDateText.textContent = "Due: " + formatDate(assignment.dueDate);

        listItem.appendChild(assignmentTitle);
        listItem.appendChild(courseText);
        listItem.appendChild(dueDateText);
        assignmentList.appendChild(listItem);
    });
}

assignmentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const assignmentName = assignmentNameInput.value.trim();
    const courseName = courseNameInput.value.trim();
    const dueDate = dueDateInput.value;

    if (assignmentName === "" || courseName === "" || dueDate === "") {
        errorMessage.textContent =
            "Please enter an assignment name, course name, and due date.";
        return;
    }

    const newAssignment = {
        name: assignmentName,
        course: courseName,
        dueDate: dueDate
    };

    assignments.push(newAssignment);
    saveAssignments();
    displayAssignments();

    assignmentForm.reset();
    errorMessage.textContent = "";
});

displayAssignments();