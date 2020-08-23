const oName = document.querySelector('#register-form-name');
const oPwd1 = document.querySelector('#register-form-email');
const oPwd2 = document.querySelector('#register-form-password');
const oReg = document.querySelector('#reg');
const oConfirm = document.querySelector('#confirm');
//点击注册判断密码是否符合规定
oReg.addEventListener('click',()=>{
  let nemeVal = oName.value;
  let pwd1Val = oPwd1.value;
  let pwd2Val = oPwd2.value;
  if(pwd1Val !== pwd2Val){
  
    oConfirm.innerHTML = `<span>输入密码和确认密码符合</span>`;
    return;
  }
  oConfirm.innerHTML = ``;
  //密码格式符合条件进行传参数
  $.ajax({
    url:'../server/goods_res.php',
    type:'post',
    data:{userName:nemeVal,userPwd:pwd1Val},
    dataType:'json',
    success:result=>{
      console.log(result);
      if(result.res === 1){
        
        window.alert('注册成功，点击返回主页面');
        window.location.href = './index.html'

      }else{
        window.alert('用户名已存在');

      }
    }
  })

})