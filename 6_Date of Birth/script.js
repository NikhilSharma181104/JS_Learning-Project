let userInput = document.getElementById("birth-date");
userInput.max = new Date().toISOString().split("T")[0];

let result = document.getElementById("result");

function calculateAge(){
    if(userInput.value === ""){
        result.innerHTML = '<span style="color: red;">Please enter your birth date!</span>';
        return;
    }

    let birthDate = new Date(userInput.value);

    let d1 = birthDate.getDate();
    let m1 = birthDate.getMonth() + 1;
    let y1 = birthDate.getFullYear();

    let today = new Date();

    let d2 = today.getDate();
    let m2 = today.getMonth() + 1;
    let y2 = today.getFullYear();

    let date, month, year;
    year = y2 - y1;

    if(m2 >= m1){
        month = m2 - m1;
    }
    else{
        month = 12 + m2 - m1;
        year--;
    }

    if(d2 >= d1){
        date = d2 - d1;
    }
    else{
        date = getDaysinMonth(y2, m2) + d2 - d1;
        month--;
    }

    if(month<0){
        month = 11;
        year--;
    }
    result.innerHTML = `You are <span>${year}</span> years, <span>${month}</span> months and <span>${date}</span> days old!`;
}

function getDaysinMonth(year, month){
    return new Date(year, month, 0).getDate();
}

const calculateBtn = document.querySelector("button");
calculateBtn.addEventListener("click", calculateAge);

function reset(){
    userInput.value = "";
    result.innerHTML = "";
}