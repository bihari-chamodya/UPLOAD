
let students = [];

function addStudent() {
    const nameInput = document.getElementById('studentName');
    const classSelect = document.getElementById('classSelect');
    const name = nameInput.value.trim();
    const selectedClass = classSelect.value;

    if (name === '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please enter a student name!',
        });
        return;
    }

    students.push({ name: name, class: selectedClass, attendance: 'Not Marked' });
    nameInput.value = '';

    Swal.fire({
        icon: 'success',
        title: 'Student Added',
        text: `${name} has been added to Class ${selectedClass}.`,
    });

    renderTable();
}

function updateAttendance(index, value) {
    students[index].attendance = value;

    Swal.fire({
        icon: 'info',
        title: 'Attendance Updated',
        text: `${students[index].name}'s attendance is now marked as "${value}".`,
        timer: 1500,
        showConfirmButton: false,
    });

    renderTable();
}

function deleteStudent(index) {
    const studentName = students[index].name;

    Swal.fire({
        title: `Delete ${studentName}?`,
        text: 'Are you sure you want to delete this record?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
    }).then((result) => {
        if (result.isConfirmed) {
            students.splice(index, 1);
            renderTable();

            Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: `${studentName}'s record has been deleted.`,
            });
        }
    });
}

function renderTable() {
    const tableBody = document.getElementById('studentTable');
    tableBody.innerHTML = '';

    students.forEach((student, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>Class ${student.class}</td>
            <td>
                <select onchange="updateAttendance(${index}, this.value)">
                    <option value="Not Marked" ${student.attendance === 'Not Marked' ? 'selected' : ''}>Not Marked</option>
                    <option value="Present" ${student.attendance === 'Present' ? 'selected' : ''}>Present</option>
                    <option value="Absent" ${student.attendance === 'Absent' ? 'selected' : ''}>Absent</option>
                </select>
            </td>
            <td>
                <button onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}



