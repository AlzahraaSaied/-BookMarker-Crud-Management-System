const siteNameInput = document.getElementById('siteName');
const urlNameInput = document.getElementById('siteUrl');
var pID
var siteContainer = [];


if (localStorage.getItem('site') == null) {
    siteContainer = [];
}

else {
    siteContainer = JSON.parse(localStorage.getItem('site'));
    displaySite();
}


// function for adding data into the table the system
function siteSubmit() {

    var site = {
        code: capitalizeFirstLetter(siteNameInput.value),
        ur: urlNameInput.value,
    }

    if(site.code =="" || site.ur ==""){
        var alertDiv=document.getElementById("alertDiv");
        alertDiv.innerHTML= `<div class="position-fixed top-0 bottom-0 start-0 end-0 bg-whiteTrans d-flex justify-content-center align-items-center">
        <div class="rounded bg-white w-div position-relative shadow-lg">
        <i class="fa-solid fa-xmark fs-3 position-absolute end-0 pe-2 pt-2" onclick="closeDiv()" role="button" style="color: rgba(0, 0, 0 , 0.8);"></i>
        <h5 class="text-black pt-5 px-4">Site Name or Url is not valid, Please follow the rules below :</h5>
        <div class="d-flex flex-nowrap px-4 pt-3"><i class="fa-solid fa-circle-arrow-right pt-1" style="color: #fc3503;"></i><p class="text-black ps-2" >Site name must contain at least 3 characters</p>
        </div>
        <div class="d-flex flex-nowrap px-4 pt-3"><i class="fa-solid fa-circle-arrow-right pt-1" style="color: #fc3503;"></i><p class="text-black ps-2">Site URL must be a valid one</p>
        </div>
        </div>
        </div>`;
        alertDiv.classList.replace("d-none","d-block")
        return false;
    }
    else{
        siteContainer.push(site);
        clearForm();
        displaySite();
        localStorage.setItem('site', JSON.stringify(siteContainer));
        return true;
    }

    
}
// the function for capitalize any siteName 
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// function to clear all data fields after adding the data into the table
function clearForm() {
    siteNameInput.value = null;
    urlNameInput.value = null;
    siteNameInput.classList.remove('is-valid');
    urlNameInput.classList.remove('is-valid');
}

// displaying the data in the table 
function displaySite() {
    var cartona = `<tr>
        <th class="pt-2 ">Index</th>
        <th class="pt-2 ">Website Name</th>
        <th class="pt-2">Visit</th>
        <th class="pt-2">Delete</th>
        <th class="pt-2">Update</th>
        </tr>
        <tr><td colspan="5"><hr></td></tr>`;
    for (var i = 0; i < siteContainer.length; i++) {
        cartona += `<tr>
        <td>${i + 1}</td> 
        <td>${siteContainer[i].code}</td>
        <td><button class="btn btn-success bo" onclick="openURL('${siteContainer[i].ur}')" type="button"><i class="fa-solid fa-eye pe-2" style="color: #ffffff;"></i>Visit</button></td>
        <td><button class="btn btn-danger bo" onclick="deleteSite(${i})"  type="button"><i class="fa-solid fa-trash-can pe-2" style="color: #ffffff;"></i>Delete</button></td>
        <td><button class="btn btn-warning text-white bo" onclick="setUpdateForm(${i})" type="button"><i class="fa-solid fa-pen-to-square pe-2" style="color: #ffffff;"></i> Update</button></td>
    </tr>`;
    if (i < siteContainer.length - 1) { 
        cartona += `<tr><td colspan="5"><hr></td><div class="mb-3"></div></tr>`; 
    }
    }
    document.getElementById('siteData').innerHTML = cartona;
}

//view the link of the website

function openURL(url) {
    window.open(url, '_blank');
}

// delete a target website
function deleteSite(index) {
    siteContainer.splice(index, 1);
    localStorage.setItem('site', JSON.stringify(siteContainer));
    displaySite();
}

// update target website data with a visible-hidden button
function setUpdateForm(index) {
    pID = index
    siteNameInput.value = siteContainer[index].code;
    urlNameInput.value = siteContainer[index].ur;
    updatebtn.classList.replace('d-none', 'd-block');
    addbtn.classList.replace('d-block', 'd-none');
}

function updateSite() {
    var site = {
        code: siteNameInput.value,
        ur: urlNameInput.value,
    }
    siteContainer.splice(pID, 1, site)
    localStorage.setItem('site', JSON.stringify(siteContainer))
    displaySite(siteContainer)
    clearForm()
    updatebtn.classList.replace('d-block', 'd-none');
    addbtn.classList.replace('d-none', 'd-block');

}

//making validation on the input fields(siteName & siteUrl)
function validationInputs(element) {
    var regex = {
        siteName: /^[A-Za-z0-9\-_]{3,}(?:\s[A-Za-z0-9\-_]+)*$/,
        siteUrl: /^(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9\-_]+(?:\.[a-zA-Z]{2,})+(?:\/[^\/?#]*)?(?:\?[^?#]*)?(?:#[^\s]*)?$/
    };

    if (regex[element.id].test(element.value)) {
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
        return true;
    } else {
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
        return false;
    }
}


function closeDiv(){
    var alertDiv=document.getElementById("alertDiv");
    alertDiv.classList.replace("d-block","d-none");
}


document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeDiv();
    }
});