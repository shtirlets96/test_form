import IMask from 'imask';
import { feedbackQuery } from '../api';

const inputs = document.querySelectorAll('.modal__input');
const form = document.querySelector('.modal__form');
let isSubmited = false;
const openModalButon = document.querySelector('.modal__open-button');
const modalWrapper = document.querySelector('.modal__wrapper');

function showModal() {
  modalWrapper.style.display = 'flex';
  document.querySelector('.modal__background').style.display = 'block';
}

function closeModal() {
  modalWrapper.style.display = 'none';
  document.querySelector('.modal__background').style.display = 'none';
}

function wrapperClick(event) {
  if (event.target.className === 'modal__wrapper') {
    closeModal();
  }
}

function showLabel(input) {
  const label = input.parentElement.querySelector('.modal__input-label-text');
  if (input.value) {
    label.style.visibility = 'visible';
  } else {
    label.style.visibility = 'hidden';
  }
}

function updateError(input, visibility) {
  const error = input.parentElement.querySelector('.modal__input-error-text');
  const label = input.parentElement.querySelector('.modal__input-label-text');

  error.style.display = visibility ? 'block' : 'none';
  const color = visibility ? '#F36363' : '#A5A5A5';

  if (label) {
    label.style.color = color;
  }
  input.style.border = `1px solid ${color}`;
}

function onInput() {
  showLabel(this);
  if (isSubmited) {
    if (this.validity.valid) {
      updateError(this, false);
    }
  }
}

function checkUnrequired() {
  updateError(form.submit, false);
  form.phone.required = true;
  form.email.required = true;

  if (form.email.value && !form.phone.value) {
    form.phone.required = false;
  }
  if (!form.email.value && form.phone.value) {
    form.email.required = false;
  }
  if (!form.email.value && !form.phone.value) {
    updateError(form.submit, true);
  }
}

async function sendFeedback() {
  const {
    email, name, phone, description,
  } = form;

  const result = await feedbackQuery({
    email: email.value,
    name: name.value,
    phone: phone.value,
    description: description.value,
  });

  closeModal();

  if (result.error) {
    alert(result.error);
  } else {
    alert('Сообщение успешно отправлено!');
  }
}

function onSubmit(event) {
  isSubmited = true;
  let allValid = true;

  checkUnrequired();

  inputs.forEach((input) => {
    if (input.validity.valid) {
      updateError(input, false);
    } else {
      allValid = false;
      updateError(input, true);
    }
  });

  if (allValid) {
    sendFeedback();
  }
  event.preventDefault();
}

form.addEventListener('submit', onSubmit);
openModalButon.addEventListener('click', showModal);
modalWrapper.addEventListener('click', wrapperClick);

inputs.forEach((input) => {
  input.addEventListener('input', onInput);
});

IMask(document.querySelector('.modal__input[type="tel"]'), {
  mask: '+{7} (000) 000-00-00',
});
