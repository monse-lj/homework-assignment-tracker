# Homework Assignment Tracker

## Project Purpose

Homework Assignment Tracker is a browser-based application that helps students save assignments, track whether they are complete, and remove assignments they no longer need. Data remains available after refreshing the page.

## Author

Monserat Leon

## Technologies Used

- HTML5
- CSS3
- JavaScript modules
- Browser local storage
- Browser-based automated test runner

## Prerequisites

- A modern web browser such as Google Chrome, Safari, or Firefox

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/monse-lj/homework-assignment-tracker.git
   ```

2. Enter the project folder:

   ```bash
   cd homework-assignment-tracker
   ```

## Configuration

No API keys, environment variables, or database are required. Assignment data is stored in the current browser using local storage.

## Running the Application

Because the application uses JavaScript modules, run a small local web server from the project folder:

```bash
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000) in a browser. Stop the server with `Control+C` in Terminal.

## Running Automated Tests

1. Start the local server using `python3 -m http.server 8000`.
2. Open [http://localhost:8000/tests.html](http://localhost:8000/tests.html).

The automated browser test runner checks completion and deletion logic, including normal and invalid-ID cases. A successful run displays **5 of 5 automated tests passed**.

## Verifying Sprint 2 Functionality

1. Add a valid assignment.
2. Select **Mark Complete** and confirm its status becomes **Completed**.
3. Refresh the page and confirm the completed status remains saved.
4. Select **Mark Pending** and confirm the status changes back.
5. Select **Delete**, cancel the confirmation, and confirm the assignment remains.
6. Select **Delete** again, approve the confirmation, and confirm the assignment disappears.

## Sprint 1 Functionality

- Add an assignment with a name, course, and due date.
- Reject incomplete submissions with a clear validation message.
- Display and persist valid assignments.

## Sprint 2 Functionality

- Mark assignments complete or pending.
- Preserve completion status after a refresh.
- Delete an assignment after confirming the action.
- Run automated tests for the new business logic.

## SOLID Principles Applied

- **Single Responsibility Principle:** `LocalStorageRepository` handles persistence, `AssignmentService` handles assignment rules, and `script.js` handles the browser interface.
- **Dependency Inversion Principle:** `AssignmentService` receives a repository through its constructor rather than directly using browser local storage. Tests supply a `FakeRepository` without changing the service.

## Known Limitations

- Assignments cannot be edited or sorted.
- Data is stored only in the current browser and device.
- The application does not include accounts, synchronization, or notifications.
