// affected.js
document.addEventListener('DOMContentLoaded', function() {
    const countrySelect = document.getElementById('countrySelect');
    const casesChart = document.getElementById('casesChart').getContext('2d');
    const submitBtn = document.getElementById('submitBtn');
    let chart;

    fetch('https://disease.sh/v3/covid-19/countries')
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
        fetch(`https://disease.sh/v3/covid-19/countries/${country}`)
            .then(response => response.json())
            .then(data => {
                const dates = Object.keys(data.timeline.cases);
                const cases = Object.values(data.timeline.cases);
                const deaths = Object.values(data.timeline.deaths);
                const recoveries = Object.values(data.timeline.recovered);

                if (chart) {
                    chart.destroy();
                }

                chart = new Chart(casesChart, {
                    type: 'line',
                    data: {
                        labels: dates,
                        datasets: [
                            {
                                label: 'Cases',
                                data: cases,
                                borderColor: 'blue',
                                borderWidth: 2,
                                fill: false
                            },
                            {
                                label: 'Deaths',
                                data: deaths,
                                borderColor: 'red',
                                borderWidth: 2,
                                fill: false
                            },
                            {
                                label: 'Recoveries',
                                data: recoveries,
                                borderColor: 'green',
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
