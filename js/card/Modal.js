export class Modal {
   constructor(element, onSubmitAction) {
      this.onSubmitAction = onSubmitAction;
      this.element = element;
      this.container = document.createElement("div");
      this.background = document.createElement("div");
      this.mainContainer = document.createElement("div");
      this.closeButton = document.createElement("button");
      this.contentWrapper = document.createElement("div");
      this.buttonWrapper = document.createElement("div");
      this.buttonCreate = document.createElement('button');
   }
   createElements() {
      this.container.classList.add('modal');
      this.background.classList.add('modal__background');
      this.mainContainer.classList.add('modal__main-container');
      this.closeButton.classList.add('modal__close');
      this.closeButton.title = "Close";
      this.contentWrapper.classList.add('modal__content-wrapper');
      this.buttonWrapper.classList.add('modal__button-wrapper');

      this.mainContainer.append(this.closeButton);
      this.mainContainer.append(this.contentWrapper);
      this.mainContainer.append(this.buttonWrapper);

      this.buttonCreate.classList.add('modal__confirm-btn');
      this.buttonCreate.innerHTML = 'Create visit';


      this.container.append(this.mainContainer);
      this.container.append(this.background);
      this.buttonWrapper.append(this.buttonCreate);
      this.contentWrapper.append(this.element);

      this.buttonCreate.addEventListener('click', () => {
         this.onSubmitAction();
         this.closeMe();
      });

      this.closeButton.addEventListener('click', this.closeMe.bind(this));
      this.background.addEventListener('click', this.closeMe.bind(this));
   }

   closeMe() {
      this.container.remove();
   }

   render(selector = 'body') {
      this.createElements();
      document.querySelector(selector).append(this.container);
   }
}