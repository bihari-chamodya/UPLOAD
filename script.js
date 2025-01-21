
let students = [];

// Handle form submission to add student marks
document.getElementById('marksForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const studentName = document.getElementById('studentName').value;
    const gradeLevel = document.getElementById('grade').value;
    const term = document.getElementById('term').value;

    
    const subject1Marks = parseFloat(document.getElementById('subject1').value);
    const subject2Marks = parseFloat(document.getElementById('subject2').value);
    const subject3Marks = parseFloat(document.getElementById('subject3').value);

    if (studentName && gradeLevel && term && !isNaN(subject1Marks) && !isNaN(subject2Marks) && !isNaN(subject3Marks)) {
        // Calculate total and average for the selected term
        const totalMarks = subject1Marks + subject2Marks + subject3Marks;
        const averageMarks = totalMarks / 3;

        
        const student = {
            studentName,
            gradeLevel,
            term,
            subject1Marks,
            subject2Marks,
            subject3Marks,
            totalMarks,
            averageMarks
        };

        // Confirm addition with SweetAlert
        Swal.fire({
            title: 'Add Student?',
            text: `Are you sure you want to add ${studentName}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, add!',
            cancelButtonText: 'No, cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                // Add student to the students array
                students.push(student);

                // Update the table with the new student
                updateTable();

                // Reset the form
                document.getElementById('marksForm').reset();

                // Show success alert
                Swal.fire('Added!', `${studentName} has been added successfully.`, 'success');
            }
        });
    } else {
        
        Swal.fire({
            title: 'Error!',
            text: 'Please fill all the fields correctly.',
            icon: 'error'
        });
    }
});

// Function to update the table with student data
function updateTable() {
    const tableBody = document.getElementById('marksTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; 

    students.forEach((student, index) => {
        const row = tableBody.insertRow();

        
        row.insertCell(0).textContent = student.studentName;
        row.insertCell(1).textContent = student.gradeLevel;
        row.insertCell(2).textContent = `Term ${student.term}`;  // Show the selected term

        // Subject marks
        row.insertCell(3).textContent = student.subject1Marks;
        row.insertCell(4).textContent = student.subject2Marks;
        row.insertCell(5).textContent = student.subject3Marks;

        // Total Marks and Average
        row.insertCell(6).textContent = student.totalMarks;
        row.insertCell(7).textContent = student.averageMarks.toFixed(2);

        // Add delete button
        const deleteCell = row.insertCell(8);
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => confirmDeleteStudent(index);
        deleteCell.appendChild(deleteButton);
    });
}

// Function to confirm and delete a student from the table
function confirmDeleteStudent(index) {
    const studentName = students[index].studentName;

    Swal.fire({
        title: 'Delete Student?',
        text: `Are you sure you want to delete ${studentName}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete!',
        cancelButtonText: 'No, cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            students.splice(index, 1); 
            updateTable(); 

            Swal.fire('Deleted!', `${studentName} has been deleted successfully.`, 'success');
        }
    });
}










