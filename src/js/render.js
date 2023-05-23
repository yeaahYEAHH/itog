
    // Табы
    let register = document.querySelector('#form__register'),
        login = document.querySelector('#form__login');

    login.style.display = 'block'

    document.querySelector('.login__message').addEventListener('click', () => {
        login.style.display = 'block';
        register.style.display = 'none';
    })

    document.querySelector('.register__message').addEventListener('click', () => {
        login.style.display = 'none';
        register.style.display = 'block';
    })

    //Авторизация
    document.querySelector('#create').addEventListener('click', () => {
        let registerValue = [],
            registerValue_text = document.querySelectorAll('#registerValue');

        for (index in registerValue_text)
            registerValue.push(registerValue_text[index].value)

        registerValue = registerValue.filter(item => item !== undefined);
        console.log(registerValue);

        window.authAPI.create(registerValue);
    })



    document.querySelector('#entry').addEventListener('click', () => {
        let loginValue = document.querySelector('#login1').value,
            passValue = document.querySelector('#password1').value;

        window.authAPI.check(loginValue, passValue);
        myAPI.login()
    })


