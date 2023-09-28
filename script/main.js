"use strict"

document.addEventListener('DOMContentLoaded', function() {

    const form = document.getElementById('main-form');
    const popup = document.getElementById('popup');
    const popupCloseIcon = document.querySelector('.close_popup');
    let responsePopup = document.getElementById('popup_title')
    form.addEventListener('submit', formSend);
    
    
    async function formSend(e) {
        e.preventDefault();
    
        let error = formValidate(form);
    
        let formData = new FormData(form);
    
        if(error === 0) {
            form.classList.add('_sending');
            document.getElementById("button").value = 'Идёт отправка...';
           let response = await fetch('validation.php', {
                method: 'POST',
                body: formData
            });
            //получение ответа
            if(response.status === 200) {
                let result = await response.json();
                popup.classList.add('open');
                form.reset();
                document.getElementById("map").style.display = "none";
                responsePopup.innerHTML = result.message;
                form.classList.remove('_sending');
                document.getElementById("button").value = 'Отправить';
                document.getElementById('error').style = 'display: none';
                document.getElementById("toggle").value = 'Показать карту';
            } else if(response.status === 400) {
                let result = await response.json();
                popup.classList.add('open');
                responsePopup.innerHTML = result.message;
                form.classList.remove('_sending');
                document.getElementById("button").value = 'Отправить';
                document.getElementById('error').style = 'display: none';
            }
        }else{
            document.getElementById('error').style = 'display: block';
        }

        popupCloseIcon.addEventListener('click', () => {
            popup.classList.remove('open');
        });
    
        function formValidate(form) {
            let error = 0;
            let formReq = document.querySelectorAll('.req');
    
            for (let index = 0; index < formReq.length; index++) {
                const input = formReq[index];
                formRemoveError(input);
                    
                if (input.value === '') {
                    formAddError(input);
                    error++;
                }
            }
            return error;
        }
    
    
        function formAddError(input) {
            input.parentElement.classList.add('_error');
            input.classList.add('_error');
        }
        function formRemoveError(input) {
            input.parentElement.classList.add('_error');
            input.classList.remove('_error');
        }
    
    }
});


//Маска номера телефона
document.getElementById('inputPhone').addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9\-()+ ]/g, '');
});




//ограничение ввода символов в имя
document.getElementById('name').addEventListener('input', function () {
    this.value = this.value.replace(/[^а-я\А-Я\a-z\A-Z-]/g, '');
});


