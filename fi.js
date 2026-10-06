// ============================================
// STUDENT PERFORMANCE RANKING SYSTEM
// ============================================

// Parent Class
class Person {
    constructor(name) {
        this.name = name;
    }

    displayInfo() {
        console.log(`Name: ${this.name}`);
    }
}


// Child Class
class Student extends Person {
    constructor(name, id, quiz, exam, project) {
        super(name);

        this.id = id;
        this.quiz = quiz;
        this.exam = exam;
        this.project = project;

        this.finalScore = 0;
        this.rating = "";
        this.status = "";
        this.rank = 0;
    }

    // Calculate final score
    calculateFinalScore() {
        this.finalScore =
            (this.quiz * 0.30) +
            (this.exam * 0.50) +
            (this.project * 0.20);

        return this.finalScore;
    }

    // Determine rating
    getRating() {
        if (this.finalScore >= 90) {
            this.rating = "Excellent";
        } else if (this.finalScore >= 80) {
            this.rating = "Very Good";
        } else if (this.finalScore >= 75) {
            this.rating = "Passed";
        } else {
            this.rating = "Failed";
        }

        return this.rating;
    }

    // Determine pass/fail
    checkStatus() {
        if (this.finalScore >= 75) {
            this.status = "PASSED";
        } else {
            this.status = "FAILED";
        }

        return this.status;
    }

    // Override parent method
    displayInfo() {
        console.log(`Name: ${this.name}`);
        console.log(`ID: ${this.id}`);
        console.log(`Final Score: ${this.finalScore.toFixed(2)}`);
        console.log(`Rating: ${this.rating}`);
        console.log(`Status: ${this.status}`);
    }
}


// ============================================
// VALIDATE SCORE
// ============================================

function isValidScore(score) {
    return (
        typeof score === "number" &&
        score >= 0 &&
        score <= 100
    );
}


// ============================================
// PROCESS STUDENTS
// ============================================

function processStudents(students) {

    // Check if there are no students
    if (students.length === 0) {
        console.log("No students found.");
        return;
    }

    const validStudents = [];

    // ----------------------------------------
    // Validate and process students
    // ----------------------------------------

    for (let student of students) {

        if (
            !isValidScore(student.quiz) ||
            !isValidScore(student.exam) ||
            !isValidScore(student.project)
        ) {
            console.log(`Invalid score for ${student.name}`);
            continue;
        }

        student.calculateFinalScore();
        student.getRating();
        student.checkStatus();

        validStudents.push(student);
    }


    // ----------------------------------------
    // Check if there are no valid students
    // ----------------------------------------

    if (validStudents.length === 0) {
        console.log("No valid students found.");
        return;
    }


    // ----------------------------------------
    // Calculate total score
    // ----------------------------------------

    let totalScore = 0;

    for (let student of validStudents) {
        totalScore += student.finalScore;
    }


    // ----------------------------------------
    // Calculate average
    // ----------------------------------------

    const averageScore =
        totalScore / validStudents.length;


    // ----------------------------------------
    // Count passing students
    // ----------------------------------------

    let passingStudents = 0;

    for (let student of validStudents) {

        if (student.finalScore >= 75) {
            passingStudents++;
        }
    }


    // ----------------------------------------
    // Calculate passing percentage
    // ----------------------------------------

    const passingPercentage =
        (passingStudents / validStudents.length) * 100;


    // ----------------------------------------
    // Sort students
    // Highest score → Lowest score
    // ----------------------------------------

    validStudents.sort(
        (a, b) => b.finalScore - a.finalScore
    );


    // ----------------------------------------
    // Assign rankings
    // ----------------------------------------

    for (let i = 0; i < validStudents.length; i++) {
        validStudents[i].rank = i + 1;
    }


    // ----------------------------------------
    // Display Student Report
    // ----------------------------------------

    console.log("===== STUDENT PERFORMANCE REPORT =====");
    console.log("");

    for (let student of validStudents) {

        console.log(`Rank ${student.rank}`);
        console.log(`Name: ${student.name}`);
        console.log(`ID: ${student.id}`);
        console.log(
            `Final Score: ${student.finalScore.toFixed(2)}`
        );
        console.log(`Rating: ${student.rating}`);
        console.log(`Status: ${student.status}`);
        console.log("");
    }


    // ----------------------------------------
    // Display Class Statistics
    // ----------------------------------------

    console.log("===== CLASS STATISTICS =====");
    console.log("");

    console.log(
        `Total Students: ${validStudents.length}`
    );

    console.log(
        `Total Score: ${totalScore.toFixed(2)}`
    );

    console.log(
        `Average Score: ${averageScore.toFixed(2)}`
    );

    console.log(
        `Passing Students: ${passingStudents}`
    );

    console.log(
        `Passing Percentage: ${passingPercentage.toFixed(2)}%`
    );

    console.log("");


    // ----------------------------------------
    // Filter passing students
    // ----------------------------------------

    const passedStudents = validStudents.filter(
        student => student.finalScore >= 75
    );


    // ----------------------------------------
    // Display Passed Students
    // ----------------------------------------

    console.log("===== PASSED STUDENTS =====");
    console.log("");

    for (let student of passedStudents) {

        console.log(
            `${student.name} - ${student.finalScore.toFixed(2)}`
        );
    }
}


// ============================================
// CREATE STUDENT OBJECTS
// ============================================

const students = [

    new Student(
        "Alice",
        101,
        90,
        95,
        88
    ),

    new Student(
        "Bob",
        102,
        75,
        80,
        70
    ),

    new Student(
        "Charlie",
        103,
        60,
        65,
        70
    ),

    new Student(
        "Diana",
        104,
        95,
        92,
        96
    ),

    new Student(
        "Ethan",
        105,
        82,
        85,
        80
    )
];

processStudents(students);