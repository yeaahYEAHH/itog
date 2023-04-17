document.addEventListener('DOMContentLoaded', () =>{
    let btnClose = document.querySelector('.btn-close'),
    btnMin = document.querySelector('.btn-min');

    btnClose.addEventListener('click', () =>{
        window.electronAPI.quit()
    })

    btnMin.addEventListener('click', () =>{
        window.electronAPI.min()
    })
})