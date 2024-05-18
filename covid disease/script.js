submitBtn.addEventListener('click', function() {
    const selectedCountry = countrySelect.value;
    fetchData(selectedCountry);
});
function fetchData(country) {
    console.log('Fetching data for country:', country);
   
}

