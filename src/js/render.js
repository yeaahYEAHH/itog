document.addEventListener('DOMContentLoaded', () =>{

    // Title_bar кнопки
    let btnClose = document.querySelector('.win__btn-close'),
        btnMin = document.querySelector('.win__btn-min'),
        btnMax = document.querySelector('.win__btn-max'),
        flagWin = false;

    btnClose.addEventListener('click', () =>{
        window.electronAPI.quit()
    })

    btnMin.addEventListener('click', () =>{
        window.electronAPI.min()
    })

    btnMax.addEventListener('click', () => {
        if (!flagWin) {
            window.electronAPI.winMax();
            document.querySelector('#winbtn').classList.remove('fa-window-maximize');
            document.querySelector('#winbtn').classList.add('fa-window-restore');
            flagWin = !flagWin;
        } else {
            window.electronAPI.winMin();
            document.querySelector('#winbtn').classList.remove('fa-window-restore');
            document.querySelector('#winbtn').classList.add('fa-window-maximize');
            flagWin = !flagWin;
        }
    })

    // Табы
    let register  = document.querySelector('#form__register'),
        login = document.querySelector('#form__login');
    
    login.style.display = 'block'
    
    document.querySelector('.login__message').addEventListener('click', ()=>{
        login.style.display = 'block';
        register.style.display = 'none';
    })

    document.querySelector('.register__message').addEventListener('click', () => {
        login.style.display = 'none';
        register.style.display = 'block';
    })

    //Авторизация
    
    document.querySelector('#create').addEventListener('click', () =>{
        let registerValue = [],
            registerValue_text = document.querySelectorAll('#registerValue');
        
        for (index in registerValue_text)
            registerValue.push(registerValue_text[index].value)

        registerValue = registerValue.filter(item => item !== undefined);
        console.log(registerValue);

        window.electronAPI.create(registerValue);
    })

  
    document.querySelector('#entry').addEventListener('click', () =>{
        let loginValue = document.querySelector('#login1').value,
            passValue = document.querySelector('#password1').value;
        window.electronAPI.check(loginValue, passValue);
    })


})