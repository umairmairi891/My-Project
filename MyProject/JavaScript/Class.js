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
        <button class="btn btn-sm btn-info moreBtn">More Details</button>
        <button class="btn btn-sm btn-warning editBtn">Edit</button>
        <button class="btn btn-sm btn-danger deleteBtn">Delete</button>
      </td>
    `;

    row.querySelector('.deleteBtn').addEventListener('click', function () {
      if (confirm('Are you sure you want to delete this entry?')) {
        classes.splice(index, 1);
        localStorage.setItem('classes', JSON.stringify(classes));
        renderTable();
      }
    });

    row.querySelector('.editBtn').addEventListener('click', function () {
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

    row.querySelector('.moreBtn').addEventListener('click', function () {
      showClassDetails(item.className);
    });
  });
}


  renderTable();
};

document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const className = document.getElementById('className').value;
  const room = document.getElementById('room').value;
  const teacher = document.getElementById('teacher').value;

  if (className && room && teacher) {
      let classes = JSON.parse(localStorage.getItem('classes')) || [];
      classes.push({ className, room, teacher });
      localStorage.setItem('classes', JSON.stringify(classes));
      
      this.reset();
      
      alert('Class data saved successfully!');
  } else {
      alert('Please fill all fields.');
  }
});

function showClassDetails(className) {
  const sidebar = document.getElementById('classDetailsSidebar');
  const content = document.getElementById('classDetailsContent');
  sidebar.style.display = 'block';
  content.innerHTML = "<p>Loading class data...</p>";

  setTimeout(() => {
    const mockData = {
      "10B": {
        totalseats: '40',
        teachersServed: '5',
        smartboard: 'true',
        projector: 'false',
        renovatedYear: '2023'
      },
      "9A": {
        totalseats: '50',
        teachersServed: '9',
        smartboard: 'true',
        projector: 'true',
        renovatedYear: '2022'
      },
      '8C':{
        
        totalseats: '40',
        teachersServed: '5',
        smartboard: 'true',
        projector: 'true',
        renovatedYear: '2021'
      }
    };

    const data = mockData[className];

    if (!data) {
      content.innerHTML = `<p class="text-danger">No data found for class ${className}</p>`;
      return;
    }

    content.innerHTML = `
      <p><strong>Class:</strong> ${className}</p>
      <p><strong>Total Sitting Space:</strong> ${data.totalseats}</p>
      <p><strong>Teachers Served:</strong> ${data.teachersServed}</p>
      <p><strong>Smartboard:</strong> ${data.smartboard === 'true' ? 'Yes' : 'No'}</p>
      <p><strong>Projector:</strong> ${data.projector === 'true' ? 'Yes' : 'No'}</p>
      <p><strong>Last Renovated:</strong> ${data.renovatedYear}</p>
    `;
  }, 1000);
}


function closeSidebar() {
  document.getElementById('classDetailsSidebar').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');

  if (!form) {
    console.error("Form not found in DOM");
    return;
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    console.log("Form submission intercepted");

    const className = document.getElementById('className').value.trim();
    const room = document.getElementById('room').value.trim();
    const teacher = document.getElementById('teacher').value.trim();

    const classData = {
      className,
      room,
      teacher
    };

    console.log("Sending data:", classData);

    fetch('https://6854f57b6a6ef0ed6630a63b.mockapi.io/school', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(classData)
    })
    .then(response => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then(data => {
      console.log("Success:", data);
      alert('Class added successfully!');
      form.reset();
    })
    .catch(error => {
      console.error("Error sending data:", error);
      alert('Error adding class');
    });
  });
});
