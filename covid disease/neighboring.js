// neighboring.js
document.addEventListener('DOMContentLoaded', function() {
    const neighboringTable = document.getElementById('neighboringTable').getElementsByTagName('tbody')[0];
    const countrySelect = document.getElementById('countrySelect');
    const submitBtn = document.getElementById('submitBtn');

    const countries = ['India', 'Sri Lanka', 'Bangladesh', 'China', 'Nepal'];

    countries.forEach(country => {
        const option = document.createElement('option');
        option.textContent = country;
        option.value = country;
        countrySelect.appendChild(option);
    });

    function fetchData(country) {
        fetch(`https://disease.sh/v3/covid-19/countries/${country}`)
            .then(response => response.json())
            .then(data => {
                const row = neighboringTable.insertRow();
                row.innerHTML = `
                    <td>${data.country}</td>
                    <td>${data.cases}</td>
                    <td>${data.deaths}</td>
                    <td>${data.recovered}</td>
                    <td>${data.population}</td>
                `;
            });
    }

    submitBtn.addEventListener('click', function() {
        neighboringTable.innerHTML = ''; // Clear previous data
        const selectedCountry = countrySelect.value;
        fetchData(selectedCountry);
    });
});
