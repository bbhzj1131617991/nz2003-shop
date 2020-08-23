const oOut = document.querySelector('#out');

oOut.addEventListener('click',()=>{
  console.log(111);
  mySetCookie('login',1,-1);
  //刷新页面
  location.reload();
  })