import {
   htmlTemplateCardiolog,
   htmlTemplateDentist,
   htmlTemplateTherapist
} from "./htmlTemplates.js";

export class Form {
   constructor() {
      this.mappedTemplates = {
         select: '',
         cardiologist: htmlTemplateCardiolog,
         dentist: htmlTemplateDentist,
         therapist: htmlTemplateTherapist,

      }
      this.form = document.createElement('form');
      this.select = document.createElement('select');
      this.inputsWrapper = document.createElement('div');
      this.selectWrapper = document.createElement('div');
      this.selectOption = `
       <option value="select">Select Doctor</option>
       <option value="cardiologist">Cardiologist</option>
         <option value="dentist">Dentist</option>
         <option value="therapist">Therapist</option>
       `;

   }

   createElements() {
      this.select.innerHTML = this.selectOption;
      this.select.classList.add("select", "selectDoctor");
      this.selectWrapper.classList.add("select__wrapper");
      this.form.innerHTML = `<h3>Create visit</h3>`
      this.form.append(this.selectWrapper);
      this.selectWrapper.append(this.select);
      this.select.addEventListener('change', this.selectOnChange.bind(this))
      this.form.append(this.inputsWrapper);



   }

   getSelectValue() {
      return this.select.value;
   }

   selectOnChange() {
      this.inputsWrapper.innerHTML = this.mappedTemplates[this.select.value];
   }

   getInputsValues() {
      const values = {};
      const doctor = this.selectWrapper.querySelector('.selectDoctor').value;
      const urgency = document.querySelector('.selectUrgency').value;
      const status = document.querySelector('.selectStatus').value;

      this.inputsWrapper.querySelectorAll('input').forEach(({
         name,
         value
      }) => {
         values[name] = value;
      });
      values["doctor"] = doctor;
      values["urgency"] = urgency;
      values["status"] = status;

      return values;
   }

   render() {
      this.createElements();
      return this.form;
   }
}
export class editForm {
   constructor() {
      this.mappedTemplates = {
         select: '',
         cardiologist: htmlTemplateCardiolog,
         dentist: htmlTemplateDentist,
         therapist: htmlTemplateTherapist,

      }
      this.form = document.createElement('form');
      this.select = document.createElement('select');
      this.inputsWrapper = document.createElement('div');
      this.selectWrapper = document.createElement('div');
      this.selectOption = `
       <option value="select">Select Doctor</option>
       <option value="cardiologist">Cardiologist</option>
         <option value="dentist">Dentist</option>
         <option value="therapist">Therapist</option>
       `;
   }

   createElements() {
      this.select.innerHTML = this.selectOption;
      this.select.classList.add("select", "selectDoctor");
      this.selectWrapper.classList.add("select__wrapper");
      this.form.innerHTML = `<h3>Change visit</h3>`
      this.form.append(this.selectWrapper);
      this.selectWrapper.append(this.select);
      this.select.addEventListener('change', this.selectOnChange.bind(this))
      this.form.append(this.inputsWrapper);
   }

   getSelectValue() {
      return this.select.value;
   }

   selectOnChange() {
      this.inputsWrapper.innerHTML = this.mappedTemplates[this.select.value];
   }

   getInputsValues() {
      const values = {};
      const doctor = this.selectWrapper.querySelector('.selectDoctor').value;
      const urgency = document.querySelector('.selectUrgency').value;
      const status = document.querySelector('.selectStatus').value;

      this.inputsWrapper.querySelectorAll('input').forEach(({
         name,
         value
      }) => {
         values[name] = value
      });
      values["doctor"] = doctor;
      values["urgency"] = urgency;
      values["id"] = this.id;
      values["status"] = status;

      return values;
   }

   render() {
      this.createElements();
      return this.form;
   }
}