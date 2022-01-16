import {
   emailValidation,
   passwordValidation
} from './validation.js'
import {
   Modal
} from "./card/Modal.js";
import {
   Form
} from "./card/Form.js";

import {
   Cardiologist,
   Dentist,
   Therapist
} from "./card/Doctor.js";


document.querySelector(".button__entry").addEventListener("click", () => {
   document.querySelector(".log_in").style.display = "none";
   document.querySelector(".container-form").style.display = "block";
})




//клик по кнопке залогиниться
const entry = document.querySelector(".button__submit");
if (entry) {
   document.querySelector('#email').addEventListener('input', emailValidation);
   document.querySelector('#password').addEventListener('input', passwordValidation);
   document.querySelector(".form").addEventListener("submit", (e) => {
      e.preventDefault();
      if(localStorage.getItem("authToken") === "Incorrect username or password" || localStorage.length === 0){
         return alert("Incorrect username or password");
      }
      if(localStorage.getItem("authToken") !== "Incorrect username or password"){
         const values = {};
         const inputsValues = document.querySelectorAll("input");
         inputsValues.forEach(({
                                  name,
                                  value
                               }) => {
            values[name] = value;
            return values;
         });
         const login = async () => {
            const {
               data,
               status
            } = await axios.post('https://ajax.test-danit.com/api/v2/cards/login', values, {
               headers: {
                  'Content-Type': 'application/json'
               }
            });
            values["authToken"] = data;
            if (status === 200) {
               const user = localStorage.getItem("authToken");
               if (!user) {
                  localStorage.setItem("authToken", data);
                  alert("спасибо за регистрацию")
               } else {
                  if (user === data) {
                     localStorage.setItem("authToken", data);
                     alert("вход разрешен");
                  }
               }
            }
         }
         login();
      }
      setTimeout(() => {
         location.href = "create.html"
      }, 2000);
   })
}
export const userToken = localStorage.getItem("authToken");