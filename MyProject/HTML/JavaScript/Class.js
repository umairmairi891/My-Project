window.onload = function() {
  const tableBody = document.getElementById('classTableBody');
  let classes = JSON.parse(localStorage.getItem('classes')) || [];

  function renderTable() {
      tableBody.innerHTML = '';
      classes.forEach((item, index) => {
          let row = tableBody.insertRow();
          row.innerHTML = `
              <td>${item.className}</td>
              <td>${item.room}</td>
              <td>${item.teacher}</td>
              <td>
                  <button class="btn btn-sm btn-warning editBtn">Edit</button>
                  <button class="btn btn-sm btn-danger deleteBtn">Delete</button>
              </td>
          `;

          // Delete Button
          row.querySelector('.deleteBtn').addEventListener('click', function() {
              if (confirm('Are you sure you want to delete this entry?')) {
                  classes.splice(index, 1);
                  localStorage.setItem('classes', JSON.stringify(classes));
                  renderTable();
              }
          });

          // Edit Button
          row.querySelector('.editBtn').addEventListener('click', function() {
              const newClassName = prompt('Edit Class Name:', item.className);
              const newRoom = prompt('Edit Room No:', item.room);
              const newTeacher = prompt('Edit Teacher Name:', item.teacher);

              if (newClassName && newRoom && newTeacher) {
                  classes[index] = {
                      className: newClassName,
                      room: newRoom,
                      teacher: newTeacher
                  };
                  localStorage.setItem('classes', JSON.stringify(classes));
                  renderTable();
              } else {
                  alert('Edit cancelled or invalid input.');
              }
          });
      });
  }

  renderTable();
};

// Add this inside /MyProject/JavaScript/Class.js
document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const className = document.getElementById('className').value;
  const room = document.getElementById('room').value;
  const teacher = document.getElementById('teacher').value;

  if (className && room && teacher) {
      let classes = JSON.parse(localStorage.getItem('classes')) || [];
      classes.push({ className, room, teacher });
      localStorage.setItem('classes', JSON.stringify(classes));
      
      // Clear form
      this.reset();
      
      alert('Class data saved successfully!');
  } else {
      alert('Please fill all fields.');
  }
});
