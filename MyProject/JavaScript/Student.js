// Load students and display in table



window.onload = function () {
  const students = JSON.parse(localStorage.getItem('students')) || [];
  const tableBody = document.getElementById('studentTableBody');

  students.forEach((student, index) => {
      const row = document.createElement('tr');

      row.innerHTML = `
          <td>${student.fname}</td>
          <td>${student.sname}</td>
          <td>${student.age}</td>
          <td>${student.className}</td>
          <td>${student.email}</td>
          <td>
              <button class="btn btn-warning btn-sm edit-btn" data-index="${index}">Edit</button>
              <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">Delete</button>
          </td>
      `;

      tableBody.appendChild(row);
  });

  // Delete functionality
  document.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', function () {
          const index = this.getAttribute('data-index');
          students.splice(index, 1);
          localStorage.setItem('students', JSON.stringify(students));
          location.reload();
      });
  });

  // Edit functionality
  document.querySelectorAll('.edit-btn').forEach(button => {
      button.addEventListener('click', function () {
          const index = this.getAttribute('data-index');
          const student = students[index];

          const newFname = prompt("Edit First Name:", student.fname);
          const newSname = prompt("Edit Second Name:", student.sname);
          const newAge = prompt("Edit Age:", student.age);
          const newClass = prompt("Edit Class:", student.className);
          const newEmail = prompt("Edit Email:", student.email);

          // Update values if provided
          if (newFname && newSname && newAge && newClass && newEmail) {
              students[index] = {
                  fname: newFname,
                  sname: newSname,
                  age: newAge,
                  className: newClass,
                  email: newEmail
              };
              localStorage.setItem('students', JSON.stringify(students));
              location.reload();
          }
      });
  });
};

// Save student data to localStorage
document.getElementById('studentForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const student = {
      fname: document.getElementById('fname').value,
      sname: document.getElementById('sname').value,
      age: document.getElementById('age').value,
      className: document.getElementById('class').value,
      email: document.getElementById('email').value
  };

  // Get existing students or initialize empty array
  let students = JSON.parse(localStorage.getItem('students')) || [];
  students.push(student);

  // Save back to localStorage
  localStorage.setItem('students', JSON.stringify(students));

  // Clear form after submission
  this.reset();
  alert('Student added successfully!');
});
