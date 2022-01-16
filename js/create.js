import {
   emailValidation,
   passwordValidation
} from './validation.js';

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

import throttle from "./trorrle/throttle.js";


//получение карточек с сервера
const allCard = async (userToken) => {
   const {
      data,
      status
   } = await axios.get('https://ajax.test-danit.com/api/v2/cards', {
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${userToken}`,
      }
   });

   if (status === 200) {
      const title = document.createElement("div");
      if (!data || data.length === 0) {
         title.innerHTML = `<h3 class = "title">No items have been added </h3>`;
         document.querySelector(".container").append(title);
      } else {
         title.remove();
         data.forEach(element => {

            if (element.doctor === "cardiologist") {
               const elem = new Cardiologist(element.id, element).render();
               document.querySelector(".container").append(elem);
            }
            if (element.doctor === "dentist") {
               const elem = new Dentist(element.id, element).render();
               document.querySelector(".container").append(elem);
            }
            if (element.doctor === "therapist") {
               const elem = new Therapist(element.id, element).render();
               document.querySelector(".container").append(elem);
            }
         })
      }
   }

}
const userToken = localStorage.getItem("authToken");
window.addEventListener("load", () => {
   const userToken = localStorage.getItem("authToken");
   if (userToken !== "") {
      allCard(userToken);
   }

})

//клик по кнопке залогиниться

document.querySelector('.button__entry').addEventListener("click", () => {
   location.href = "index.html";
   localStorage.clear();

})

const form = new Form();

//создание карточки
const onChooseElem = () => {
   const selectedValue = form.getSelectValue();
   const inputsValues = form.getInputsValues();
   const object = Object.values(inputsValues);
   const filter = object.filter(elem => elem === "")
   if (filter.length > 0) {
      alert("Заполните все поля");
   } else {
      const createCard = async () => {
         const authToken = localStorage.getItem("authToken");
         const {
            data,
            status
         } = await axios.post('https://ajax.test-danit.com/api/v2/cards', inputsValues, {
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${authToken}`,
            }
         });

         if (status === 200) {
            const title = document.querySelector(".title");
            if (title) {
               title.remove();
            }


            localStorage.setItem(`user${data.id}`, JSON.stringify(data));
            const values = JSON.parse(localStorage.getItem(`user${data.id}`));
            if (selectedValue === "cardiologist") {
               const elem = new Cardiologist(values.id, values).render();
               document.querySelector(".container").append(elem);
            }
            if (selectedValue === "dentist") {
               const elem = new Dentist(values.id, values).render();
               document.querySelector(".container").append(elem);
            }
            if (selectedValue === "therapist") {
               const elem = new Therapist(values.id, values).render();
               document.querySelector(".container").append(elem);
            }
         }
      }
      createCard();
   }
}


//клик на кнопку создать визит
document.querySelector(".button__create-visit").addEventListener("click", () => {
   new Modal(form.render(), onChooseElem).render();
})


//фильтр

function renderDoctors (data) {

   data.forEach(element => {
      if (element.doctor === "cardiologist") {
         const elem = new Cardiologist(element.id, element).render();
         document.querySelector(".container").append(elem);
      }
      if (element.doctor === "dentist") {
         const elem = new Dentist(element.id, element).render();
         document.querySelector(".container").append(elem);
      }
      if (element.doctor === "therapist") {
         const elem = new Therapist(element.id, element).render();
         document.querySelector(".container").append(elem);
      }
   })
}

const searchFilter = document.querySelector("#search");
const statusFilter = document.querySelector("#status");
const priorityFilter = document.querySelector("#priority");


      async function filterCards() {
         const {
            data,
            status
         } = await axios.get('https://ajax.test-danit.com/api/v2/cards', {
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${userToken}`,
            }
         });

         if (status === 200) {
            const filterByInput = data.filter ((card) => {
               document.querySelector('.container').innerHTML = '';
               return card.doctor.toLowerCase().includes(searchFilter.value.toLowerCase());
            });

            if (priorityFilter.value !== "" && statusFilter.value === "") {
               const filterByPriority = filterByInput.filter(card => card.urgency.toLowerCase() === priorityFilter.value.toLowerCase())
               renderDoctors(filterByPriority)
            } else if (statusFilter.value !== "" && priorityFilter.value === ""){
               const filterByStatus = filterByInput.filter(card => card.status.toLowerCase() === statusFilter.value.toLowerCase());
               renderDoctors(filterByStatus)
            } else if (statusFilter.value !== "" && priorityFilter.value !== ""){
               const filterByStatus = filterByInput.filter(card => card.status.toLowerCase() === statusFilter.value.toLowerCase());
               const filterByPriority = filterByStatus.filter(card => card.urgency.toLowerCase() === priorityFilter.value.toLowerCase());
               renderDoctors(filterByPriority)
            } else {
               renderDoctors(filterByInput)
            }
         };

      };

searchFilter.addEventListener("input", throttle(() => {
      filterCards();
}, 500));
priorityFilter.addEventListener("change", filterCards);
statusFilter.addEventListener("change", filterCards);


