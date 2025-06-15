document.addEventListener("DOMContentLoaded", () => {
  const feeForm = document.getElementById("feeForm");
  const feeTableBody = document.getElementById("feeTableBody");

  feeForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const studentName = document.getElementById("studentName").value;
    const amount = parseFloat(document.getElementById("feeAmount").value);
    const date = document.getElementById("paymentDate").value;
    const status = document.getElementById("status").value;

    const newEntry = { studentName, amount, date, status };

    const fees = JSON.parse(localStorage.getItem("fees")) || [];
    fees.push(newEntry);
    localStorage.setItem("fees", JSON.stringify(fees));

    feeForm.reset();
    renderTable();
  });

  function renderTable() {
    const fees = JSON.parse(localStorage.getItem("fees")) || [];
    feeTableBody.innerHTML = "";
    let totalPaid = 0;
    let totalUnpaid = 0;

    fees.forEach((fee, index) => {
      if (fee.status === "Paid") totalPaid += fee.amount;
      else totalUnpaid += fee.amount;

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${fee.studentName}</td>
        <td>${fee.amount}</td>
        <td>${fee.date}</td>
        <td>${fee.status}</td>
        <td>
        <button class="btn btn-sm btn-info me-2" onclick="editFee(${index})">Edit</button>
          <button class="btn btn-sm btn-danger" onclick="deleteFee(${index})">Delete</button>
        </td>
      `;
      feeTableBody.appendChild(row);
    });

    document.getElementById("totalPaid").textContent = totalPaid;
    document.getElementById("totalUnpaid").textContent = totalUnpaid;
  }

  window.deleteFee = (index) => {
    const fees = JSON.parse(localStorage.getItem("fees")) || [];
    if (confirm("Delete this fee record?")) {
      fees.splice(index, 1);
      localStorage.setItem("fees", JSON.stringify(fees));
      renderTable();
    }
  };

  window.editFee = (index) => {
  const fees = JSON.parse(localStorage.getItem("fees")) || [];
  const fee = fees[index];

  const newAmount = prompt("Edit Amount:", fee.amount);
  const newDate = prompt("Edit Payment Date:", fee.date);
  const newStatus = prompt("Edit Status (Paid/Unpaid):", fee.status);

  if (newAmount && newDate && newStatus) {
    // Update only allowed fields
    fees[index].amount = parseFloat(newAmount);
    fees[index].date = newDate;
    fees[index].status = newStatus;

    localStorage.setItem("fees", JSON.stringify(fees));
    alert("Fee record updated successfully.");
    location.reload(); 
  }
};


  renderTable();
});
