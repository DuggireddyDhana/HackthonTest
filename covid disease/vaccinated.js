// vaccinated.js
document.addEventListener('DOMContentLoaded', function() {
    const countrySelect = document.getElementById('countrySelect');
    const vaccinatedChart = document.getElementById('vaccinatedChart').getContext('2d');
    const submitBtn = document.getElementById('submitBtn');
    let chart;

    fetch('https://disease.sh/v3/covid-19/vaccine/coverage/countries?lastdays=30')
        .then(response => response.json())
        .then(data => {
            data.forEach(country => {
                const option = document.createElement('option');
                option.textContent = country.country;
                option.value = country.country;
                countrySelect.appendChild(option);
            });
        });

    function fetchData(country) {
        fetch(`https://disease.sh/v3/covid-19/vaccine/coverage/countries/${country}?lastdays=30`)
            .then(response => response.json())
            .then(data => {
                const dates = Object.keys(data.timeline);
                const vaccinated = Object.values(data.timeline);

                if (chart) {
                    chart.destroy();
                }

                chart = new Chart(vaccinatedChart, {
                    type: 'line',
                    data: {
                        labels: dates,
                        datasets: [
                            {
                                label: 'Vaccinated',
                                data: vaccinated,
                                borderColor: 'blue',
                                borderWidth: 2,
                                fill: false
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false
                    }
                });
            });
    }

    submitBtn.addEventListener('click', function() {
        const selectedCountry = countrySelect.value;
        fetchData(selectedCountry);
    });
});
