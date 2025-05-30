// Load students and display in table



window.onload = function () {
  let students = JSON.parse(localStorage.getItem('students')) || [];
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
              <button class="btn btn-danger btn-sm details-btn" data-index="${index}">Details</button>
          </td>
      `;

      tableBody.appendChild(row);
  });

  document.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', function () {
          const index = this.getAttribute('data-index');
          students.splice(index, 1);
          localStorage.setItem('students', JSON.stringify(students));
          location.reload();
      });
  });

  document.querySelectorAll('.edit-btn').forEach(button => {
      button.addEventListener('click', function () {
          const index = this.getAttribute('data-index');
          const student = students[index];

          const newFname = prompt("Edit First Name:", student.fname);
          const newSname = prompt("Edit Second Name:", student.sname);
          const newAge = prompt("Edit Age:", student.age);
          const newClass = prompt("Edit Class:", student.className);
          const newEmail = prompt("Edit Email:", student.email);

          if (newFname && newSname && newAge && newClass && newEmail) {
              students[index] = {
                  fname: newFname,
                  sname: newSname,
                  age: newAge,
                  className: newClass,
                  email: newEmail,

              };
              localStorage.setItem('students', JSON.stringify(students));
              location.reload();
          }
      });
  });
  // Handle "Details" button click
  let currentStudentIndex=null;
document.querySelectorAll('.details-btn').forEach(button => {
    button.addEventListener('click', function () {
      currentStudentIndex = this.getAttribute('data-index');
      const student = students[currentStudentIndex];
  
      document.getElementById('detailFname').value = student.fname || '';
      document.getElementById('detailSname').value = student.sname || '';
      document.getElementById('detailAge').value = student.age || '';
      document.getElementById('detailClass').value = student.className || '';
      document.getElementById('detailEmail').value = student.email || '';
      document.getElementById('detailMarks').value = student.marks || '';
      document.getElementById('detailAttendance').value = student.attendance || '';
      document.getElementById('detailGrade').value = student.grade || '';
  
      // Show the sidebar
      
    document.getElementById('detailsSidebar').classList.add('show');
   
    });
  });
};
function saveChanges(){
    if(currentStudentIndex==nul) return;
    students[currentStudentIndex].fname=document.getElementById('detailFname').value;
    students[currentStudentIndex].sname=document.getElementById('detailSname').value;
    students[currentStudentIndex].age=document.getElementById('detailAge').value;
    students[currentStudentIndex].className=document.getElementById('detailClass').value;
    students[currentStudentIndex].email=document.getElementById('detailEmail').value;
    students[currentStudentIndex].marks=document.getElementById('detailMarks').value;
    students[currentStudentIndex].attendance=document.getElementById('detailAttendence').value;
    students[currentStudentIndex].grade=document.getElementById('detailGrade').value;

    localStorage.setItem('students',JSON.stringify(student));
    alert('Student updated successfully');
    closeSidebar();
    location.reload()
}
function closeSidebar() {
    document.getElementById('detailsSidebar').classList.remove('show');
  }
// Save student data to localStorage
document.getElementById('studentForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const student = {
      fname: document.getElementById('fname').value,
      sname: document.getElementById('sname').value,
      age: document.getElementById('age').value,
      className: document.getElementById('class').value,
      email: document.getElementById('email').value,
      marks:document.getElementById('marks').value||'',
      attendance:document.getElementById('attendence').value||'',
      grade:document.getElementById('grade').value||''
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
