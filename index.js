let userForm = document.getElementById("user-form");
const email = document.getElementById('email');
const dob = document.getElementById('dob');
const acceptTerms = document.getElementById('acceptTerms');
const submitButton = document.querySelector('button[type="submit"]');

email.addEventListener('input', () => validate(email));
dob.addEventListener('input', () => validate(dob));
acceptTerms.addEventListener('change', () => validate(acceptTerms));

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    validate(email);
    validate(dob);
    validate(acceptTerms);

    if (email.checkValidity() && dob.checkValidity() && acceptTerms.checkValidity()) {
        saveUserForm(event);
    }
});

function validate(element) {
    if (element.validity.typeMismatch) {
        element.setCustomValidity("The Email is not in the right format!!!");
        element.reportValidity();
    } else if (element === dob && !validateDateOfBirth(element.value)) {
        element.setCustomValidity("Invalid Date of Birth. Age must be between 18 and 55.");
        element.reportValidity();
    } else if (element === acceptTerms && !element.checked) {
        element.setCustomValidity("You must accept the Terms & Conditions.");
        element.reportValidity();
    } else {
        element.setCustomValidity('');
    }
}

function validateDateOfBirth(dateString) {
    const today = new Date();
    const birthDate = new Date(dateString);
    const age = today.getFullYear() - birthDate.getFullYear();

    return age >= 18 && age <= 55;
}

const retrieveEntries=()=>{
    let entries=localStorage.getItem("user-entries");
    if(entries){
        entries=JSON.parse(entries);
    }else{
        entries=[];
    }
    return entries;
}
let userEntries = retrieveEntries();

const displayEntries =()=>{
    const entries =retrieveEntries();

    const tableEntries = entries.map((entry) => {

    const nameCell = `<td class="border px-4 py-2">${entry.name}</td>`;
    
    const emailCell = `<td class='border px-4 py-2'>${entry.email}</td>`; 
    const passwordCell = `<td class='border px-4 py-2'>${entry.password}</td>`;
    
    
    
    const dobCell = `<td class='border px-4 py-2'>${entry.dob}</td>`;
    
    const acceptTermsCell = `<td class='border px-4 py-2'>${entry.acceptedTermsAndConditions}</td>`;
    
    
    const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell})</tr>`;
    
    
    return row;
    
    
    }).join("\n");
    
    const table = `<table class="table-auto w-full"><tr>
    <th class="px-4 py-2">Name</th>

    <th class="px-4 py-2">Email</th>

    <th class="px-4 py-2">Password</th>

    <th class="px-4 py-2">dob</th>

    <th class="px-4 py-2">accepted terms?</th>

    </tr>${tableEntries} </table>`;

let details = document.getElementById("user-entries"); 
details.innerHTML = table;
}
    
    

const saveUserForm=(event)=>{
    event.preventDefault();

    const name=document.getElementById("name").value;
    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;
    const dob=document.getElementById("dob").value;
    const acceptedTermsAndConditions=document.getElementById("acceptTerms").checked;


    const entry={
        name,
        email,
        password,
        dob,
        acceptedTermsAndConditions
    };

    userEntries.push(entry)

    localStorage.setItem("user-entries",JSON.stringify(userEntries))
    displayEntries();


}
userForm.addEventListener("submit",saveUserForm);
displayEntries();
