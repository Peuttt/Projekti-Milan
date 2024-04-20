const addBtn = document.querySelector('.addTransactionBtn');

addBtn.addEventListener('click', () => {
    const text = document.querySelector('#incomeText').value;
    const amount = document.querySelector('#incomeAmount').value;
    let historyContainer = document.querySelector('.history-container'); 
    let valid = false;

    const transaction = document.createElement('div');
    transaction.classList.add('historyCard');

    if (text !== '' && amount !== '') {

        let textField = document.createElement('div');
        textField.classList.add('textField');
        textField.textContent = text;
        transaction.append(textField);

        let amountField = document.createElement('div');
        amountField.classList.add('textField');
        amountField.textContent = amount;
        if (amount.charAt(0) === '+') {
            amountField.style.color = 'green';
            valid = true; 
        } else if (amount.charAt(0) === '-') {
            amountField.style.color = 'red'; 
            valid = true;
        }
        if(valid) {
            transaction.append(amountField);
            historyContainer.appendChild(transaction);
            document.querySelector('#incomeText').value = ''; 
            document.querySelector('#incomeAmount').value = ''; 
        } else {
            document.querySelector('#incomeText').value = ''; 
            document.querySelector('#incomeAmount').value = ''; 
        }

    } else {
        document.querySelector('#incomeText').value = ''; 
        document.querySelector('#incomeAmount').value = ''; 
    };

    let balanceField = document.querySelector('#balanceField');
    let balanceValue = parseInt(balanceField.textContent.substring(0, balanceField.textContent.length - 1));
    let incomeField = document.querySelector('#incomeField');
    let expenseField = document.querySelector('#expenseField');
    let incomeFieldValue = parseInt(incomeField.textContent.substring(1, incomeField.textContent.length));
    let expenseFieldValue = parseInt(expenseField.textContent.substring(1, expenseField.textContent.length));
    
    if (amount.charAt(0) === '+') {
        const amountToAdd = parseInt(amount.substring(1, amount.length));
        balanceValue += amountToAdd;
        incomeFieldValue += amountToAdd;
    } else if (amount.charAt(0) === '-') {
        const amountToSubtract = parseInt(amount.substring(1, amount.length));
        balanceValue -= amountToSubtract;
        expenseFieldValue += amountToSubtract;
    }
    
    if(valid) {
        document.querySelector('#balanceField').textContent = `${balanceValue}$`;
        document.querySelector('#incomeField').textContent = `$${incomeFieldValue}` ;
        document.querySelector('#expenseField').textContent = `$${expenseFieldValue}` ;
    }

    valid = false;
});
