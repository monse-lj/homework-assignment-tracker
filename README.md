# Homework Assignment Tracker

## Project Purpose

Homework Assignment Tracker is a browser-based application that allows students to enter an assignment name, course name, and due date. Valid assignments appear in a saved list and remain available after refreshing the page.

## Author

Monserat Leon

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Browser local storage

## Prerequisites

A modern web browser such as Google Chrome, Safari, or Firefox

## Installation

1. Clone or download this repository:

   git clone https://github.com/monse-lj/homework-assignment-tracker.git

2. Open the `homework-assignment-tracker` folder.

No dependency installation is required.

## Configuration

No API keys, environment variables, database, or other configuration is required. Assignment data is stored in the browser using local storage.

## Running the Application

1. Open the project folder.
2. Double-click `index.html`.

On macOS, the application can also be opened from the project folder with:

open index.html

The application will open in the default web browser.

## Verifying the Functionality

1. Open the application.
2. Select **Add Assignment** with the fields blank and confirm that a validation message appears.
3. Enter an assignment name, course name, and due date.
4. Select **Add Assignment** and confirm that it appears under **Saved Assignments**.
5. Refresh the page and confirm that the assignment remains visible.

## Sprint 1 Functionality

- Add an assignment with a name, course, and due date.
- Reject incomplete submissions with a clear validation message.
- Display valid assignments in a list.
- Store assignments using localStorage.
- Restore saved assignments after refreshing the page.

## Known Limitations

- Assignments cannot currently be edited, deleted, sorted, or marked complete.
- Data is stored only in the current browser and device.
- The application does not include accounts, synchronization, or notifications.