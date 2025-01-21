document.addEventListener("DOMContentLoaded", () => {
    const studentForm = document.getElementById("studentForm");
    const studentTableBody = document.getElementById("studentTableBody");

    // Load students from localStorage
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students.forEach(addStudentRow);

    // Handle form submission
    studentForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const subject = document.getElementById("subject").value;
        const grade = document.getElementById("grade").value;
        const achievement = document.getElementById("achievement").value;

        const student = { name, subject, grade, achievement };

        // Confirm addition with SweetAlert
        Swal.fire({
            title: 'Add Student?',
            text: `Are you sure you want to add ${name}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, add!',
            cancelButtonText: 'No, cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                students.push(student);
                localStorage.setItem("students", JSON.stringify(students));

                addStudentRow(student);
                studentForm.reset();

                Swal.fire('Added!', `${name} has been added successfully.`, 'success');
            }
        });
    });

    // Add a student row to the table
    function addStudentRow(student) {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.subject}</td>
            <td>${student.grade}</td>
            <td>${student.achievement}</td>
            <td><button class="delete-btn">Delete</button></td>
        `;

        const deleteButton = row.querySelector(".delete-btn");
        deleteButton.addEventListener("click", () => deleteStudent(row, student));

        studentTableBody.appendChild(row);
    }

    // Delete a student row
    function deleteStudent(row, student) {
        Swal.fire({
            title: 'Delete Student?',
            text: `Are you sure you want to delete ${student.name}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete!',
            cancelButtonText: 'No, keep it',
        }).then((result) => {
            if (result.isConfirmed) {
                const index = Array.from(studentTableBody.children).indexOf(row);

                students.splice(index, 1);
                localStorage.setItem("students", JSON.stringify(students));

                row.remove();

                Swal.fire('Deleted!', `${student.name} has been deleted successfully.`, 'success');
            }
        });
    }
});

















