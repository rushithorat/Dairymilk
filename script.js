const customerRecords = {};
const pricePerLiter = 2; // Example price per liter (in dollars)
const exchangeRate = 83.75; // Conversion rate from dollars to rupees

// Array of weekdays
const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function addDailyConsumption() {
    const customerName = document.getElementById('customerName').value.trim();
    const dailyLiters = parseFloat(document.getElementById('dailyLiters').value);

    if (!customerName || isNaN(dailyLiters) || dailyLiters <= 0) {
        alert('Please enter a valid customer name and daily liters.');
        return;
    }

    // Initialize the customer's record if it doesn't exist
    if (!customerRecords[customerName]) {
        customerRecords[customerName] = [];
    }

    // Check if the weekly record is already complete (7 days)
    if (customerRecords[customerName].length >= 7) {
        alert(`Weekly records complete for ${customerName}. Start a new week.`);
        return;
    }

    // Calculate the day for the current record based on the index
    const dayOfWeek = weekdays[customerRecords[customerName].length];

    // Push the new record with day and liters
    customerRecords[customerName].push({
        day: dayOfWeek,
        liters: dailyLiters,
    });

    // Update the table after adding the record
    updateTable(customerName);
}

function updateTable(customerName) {
    const tableBody = document.getElementById('dailyTable');
    tableBody.innerHTML = '';

    const records = customerRecords[customerName] || [];
    let totalLiters = 0;

    // Loop through the records and display each day and liters
    records.forEach((record, index) => {
        totalLiters += record.liters;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${record.day}</td>
            <td>${record.liters}</td>
            <td><button onclick="deleteRecord('${customerName}', ${index})">Delete</button></td>
        `;
        tableBody.appendChild(row);
    });

    // Calculate the weekly total liters and bill in dollars
    const weeklyLiters = totalLiters.toFixed(2);
    const weeklyBillInDollars = (totalLiters * pricePerLiter).toFixed(2);
    
    // Convert the weekly bill to rupees
    const weeklyBillInRupees = (weeklyBillInDollars * exchangeRate).toFixed(2);

    // Update the total liters and bill (in rupees) in the UI
    document.getElementById('weeklyLiters').textContent = weeklyLiters;
    document.getElementById('weeklyBill').textContent = `₹${weeklyBillInRupees}`;
}

function deleteRecord(customerName, index) {
    // Remove the record and update the table
    customerRecords[customerName].splice(index, 1);
    updateTable(customerName);
}

function searchBill() {
    const searchName = document.getElementById('searchName').value.trim();

    if (!searchName) {
        alert('Please enter a name to search.');
        return;
    }

    if (!customerRecords[searchName]) {
        document.getElementById('searchResult').textContent = 
            `No records found for ${searchName}.`;
        return;
    }

    // Display the records for the searched customer
    displayCustomerDetails(searchName);
}

function displayCustomerDetails(customerName) {
    const tableBody = document.getElementById('dailyTable');
    tableBody.innerHTML = '';

    const records = customerRecords[customerName];
    let totalLiters = 0;

    // Display each day's record for the customer
    records.forEach((record) => {
        totalLiters += record.liters;

        const row = document.createElement('tr');
        row.innerHTML = `<td>${record.day}</td><td>${record.liters}</td>`;
        tableBody.appendChild(row);
    });

    // Calculate the weekly total liters and bill in dollars
    const weeklyLiters = totalLiters.toFixed(2);
    const weeklyBillInDollars = (totalLiters * pricePerLiter).toFixed(2);
    
    // Convert the weekly bill to rupees
    const weeklyBillInRupees = (weeklyBillInDollars * exchangeRate).toFixed(2);

    // Display the result in the UI with bill in rupees
    document.getElementById('weeklyLiters').textContent = weeklyLiters;
    document.getElementById('weeklyBill').textContent = `₹${weeklyBillInRupees}`;
    document.getElementById('searchResult').textContent = 
        `Weekly bill for ${customerName} is ₹${weeklyBillInRupees}`;
}