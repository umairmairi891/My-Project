


function addData(){
    const fname=document.querySelector('#fname');
    const sname=document.querySelector('#sname');
    const age=document.querySelector('#age');
    const Class=document.querySelector('#class');
    const email=document.querySelector('#email');

const table=document.querySelector('.StudentTable');

const tbody=document.querySelector('#tbody');

const row=document.createElement('tr');

[fname,sname,age,Class,email].forEach((val)=>{
  const td=document.createElement('td');
  td.innerHTML=val;

  row.appendChild(td);
})

tbody.appendChild(row);

table.appendChild(tbody)

}