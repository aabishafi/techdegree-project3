//putting on focus for the first input field
const focusField = document.getElementById('name').focus();
//job role section
const jobTitle = document.getElementById('title')
const newField = document.getElementById('other-title');
newField.style.display = 'none'; //hide the input field
//adding eventListener that will reveal the text field when other option is selected
jobTitle.addEventListener('change', (e) => {
    if (e.target.value === 'other') {
        newField.style.display = 'block';
    } else {
        newField.style.display = 'none';
    }
});

//T-shirt info section
const jsPuns = document.getElementById('colors-js-puns');
jsPuns.style.display = 'none';
const design = document.getElementById('design');
const color = document.getElementById('color');


//create a default option that says 'Please select a T-shirt theme'
const defaultOption = document.createElement('option');
defaultOption.textContent = 'Please select a T-shirt theme';
color.appendChild(defaultOption);
defaultOption.setAttribute("selected", true);

/*adding event listener that will show the right options when 'js puns' is selected and when 'heart js' selected*/
design.addEventListener('change', (e) => {
    if (e.target.value === 'js puns') {
        jsPuns.style.display = 'block';
        for (let i = 0; i <= 5; i++) {
            color[i].style.display = 'block';
        }
        for (let i = 3; i <= 5; i++) {
            color[i].style.display = 'none';
        }
        color[0].selected = true;
    } else if (e.target.value === 'heart js') {
        jsPuns.style.display = 'block';
        for (let i = 0; i <= 5; i++) {
            color[i].style.display = 'block';
        }
        for (let i = 0; i <= 2; i++) {
            color[i].style.display = 'none';
        }
        color[3].selected = true;
    } else {
        jsPuns.style.display = 'none';
    }
});

//activity section


let totalActivityCost = 0;
const totalCost = document.createElement('h3');
const activitiesDiv = document.querySelector('.activities');
activitiesDiv.appendChild(totalCost);
const courseOptions = activitiesDiv.getElementsByTagName('input');

//Event listener checking checkboxes
activitiesDiv.addEventListener('change', (e) => {
    if (e.target.tagName === 'INPUT') {
        let checkbox = e.target;
        if (checkbox.checked) {
            //Checking and disabling the same time activities
            let chosenData = checkbox.getAttribute('data-day-and-time');
            for (let i = 1; i < courseOptions.length; i++) {
                let data = courseOptions[i].getAttribute('data-day-and-time');
                if (data === chosenData) {
                    if (courseOptions[i] !== checkbox) {
                        courseOptions[i].setAttribute('disabled', true);
                    }
                }
            }
            //Calculating total cost of all activities (+)
            let parent = checkbox.parentNode;
            let courseCost = checkbox.getAttribute('data-cost');
            let courseCostNumber = parseInt(courseCost, 10);
            totalActivityCost += courseCostNumber;
        } else if (checkbox.checked == false) {
            //Checking and enabling the same time activities
            let chosenData = checkbox.getAttribute('data-day-and-time');
            for (let i = 1; i < courseOptions.length; i++) {
                let data = courseOptions[i].getAttribute('data-day-and-time');
                if (data === chosenData && courseOptions[i] !== checkbox) {
                    courseOptions[i].removeAttribute('disabled');
                }
            }
            //Calculating total cost of all activities (-)
            let parent = checkbox.parentNode;
            let courseCost = checkbox.getAttribute('data-cost');
            let courseCostNumber = parseInt(courseCost, 10);
            totalActivityCost -= courseCostNumber;
        }
    }
    totalCost.textContent = `Total Cost:  $${totalActivityCost}`;
});

//payment info section

//global variables for payment info section
const payment = document.getElementById('payment');
const creditCard = document.getElementById('credit-card');
const payPal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');
//hide payPal and bitcoin
payPal.style.display = 'none';
bitcoin.style.display = 'none';
//make credit card as a default option
payment.options[1].selected = true;
document.querySelector('option[value="select method"]').style.display = 'none';
//add eventListener that changes to right info when option is select
payment.addEventListener('change', () => {
    const paymentType = payment.options[payment.selectedIndex].value;
    if (paymentType === 'credit-card') {
        creditCard.style.display = 'block';
        payPal.style.display = 'none';
        bitcoin.style.display = 'none';
    } else if (paymentType === 'paypal') {
        creditCard.style.display = 'none';
        payPal.style.display = 'block';
        bitcoin.style.display = 'none';
    } else if (paymentType === 'bitcoin') {
        creditCard.style.display = 'none';
        payPal.style.display = 'none';
        bitcoin.style.display = 'block';
    } else {
        creditCard.style.display = 'block';
        payPal.style.display = 'none';
        bitcoin.style.display = 'none';
    }

})

//form validation


//name field can not be blank
const name = document.getElementById("name"); //grab name field from form
const errorName = document.createElement('span'); //create element for error message
errorName.className = 'error';
errorName.textContent = 'name field can not be empty';
name.appendChild(errorName);
const validName = document.createElement('span'); //create element for valid name format
validName.className = 'error';
validName.textContent = 'please fill with a valid name format, no numbers or symbols';
name.appendChild(validName);
//function to validate the name input. Error message will appear if name input left blank or if name includes symbols, numbers, double or trailing spaces, or more than 4 first names/last names
const nameValidation = event => {

    //error message to display only when name input left blank
    if (name.value === '') {
        name.parentNode.insertBefore(errorName, name.nextElementSibling);
        errorName.style.display = '';
        name.style.borderColor = 'red';
        validName.remove();
        event.preventDefault();

        //display another error message when input name is not blank but it does not match requirements
    } else if (!(/^[a-z]+( ||-)[a-z]+(( ||-)[a-z]+( ||-)[a-z]+)?$/.test(name.value))) {
        errorName.style.display = 'none';
        errorName.remove();
        name.parentNode.insertBefore(validName, name.nextElementSibling);
        validName.style.display = '';
        name.style.borderColor = 'red';
        event.preventDefault();

        //remove all error messages when input name matches all criteria
    } else {
        name.style.borderColor = '';
        errorName.style.display = 'none';
        validName.style.display = 'none';
        errorName.remove();
        validName.remove();
    }
};
//event listener for name 
name.addEventListener("input", (event) => {
    nameValidation(event);
});
name.addEventListener("blur", (event) => {
    nameValidation(event);
});

//Email field must be a validly formatted e-mail address
const email = document.getElementById("mail"); //grab email field from form;
const errorEmail = document.createElement('span');
errorEmail.textContent = 'email field can not be empty, please type in your email';
errorEmail.className = 'error';
email.appendChild(errorEmail);
const validEmail = document.createElement('span');
validEmail.className = 'error';
validEmail.textContent = 'please type valid email format';
email.appendChild(validEmail);
//function to validate the email input. Error message will appear if email input left blank or if format does not match that of a valid email address
const emailValidation = event => {

    //error message to display only when email input left blank
    if (email.value === '') {
        email.parentNode.insertBefore(errorEmail, email.nextElementSibling);
        errorEmail.style.display = '';
        email.style.borderColor = 'red';
        validEmail.remove();
        event.preventDefault();

        //display another error message when email input is not blank but input is not a valid email address
    } else if (!(/^[^@]+@[^@.]+\.[a-z]+$/i.test(email.value))) {
        errorEmail.style.display = 'none';
        errorEmail.remove();
        email.parentNode.insertBefore(validEmail, email.nextElementSibling);
        validEmail.style.display = '';
        email.style.borderColor = 'red';
        event.preventDefault();

        //remove all error messages when input is the the format of a valid email address
    } else {
        email.style.borderColor = 'white';
        errorEmail.style.display = 'none';
        validEmail.style.display = 'none';
        errorEmail.remove();
        validEmail.remove();
    }
};
//event listener for email
email.addEventListener("input", (event) => {
    emailValidation(event);
});
email.addEventListener("blur", (event) => {
    emailValidation(event);
});

//User must select at least one checkbox
//grab activities global variables
const activitiesInput = document.querySelectorAll(".activities input");
const activities = document.querySelector(".activities");
const activitiesError = document.createElement('span');
activitiesError.className = 'error';
activitiesError.textContent = 'please select at least  one activity';
activitiesError.style.display = 'none';
activities.appendChild(activitiesError);

const activitiesValidation = event => {

    for (let i = 0; i < activitiesInput.length; i++) {

        if (!activitiesInput[i].checked) {
            activities.parentNode.insertBefore(activitiesError, activities.nextElementSibling);
            activitiesError.style.display = '';
            activities.style.borderColor = 'red';
            event.preventDefault();

        }
    }
    for (let i = 0; i < activitiesInput.length; i++) {
        if (activitiesInput[i].checked) {
            event.preventDefault();
            activities.style.borderColor = 'none';
            activitiesError.style.display = 'none';
            activitiesError.remove();

        }
    }
};

//global variables for credit card
const credit = document.getElementById("cc-num"); //grab credit card from form
const creditError = document.createElement('span'); //create element for error message
creditError.className = 'error';
creditError.textContent = 'number must be  13 to 16 digits';
credit.appendChild(creditError);
//global variables for zipcode
const zipCode = document.getElementById("zip"); //grab zip code from form
const zipError = document.createElement('span'); //create element for zip error
zipError.className = 'error';
zipError.textContent = 'the zip code must be 5 digit long';
zipCode.appendChild(zipError);
//global variables for cvv
const cvv = document.getElementById("cvv");
const cvvError = document.createElement('span');
cvvError.className = 'error';
cvvError.textContent = 'please type in your 3 digit cvv number';
cvv.appendChild(cvvError);
const creditCardValidation = event => {
    //only validate credit card info if "credit card" is selected as the payment method
    if (payment.value === "credit card") {
        //Credit Card field should only accept a number between 13 and 16 digits
        //error message displayed when credit card number field left blank or 
        //is not in the format of a valid credit card number

        if (credit.value === "" || !/^[0-9]{13,16}$/.test(credit.value)) {
            credit.parentNode.insertBefore(creditError, credit.nextElementSibling);
            creditError.style.display = '';
            credit.style.borderColor = 'red';
            event.preventDefault();
        } else {
            credit.style.borderColor = '';
            creditError.style.display = 'none';
        }


        //error message displayed when zip code field left blank or is not in the format of a valid zip code 
        if (zipCode.value === '' || !(/^\d{5}$/.test(zipCode.value))) {
            zipCode.parentNode.insertBefore(zipError, zipCode.nextElementSibling);
            zipError.style.display = '';
            zip.style.borderColor = 'red';
            event.preventDefault();
        } else {
            zipCode.style.borderColor = '';
            zipError.style.display = 'none';
        }
        //The CVV should only accept a number that is exactly 3 digits long
        //error message displayed when cvv code field left blank or is not in the format of a cvv code 
        if (cvv.value === '' || !(/^\d{3}$/.test(cvv.value))) {
            cvv.parentNode.insertBefore(cvvError, cvv.nextElementSibling);
            cvvError.style.display = '';
            cvv.style.borderColor = 'red';
            event.preventDefault();
        } else {
            cvv.style.borderColor = '';
            cvvError.style.display = 'none';
        }
    }
};



//SUBMIT FORM EVENT LISTENER
const form = document.getElementsByTagName('form')[0];

form.addEventListener("submit", (event) => {
    nameValidation(event);
    emailValidation(event);
    activitiesValidation(event);
    creditCardValidation(event);


});