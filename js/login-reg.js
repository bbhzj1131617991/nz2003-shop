const oName = document.querySelector('#login-form-email');
  const oPwd = document.querySelector('#login-form-password');
  const oBtn = document.querySelector('#login');
 
  oBtn.addEventListener('click',()=>{
    let uersName = oName.value;
    let uersPwd  = oPwd.value
    console.log(uersName);
    $.ajax({
      url:'../server/goods_login.php',
      type:'post',
      data:{userName:uersName,userPwd:uersPwd},

      dataType:'json',
      success:(result)=>{
           console.log(result.res);
           if(result.res === 1){
             mySetCookie('login',1,7*24*3600)
             
                let url = decodeURI( window.location.search ).substr( decodeURI( window.location.search ).indexOf('=')+1 );
                console.log(url);
                 window.location.href = url;
              

           }else{
             window.alert('密码或账户错误');
           }
      }
    })
  })