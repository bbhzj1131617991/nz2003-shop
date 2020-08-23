const oBut = document.querySelector('#login1');
    console.log(oBut);
    oBut.addEventListener('click',()=>{
          window.location.href = `./login-register.html?url=${window.location.href}`
    })