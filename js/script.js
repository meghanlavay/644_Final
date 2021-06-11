window.addEventListener('load', (e) => {

const $ = (id) => {
  return document.getElementById(id);
};


// Delivery ------------------------------------------------------------------------------

let customerName = $('customerName');
let address = $('address');
let aptNum = $('number')
let addressType = $('addressType');
let otherBox = $('otherBox');
let city = $('city');
let state = $('state');
let phone = $('phone');
let email = $('email');
let showDelivery = $('showDelivery');
let showBilling = $('showBilling');

let nameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
let stateRegex = /^[A-Za-z]{2}$/;
let zipRegex = /^\d{5}$|^\d{5}-\d{4}$/;
let phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


// Hidden Other Box

function enableOtherBox() {
	if (addressType.value === 'other') {
    	otherBox.style.display = 'block';
    } else {
        otherBox.style.display = 'none';
    }
}

addressType.addEventListener('change', enableOtherBox);

// Validate Delivery Info

function validateName() {
	if (nameRegex.test(customerName.value)) {
		return true;
	} else if (customerName.value === '') {
		alert('Please enter your name');
		return false;
	} else {
		alert("Please enter a valid first and last name");
		return false;
	}
}

function validateAddress() {
	if (address.value === '') {
		alert('Please enter your address');
		return false;
	};
}

function validateAddressType() {
	if (addressType.value === '') {
		alert('Please select an address type');
		return false;
	};
}

function validateCity() {
	if (city.value === '') {
		alert('Please enter a city');
		return false;
	};
}

function validateState() {
	if (stateRegex.test(state.value)) {
		return true;
	} else if (state.value === '') {
		alert('Please enter your state');
		return false;
	} else {
		alert("Please enter a valid state");
		return false;
	}
}

function validateZip() {
	if (zipRegex.test(zip.value)) {
		return true;
	} else if (zip.value === '') {
		alert('Please enter your zip code');
		return false;
	} else {
		alert("Please enter a valid zip code");
		return false;
	}
}

function validatePhone() {
	if (phoneRegex.test(phone.value)) {
		return true;
	} else if (phone.value === '') {
		alert('Please enter your phone number');
		return false;
	} else {
		alert("Please enter a valid phone number");
		return false;
	}
}

function validateEmail() {
	if (emailRegex.test(email.value)) {
		return true;
	} else if (email.value === '') {
		alert('Please enter your email');
		return false;
	} else {
		alert("Please enter a valid email");
		return false;
	}
}


// Pizza Order ------------------------------------------------------------------------------

let doughPrice = 0;
let cheesePrice = 0;
let saucePrice = 0;
let totalPrice = 0;

// Get dough total

let doughChoices = {

    handTossed: [
		{
        size: 'Small',
        price: 9.99
      	},
      	{
        size: 'Medium',
        price: 12.99
		},
      	{
        size: 'Large',
        price: 14.99
      	}
    ],

    thinCrust: [
		{
        size: 'Medium',
        price: 11.99
      	},
      	{
        size: 'Large',
        price: 13.99
		}
    ],

    newYork: [
		{
        size: 'Large',
        price: 16.99
      	},
      	{
        size: 'Extra Large',
        price: 19.99
      	}
    ],

    glutenFree: [
		{
      	size: 'Small',
      	price: 10.99
    	}
	]
};

let pizzaSize = $('pizzaSize');
let dough = document.getElementsByName('dough');
let doughOptions = [].slice.call(dough);

doughOptions.forEach(function(item) {
	item.addEventListener('change', function() {
    	let doughChoice = doughChoices[item.id];
      	pizzaSize.innerHTML = 0;

      	for (let i = 0; i < doughChoice.length; i ++) {
        let element = document.createElement('option');
        element.textContent = doughChoice[i].size + ' ( $' + doughChoice[i].price + ')';
		pizzaSize.appendChild(element);
		
		doughPrice = doughChoice[i].price;
      	}
    });
});



pizzaSize.addEventListener('change', getDoughTotal, false)

function getDoughTotal() {
	console.log(doughPrice)
	return doughPrice;
}

// Validate dough style

addCheese.addEventListener('click', mustChooseDough);
addSauce.addEventListener('click', mustChooseDough);
addToppings.addEventListener('click', mustChooseDough);

let handTossed = $('handTossed');
let thinCrust = $('thinCrust');
let newYork = $('newYork');
let glutenFree = $('glutenFree');


function mustChooseDough() {
        if (handTossed.checked || thinCrust.checked || newYork.checked || glutenFree.checked) {
		return true;
        } else {
		alert('Please choose a dough type and size to proceed');
		return false;
		}
	}


// Get rest of selection totals

addCheese.addEventListener('change', getCheeseTotal, false);

function getCheeseTotal() {
	let addCheese = $('addCheese');
		if (addCheese.value === 'double') {
			cheesePrice = 3.99;
		} else if (addCheese.value === 'extra') {
			cheesePrice = 2.99;
		} else {
			cheesePrice = 0;
		}
	
	console.log(cheesePrice);
	return cheesePrice;	
}


addSauce.addEventListener('change', getSauceTotal, false);

function getSauceTotal() {
	let addSauce = $('addSauce');
		if (addSauce.value === 'bbq') {
    		saucePrice = 1.99;
  		} else if (addSauce.value === 'hearty') {
    		saucePrice = 0.99;
  		} else {
    		saucePrice = 0;
		}

	console.log(saucePrice);
	return saucePrice;
}


addToppings.addEventListener('change', getToppingsTotal, false);

function getToppingsTotal() {
	let toppings; 
	let toppingsPrice = 0;
	let i = 0;
	let cost = .99;
		while (toppings = document.getElementsByName("toppings")[i++]) {
			if (toppings.checked) { 
			toppingsPrice = toppingsPrice + cost;
			}
		}
	
	console.log(toppingsPrice);
    return toppingsPrice;
	}

// Show total balance

chooseDough.addEventListener('change', getPizzaTotal, false);
addCheese.addEventListener('change', getPizzaTotal, false);
addSauce.addEventListener('change', getPizzaTotal, false);
addToppings.addEventListener('change', getPizzaTotal, false);

function getPizzaTotal() {
	totalPrice = getDoughTotal() + getCheeseTotal() + getSauceTotal() + getToppingsTotal();
	displayTotal.innerHTML = '<h3>Order Total: $' + parseFloat(totalPrice.toFixed(2)) + '</h3>';
}

// Finished Building Pizza Button

let submit1 = $('submit1');
submit1.addEventListener('click', (e) => {
	e.preventDefault();

	if (validateName() === false) {
		customerName.focus();
		return false;
	} else if (validateAddress() === false) {
		address.focus();
		return false;
	} else if (validateAddressType() === false) {
		addressType.focus();
		return false;
	} else if (validateCity() === false) {
		city.focus();
		return false;
	} else if (validateState() === false) {
		state.focus();
		return false;
	} else if (validateZip() === false) {
		zip.focus();
		return false;
	} else if (validatePhone() === false) {
		phone.focus();
		return false;
	} else if (validateEmail() === false) {
		email.focus();
		return false;
	} else if (mustChooseDough() === false) {
		pizzaSize.focus();
		return false;
	} else {
		let yes = confirm('Click OK to continue or cancel to make changes to your order'); {
		if (yes) {
			showDelivery.style.display = 'none';
			showBilling.style.display = 'block';
		} else {
			customerName.focus();
		}
	}
	};

})



// // Billing ------------------------------------------------------------------------------


let customerName2 = $('customerName2');
let address2 = $('address2');
let aptNum2 = $('number2')
let addressType2 = $('addressType2');
let otherBox2 = $('otherBox2');
let city2 = $('city2');
let state2 = $('state2');
let zip2 = $('zip2');
let cvc = $('cvc');
let expMonth = $('expMonth');
let expYear = $('expYear');
let ccNumber = $('ccNumber');

// Hidden Other Box 

function enableOtherBox2() {
	if (addressType2.value === "other") {
    	otherBox2.style.display = "block";
    } else {
        otherBox2.style.display = "none";
    }
}

addressType2.addEventListener('change', enableOtherBox2);


// // Validate Billing

let cvcRegex = /^[0-9]{3,4}$/;


function validateName2() {
	if (nameRegex.test(customerName2.value)) {
		return true;
	} else if (customerName2.value === '') {
		alert('Please enter your name');
		return false;
	} else {
		alert("Please enter a valid first and last name");
		return false;
	};
}

function validateAddress2() {
	if (address2.value === '') {
		alert('Please enter your address');
		return false;
	};
}

function validateAddressType2() {
	if (addressType2.value === '') {
		alert('Please select an address type');
		return false;
	};
}

function validateCity2() {
	if (city2.value === '') {
		alert('Please enter a city');
		return false;
	};
}

function validateState2() {
	if (stateRegex.test(state2.value)) {
		return true;
	} else if (state2.value === '') {
		alert('Please enter your state');
		return false;
	} else {
		alert("Please enter a valid state");
		return false;
	}
}

function validateZip2() {
	if (zipRegex.test(zip2.value)) {
		return true;
	} else if (zip2.value === '') {
		alert('Please enter your zip code');
		return false;
	} else {
		alert("Please enter a valid zip code");
		return false;
	}
}

// Validate credit card

function luhnFormula() {

	let ccNum = ccNumber.value;
    let ccNumSplit = ccNum.split("");
	let ccNumReversed = ccNumSplit.reverse();
	let i; 
	let ccNumDoubled; 
	let ccNumTotal; 
	let doubled;

	for (i = 1; i < ccNumReversed.length; i = i + 2) {
		ccNumReversed[i] = ccNumReversed[i] * 2;
	}

	ccNumDoubled = ccNumReversed.join("").split("");
	ccNumTotal = 0;

	for (i = 0; i < ccNumDoubled.length; i++) {
		doubled = parseInt(ccNumDoubled[i], 10);
		ccNumTotal += doubled;
	}

	checkSum = ccNumTotal / 10;

	if (ccNumTotal % 10 !== 0) {
		card.innerHTML = '<p>The card number is invalid</p>';
		console.log('invalid');
		return false;
	} else if (ccNumTotal % 10 === 0) {
		window.console.log("valid");
		return true;
	}
}


let numRegex1 = /^[0-9]{13}$/;
let numRegex2 = /^[0-9]{15}$/;
let numRegex3 = /^[0-9]{16}$/;
let numericOnly = /^[0-9]$/;

let prefix1 = /^4/;
let prefix2 = /^37/;
let prefix3 = /^5[1-5]/;

function validateCreditCard() {
	if ((numRegex2.test(ccNumber.value)) && (prefix2.test(ccNumber.value)))  {
		card.innerHTML = '<p>The card entered is an Amex</p>';
		console.log('amex');
		luhnFormula()
		return true;
	} else if ((numRegex1.test(ccNumber.value)) && (prefix1.test(ccNumber.value))) {
		card.innerHTML = '<p>The card entered is a Visa</p>';
		console.log('visa');
		luhnFormula()
		return true;
	} else if ((numRegex3.test(ccNumber.value)) && (prefix1.test(ccNumber.value))) {
		card.innerHTML = '<p>The card entered is a Visa</p>';
		console.log('visa');
		luhnFormula()
		return true;
	} else if ((numRegex3.test(ccNumber.value)) && (prefix3.test(ccNumber.value))) {
		card.innerHTML = '<p>The card entered is a Mastercard</p>';
		console.log('mastercard');
		luhnFormula()
		return true;
	} else if (ccNumber.value === '') {
		alert('Please enter a card number');
		card.innerHTML = '<p>Please enter a credit card number</p>';
		return false;
	} else if (numericOnly.test(ccNumber.value) === false) {
		alert('Please enter a valid card number');
		console.log('Numeric only');
		card.innerHTML = '<p>Please use numbers only</p>';
		return false;
	} else {
		alert('Please enter a valid card number');
		card.innerHTML = '<p>Please enter a valid card number</p>';
		return false;
	};
}

// End of cc validation

function validateCvc() {
	if (cvcRegex.test(cvc.value)) {
		return true;
	} else if (cvc.value === '') {
		alert('Please enter your CVC code');
		return false;
	} else {
		alert("Please enter a valid CVC code");
		return false;
	};
}

function validateExpMonth() {
	if (expMonth.value === '') {
		alert('Please select an expiration month');
		return false;
	};
}

function validateExpYear() {
	if (expYear.value === '') {
		alert('Please select an expiration year');
		return false;
	};
}


billingInfo.addEventListener('submit', (e) => {
	e.preventDefault();

	if (validateName2() === false) {
		customerName2.focus();
		return false;
	} else if (validateAddress2() === false) {
		address2.focus();
		return false;
	} else if (validateAddressType2() === false) {
		addressType2.focus();
		return false;
	} else if (validateCity2() === false) {
		city2.focus();
		return false;
	} else if (validateState2() === false) {
		state2.focus();
		return false;
	} else if (validateZip2() === false) {
		zip2.focus();
		return false;
	} else if (validateCreditCard() === false) {
		ccNumber.focus();
		return false;
	} else if (validateCvc() === false) {
		cvc.focus();
		return false;
	} else if (validateExpMonth() === false) {
		expMonth.focus();
		return false;
	} else if (validateExpYear() === false) {
		expYear.focus();
		return false;
	} else {
		alert('Your order has been successfully submitted.');
	};

})

// // Billing Same as Delivery

let billingCheck = $('billingCheck');

function copyDeliveryInfo() {
  if(billingCheck.checked === true) {
    customerName2.value= customerName.value;
    address2.value = address.value;
	aptNum2.value = aptNum.value
    addressType2.value = addressType.value;
    city2.value = city.value;
    state2.value = state.value;
    zip2.value = zip.value;
  } else {
    customerName2.value = "";
    address2.value = "";
	aptNum2.value = "";
    city2.value = "";
    state2.value = "";
    zip2.value = "";
  };
}

billingCheck.addEventListener('change', copyDeliveryInfo);

})
