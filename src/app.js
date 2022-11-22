import './scss/style.scss';
import './scss/media.scss';

const input = document.querySelector('.input');
const button = document.querySelector('.button');
const form = document.querySelector('.form');
const buttonDiv = document.querySelector('.button_order');

button.addEventListener('click', onSubmit);

function onSubmit(e) {
  const value = input.value;
  const error = document.querySelector('.inputError');
  e.preventDefault();

  if (value.trim() === '' && !error) {
    form.insertAdjacentHTML('afterend', `<div class='inputError'>Поле не должно быть пустым</div>`);
    form.classList.add('error');
  } else if (error === null) {
    postData(value);
  }
  if (error != null && value.trim() !== '') {
    form.classList.remove('error');
    form.parentNode.removeChild(error);
    postData(value);
  }
}

async function postData(value) {
  const data = { phone: value.trim() };
  try {
    const response = await fetch('https://62fd27316e617f88dea5d017.mockapi.io/phone_numbers', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const jsonData = await response.json();
    timeOutAlert(jsonData);
    input.value = '';
    console.log('Успех:', JSON.stringify(jsonData));
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

function timeOutAlert(jsonData) {
  form.insertAdjacentHTML(
    'afterend',
    `<div id="alert_block" class='alert_block'><div class='alert_message'>Ваш номер успешно записан: ${JSON.stringify(
      jsonData,
    )}</div></div>`,
  );
  const alert = document.getElementById('alert_block');
  button.setAttribute('disabled', true);
  buttonDiv.style.opacity = '0.5';

  setTimeout(() => {
    button.removeAttribute('disabled');
    buttonDiv.style.opacity = '1';
    form.parentNode.removeChild(alert);
  }, 3000);
}
