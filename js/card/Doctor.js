import {
   userToken

}
from "../script.js";
import {
   Modal
} from "./Modal.js";
import {
   editForm
} from "./Form.js";
const form = new editForm();




class Doctor {
   constructor(id) {
      this.id = id;
      this.container = document.createElement("div");
      this.deleteButton = document.createElement("button");
      this.editButton = document.createElement("button");
      this.showMore = document.createElement("button");
      this.text = document.createElement("div");
      this.text.innerHTML = "";

   }
   createElements() {

      this.container.className = "medcard";
      this.editButton.innerHTML = "Edit";
      this.showMore.innerHTML = "Show more";
      this.deleteButton.classList.add("delete__btn");
      this.deleteButton.setAttribute("title", "Delete the visit");
      this.editButton.classList.add("btn", "edit__btn");
      this.showMore.classList.add("btn", "show__btn");
      this.container.append(this.deleteButton);
      this.container.append(this.text);
      this.container.append(this.editButton);
      this.container.append(this.showMore);
      this.showMore.addEventListener('click', this.showInfo.bind(this));
      this.deleteButton.addEventListener('click', this.deleteCard.bind(this));
      this.editButton.addEventListener('click', this.editCard.bind(this));

   }

   showInfo() {
      const block = this.container.querySelector(".hideInfo");
      block.classList.toggle("showInfo");
   }
   deleteCard() {
      const deleteCard = async () => {
         const {
            data,
            status
         } = await axios.delete(`https://ajax.test-danit.com/api/v2/cards/${this.id}`, {
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${userToken}`,
            }
         });
         if (status === 200) {
            localStorage.removeItem(`user${this.id}`);
            this.container.remove();
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

               if (!data || data.length === 0) {
                  const title = document.createElement("div");
                  title.innerHTML = `<h3 class = "title">No items have been added</h3>`;
                  document.querySelector(".container").append(title);
               }

            }
         }


      }
      deleteCard();
   }
   showText() {

      const token1 = localStorage.getItem("authToken");
      const allCard = async () => {
         const {
            data,
            status
         } = await axios.get('https://ajax.test-danit.com/api/v2/cards', {
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${token1}`,
            }
         });

         if (status === 200) {
            if (!data || data.length === 0) {
               h2.innerHTML = "No items have been added";
               document.querySelector(".container").append(h2);
            }

         }
      }
   }


   editCard(e) {
      e.preventDefault();
      const cardInfo = JSON.parse(localStorage.getItem(`user${this.id}`));
      const userToken = localStorage.getItem("authToken");

      const onEdit = () => {
         const selectedValue = form.getSelectValue();
         const inputsValues = form.getInputsValues();
         const object = Object.values(inputsValues);
         object.forEach((elem, index) => {
            if (elem === "" || elem === "undefined") {
               alert("Fill all inputs");


            }

         })
         inputsValues.id = +`${this.id}`;
         const editCardserver = async () => {
            const {
               data,
               status
            } = await axios.put(`https://ajax.test-danit.com/api/v2/cards/${this.id}`, inputsValues, {
               headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${userToken}`,
               }
            });
            if (status === 200) {
               localStorage.setItem(`user${data.id}`, JSON.stringify(data));
               location.href = location.href;

            }
         }
         editCardserver();
      }
      new Modal(form.render(), onEdit).render();

   }

   render() {
      this.createElements();
      return this.container;
   }


}


export class Cardiologist extends Doctor {
   constructor(id, values) {

      super(id)
      const {
         name,
         doctor,
         status,
         gender,
         purpose,
         description,
         urgency,
         pressure,
         index,
         diseases,
         age
      } = values;
      this.name = name;
      this.doctor = "Cardiologist";
      this.status = status;
      this.gender = gender;
      this.purpose = purpose;
      this.description = description;
      this.urgency = urgency;
      this.pressure = pressure;
      this.index = index;
      this.diseases = diseases;
      this.age = age;
      this.text.innerHTML = `<h3 class="fullname">Patient: ${this.name}</h3>
       <h4 class="doctor"><span>Doctor:</span> ${this.doctor}</h4>
       <div class="hideInfo">
       <p class="text"><span>status:</span> ${this.status}</p>
       <p class="text"><span>id:</span> ${this.id}</p>
       <p class="text"><span>gender:</span> ${this.gender}</p>
       <p class="text"><span>purpose:</span> ${this.purpose}</p>
       <p class="text"><span>age:</span> ${this.age}</p>
       <p class="text"><span>description:</span> ${this.description}</p>
       <p class="text"><span>urgency:</span> ${this.urgency}</p>
       <p class="text"><span>pressure:</span> ${this.pressure}</p>
       <p class="text"><span>index:</span> ${this.index}</p>
       <p class="text"><span>diseases:</span> ${this.diseases}</p></div>`;
   }
   createElements() {
      super.createElements();
   }
   render() {
      return super.render();
   }
}


export class Dentist extends Doctor {
   constructor(id, values) {
      super(id)
      const {
         name,
         doctor,
         status,
         gender,
         purpose,
         description,
         urgency,
         lastvisit
      } = values;
      this.name = name;
      this.doctor = "Dentist";
      this.status = status;
      this.gender = gender;
      this.purpose = purpose;
      this.description = description;
      this.urgency = urgency;
      this.lastvisit = lastvisit;
      this.text.innerHTML = `<h3 class="fullname">Patient:${this.name}</h3>
      <h4 class="doctor"><span>Doctor:</span> ${this.doctor}</h4>
      <div class="hideInfo">
      <p class="text"><span>status:</span> ${this.status}</p>
      <p class="text"><span>id:</span> ${this.id}</p>
      <p class="text"><span>gender:</span> ${this.gender}</p>
      <p class="text"><span>purpose:</span> ${this.purpose}</p>
      <p class="text"><span>description:</span> ${this.description}</p>
      <p class="text"><span>urgency:</span> ${this.urgency}</p>
      <p class="text"><span>last visit:</span> ${this.lastvisit}</p></div>`

   }
   createElements() {
      super.createElements();
   }
   render() {
      return super.render();
   }
}
export class Therapist extends Doctor {
   constructor(id, values) {
      super(id)
      const {
         name,
         doctor,
         status,
         gender,
         purpose,
         description,
         urgency,
         age
      } = values;
      this.name = name;
      this.doctor = "Therapist";
      this.status = status;
      this.gender = gender;
      this.purpose = purpose;
      this.description = description;
      this.urgency = urgency;
      this.age = age;
      this.text.innerHTML = `<h3 class="fullname">Patient:${this.name}</h3>
     <h4 class="doctor"><span>Doctor:</span> ${this.doctor}</h4>
     <div class="hideInfo">
     <p class="text"><span>status:</span> ${this.status}</p>
     <p class="text"><span>id:</span> ${this.id}</p>
     <p class="text"><span>age:</span> ${this.age}</p>
     <p class="text"><span>gender:</span> ${this.gender}</p>
     <p class="text"><span>purpose:</span> ${this.purpose}</p>
     <p class="text"><span>description:</span> ${this.description}</p>
     <p class="text"><span>urgency:</span> ${this.urgency}</p></div>`

   }
   createElements() {
      super.createElements();
   }
   render() {
      return super.render();
   }
}