const expenseForm = document.getElementById('expenseForm');
const expenseList = document.getElementById('expenseList');

expenseForm.addEventListener('submit', addExpense);

function addExpense(event) {
    event.preventDefault();

    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    const date = document.getElementById('date').value;

    if (isNaN(amount) || amount <= 0 || !category || !date) {
        alert('Please fill all fields correctly.');
        return;
    }

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${amount}</td>
        <td>${category}</td>
        <td>${date}</td>
        <td>
            <button onclick="editExpense(this)">Edit</button>
            <button onclick="deleteExpense(this)">Delete</button>
        </td>
    `;
    expenseList.appendChild(newRow);

    
    expenseForm.reset();
}

function editExpense(button) {
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td');
    const amount = parseFloat(cells[0].innerText);
    const category = cells[1].innerText;
    const date = cells[2].innerText;

    
    console.log('Editing expense:', { amount, category, date });
}

function deleteExpense(button) {
    const row = button.closest('tr');
    row.remove();
}
