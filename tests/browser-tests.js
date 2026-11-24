import { AssignmentService } from "../assignment-service.js";

class FakeRepository {
    constructor(assignments = []) { this.assignments = assignments; }
    load() { return this.assignments.map((item) => ({ ...item })); }
    save(assignments) { this.assignments = assignments.map((item) => ({ ...item })); }
}

const tests = [];
const test = (name, action) => tests.push({ name, action });
const assert = (condition, message) => { if (!condition) throw new Error(message); };

test("Marks a pending assignment complete", () => {
    const repository = new FakeRepository([
        { id: "a1", name: "Report", course: "CS 319", dueDate: "2026-11-23", completed: false }
    ]);
    const service = new AssignmentService(repository);
    service.toggleCompleted("a1");
    assert(service.getAssignments()[0].completed === true, "Assignment was not completed");
});

test("Rejects an unknown completion ID", () => {
    const service = new AssignmentService(new FakeRepository());
    let rejected = false;
    try { service.toggleCompleted("missing"); } catch (error) { rejected = true; }
    assert(rejected, "Unknown ID was not rejected");
});

test("Rejects blank required fields", () => {
    const service = new AssignmentService(new FakeRepository());
    let rejected = false;
    try { service.addAssignment("  ", "CS 319", "2026-11-23"); } catch (error) { rejected = true; }
    assert(rejected, "Blank name was not rejected");
});

test("Deletes an existing assignment", () => {
    const repository = new FakeRepository([
        { id: "a1", name: "Report", course: "CS 319", dueDate: "2026-11-23", completed: false }
    ]);
    const service = new AssignmentService(repository);
    service.deleteAssignment("a1");
    assert(service.getAssignments().length === 0, "Assignment was not deleted");
});

test("Rejects an unknown deletion ID", () => {
    const service = new AssignmentService(new FakeRepository());
    let rejected = false;
    try { service.deleteAssignment("missing"); } catch (error) { rejected = true; }
    assert(rejected, "Unknown ID was not rejected");
});

const results = document.getElementById("results");
let passed = 0;
tests.forEach(({ name, action }) => {
    const item = document.createElement("li");
    try {
        action();
        passed += 1;
        item.className = "pass";
        item.textContent = `PASS: ${name}`;
    } catch (error) {
        item.className = "fail";
        item.textContent = `FAIL: ${name} — ${error.message}`;
    }
    results.appendChild(item);
});

const summary = document.getElementById("summary");
summary.className = passed === tests.length ? "pass" : "fail";
summary.textContent = `${passed} of ${tests.length} automated tests passed.`;
