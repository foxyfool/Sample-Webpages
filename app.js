var currentTab = 1;

let nextButton = document.getElementById("next")
let prevButton = document.getElementById("prev")


const isPassword = (value) => {
    let validInput = false;
    if(value.length < 8) {
        validInput = "* Password should have atleast 7 characters";
    }
    return validInput;
}
const isConfirmPassword = (value) => {
    let validInput = false;
    if(value == "" || value != userData.step1.password.inputValue) {
        validInput = "* Password does not match";
    }
    return validInput;
}

const isUsername = (value) => {
    let validInput = false;
    if(!/[A-Z][a-zA-Z0-9]\w+/.test(value)) {
        validInput = "* Username should start with Uppercase followed by Alpha numeric values";
    }
    return validInput;
}
const isEmpty = (value) => {
    let validInput = false;
    if(value.trim() == "") {
        validInput = "* Field cannot be empty";
    }
    return validInput;
}
const isName = (value) => {
    let validInput = false;
    
    if(!/^[A-Z a-z 0-9]{2,25}$/.test(value)) {
        validInput = "* Enter Valid Name";
    }
    return validInput;
}
const isPhoneNumber = (value) => {
    let validInput = false;
    
    if(parseInt(value).toString().length < 10) {
        validInput = "* Enter Valid 10 digit Phone Number";
    }
    return validInput;
}
const isEmail = (value) => {
    let validInput = false;
    
    if(!/^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?manipal\.edu$/.test(value)) {
        validInput = "* Enter Valid email address";
    }
    return validInput;
} 
const isUrl = (value) => {
    let validInput = false;
    
    if(!/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(value)) {
        validInput = "*Enter Valid url";
    }
    return validInput;
}
const isValidMark = (value) => {
    let validInput = false;
    
    if(value == "" || parseInt(value) > 10 || parseInt(value) < 0) {
        validInput = "* Enter valid marks < 10";
    }
    return validInput;
} 

let userData = {
    step1: {
        username: {
            validator: isUsername,
            inputValue: "",
        },
        password: {
            validator: isPassword,
            inputValue: "",
        },
        cpassword: {
            validator: isConfirmPassword,
            inputValue: "",
        }
    },
    step2: {
        firstName: {
            validator: isName,
            inputValue: "",
        },
        lastName: {
            validator: isName,
            inputValue: "",
        },
        gender: {
            validator: isEmpty,
            inputValue: "",
        },
        nationality: {
            validator: isEmpty,
            inputValue: "",
        },
        dob: {
            validator: isEmpty,
            inputValue: ""
        }
    },
    step3: {
        email: {
            validator: isEmail,
            inputValue: "",
        },
        phoneNumber: {
            validator: isPhoneNumber,
            inputValue: "",
        },
        address: {
            validator: isEmpty,
            inputValue: "",
        }, 
    },
    step4: {
        twitter: {
            validator: isUrl,
            inputValue: "",
        },
        facebook: {
            validator: isUrl,
            inputValue: "",
        },
        google: {
            validator: isUrl,
            inputValue: "",
        }, 
    },
    step5: {
        ugCgpa: {
            validator: isValidMark,
            inputValue: "",
        },
        pgCgpa: {
            validator: isValidMark,
            inputValue: "",
        },
        project1: {
            validator: isEmpty,
            inputValue: "",
        }, 
        project2: {
            validator: isEmpty,
            inputValue: "",
        }, 
        project3: {
            validator: isEmpty,
            inputValue: "",
        }, 
    },
}

const renderTab = (value) => {
    currentTab += value;
    let arr = document.getElementsByClassName("contentContainer");
    let indicators = document.getElementsByClassName("indicator");

    Object.values(arr).forEach(val => {
        val.style.display = "none";
        if(val.className.includes("tab" + currentTab)) {
            val.style.display = "flex";
        }
    })
    Object.values(indicators).forEach((val,index) => {
        val.classList.remove("active");
        if((index+1) == currentTab) {
            val.classList.add("active");
        }
    })
    if(currentTab == 1)
        prevButton.style.visibility = "hidden";
    else   
        prevButton.style.visibility = "visible";

    if(currentTab >= 5)
        nextButton.innerText = currentTab == 5 ? "Display Values" : "Submit Form";
    else
        nextButton.innerHTML = "Next";
 
    if(currentTab == 6) {
        displayOutput();
    }
    if(currentTab >= 7) {
        document.getElementById("footer").style.display = "none";
    }
}
const displayOutput = () => {
    let stringHtml = "";
    Object.keys(userData).forEach(stepKey => {
        Object.keys(userData[stepKey]).forEach(valueKey => {
            stringHtml +=
                `
                    <div class="card">
                        <p>${valueKey}:</p>
                        <span>${userData[stepKey][valueKey].inputValue}</span>
                    </div>
                `;

        })
    })
    document.getElementById("displayHere").innerHTML = stringHtml;
}
const validateForm = (value) => {
    let validInput = true;
    if(currentTab <= 5) {
        Object.keys(userData["step" + currentTab]).forEach(key => {
            let element = document.getElementById(key);
            let elementError = document.getElementById(key + "-error")
 
            let isValid = userData["step" + currentTab][key].validator(element.value);
            if(isValid) {
                elementError.innerText = isValid;
                element.classList.add("errorInput") 
                validInput = false;
            } else {
                elementError.innerText = "";
                element.classList.remove("errorInput") 
                userData["step" + currentTab][key].inputValue = element.value;
            }
        }) 
    } else {
        renderTab(value)
    }
    if(validInput)
        renderTab(value)
}
renderTab(0);
