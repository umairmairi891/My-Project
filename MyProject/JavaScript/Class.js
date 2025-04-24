


function addClassRow(){

const cName=document.getElementById('className');
const Subject=document.getElementById('subjct');
const Teacher=document.getElementById('teacher')


const table=document.querySelector('table').querySelector('.tbody');

const row=document.createElement('tr');

[cName,Subject,Teacher].forEach((val)=>{
const td=document.createElement('td');
td.textContent=val;

row.appendChild(td);
})
table.appendChild(row)

}