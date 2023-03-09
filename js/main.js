fetch("https://api.currencyfreaks.com/latest?apikey=fecaeaa9bb504e27b03c7189978d9428").then((result)=>{
    let myData = result.json();
    return myData;
}).then((currency)=>{
    let currencies = Object.keys(currency.rates).sort();
    let firstSelectBox = document.querySelector('.first-currency-box');
    let secondSelectBox = document.querySelector('.second-currency-box');
    for(let i =0; i<currencies.length; i++){
        let option = document.createElement('option');
        let optionText = document.createTextNode(currencies[i]);
        option.appendChild(optionText);
        option.value = currencies[i];
        if(currencies[i] === 'USD'){
            option.selected = "selected";
        }
        firstSelectBox.appendChild(option);
    }
    for(let i =0; i<currencies.length; i++){
        let option = document.createElement('option');
        let optionText = document.createTextNode(currencies[i]);
        option.appendChild(optionText);
        option.value = currencies[i];
        if(currencies[i] === 'EGP'){
            option.selected = "selected";
        }
        secondSelectBox.appendChild(option);
    }
    let firstNumberInput = document.querySelector('.value-1');
    let secondNumberInput = document.querySelector('.value-2');
    
    secondNumberInput.value = (+currency.rates[secondSelectBox.value]).toFixed(2);
    let firstCurrency = document.querySelector('.first-currency span');
    let secondCurrency = document.querySelector('.second-currency span');
    firstCurrency.innerHTML = `1 ${firstSelectBox.value} equals`;
    secondCurrency.innerHTML = `${(+currency.rates[secondSelectBox.value]).toFixed(2)} ${secondSelectBox.value}`;

    firstNumberInput.addEventListener('input', function(){
        secondNumberInput.value = (+firstNumberInput.value * (+currency.rates[secondSelectBox.value] / +currency.rates[firstSelectBox.value])).toFixed(2);
    });
    secondNumberInput.addEventListener('input', function(){
        firstNumberInput.value = (+secondNumberInput.value * (+currency.rates[firstSelectBox.value] / +currency.rates[secondSelectBox.value])).toFixed(2);
    });
    firstSelectBox.addEventListener('change', function(){
        secondNumberInput.value = (+firstNumberInput.value * (+currency.rates[secondSelectBox.value] / +currency.rates[firstSelectBox.value])).toFixed(2);
        firstCurrency.innerHTML = `1 ${firstSelectBox.value} equals`;
        secondCurrency.innerHTML = `${(+currency.rates[secondSelectBox.value] / +currency.rates[firstSelectBox.value]).toFixed(2)} ${secondSelectBox.value}`;
    });
    secondSelectBox.addEventListener('change', function(){
        secondNumberInput.value = (+firstNumberInput.value * (+currency.rates[secondSelectBox.value] / +currency.rates[firstSelectBox.value])).toFixed(2);
        secondCurrency.innerHTML = `${(+currency.rates[secondSelectBox.value] / +currency.rates[firstSelectBox.value]).toFixed(2)} ${secondSelectBox.value}`;
    });
})
let time = document.querySelector('.time span');
let date = new Date();
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
time.innerHTML = `${months[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCHours() >= 12 ? date.getUTCHours() % 12 : date.getUTCHours()}:${date.getUTCMinutes()} ${date.getUTCHours() >= 12 ? "PM" : "AM"} UTC`;