export const htmlTemplateBasic = `
<input type="text" name="purpose" id="purpose" placeholder="Type your visit purpose">
<input type="text" name="description" id="description" placeholder="Type your description of the visit">
<input type="text" name="gender" id="gender" placeholder="Type your gender">
<div class="select__wrapper">
   <select class="select selectUrgency" name="urgency">
   <option style="display:none;" value="">Urgency</option>     
      <option value="low">Low</option>
      <option value="normal">Normal</option>
      <option value="high">High</option>
   </select>
</div>

<div class="select__wrapper">
   <select class="select selectStatus" name="status">
   <option style="display:none;" value="">Status</option>    
      <option value="open">Open</option>
      <option value="closed">Closed</option>
      </select>
</div>

<input type="text" name="name" id="name" placeholder="Type your name" required>`;

export const htmlTemplateCardiolog = `${htmlTemplateBasic}
<input  type="text" name="pressure" id="pressure" placeholder="Type your pressure" required>
<input  type="text" name="index" id="index" placeholder="Type your index" required>
<input  type="text" name="diseases" id="diseases" placeholder="Type your diseases" required>
<input  type="text" name="age" id="age" placeholder="Type your age" required>`;


export const htmlTemplateDentist = `${htmlTemplateBasic}
<input required class="data" type="date" name="lastvisit" id="lastvisit" placeholder="Type date of your last visit">`;

export const htmlTemplateTherapist = `${htmlTemplateBasic}
<input required type="text" name="age" id="age" placeholder="Type your age">`;