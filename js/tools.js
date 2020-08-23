// 生成验证码函数
function mySetVc() {
    var str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXUZ';
    var newStr = '';
    for (var i = 1; i <= 6; i++) {
        var num = parseInt(Math.random() * str.length)

        if (newStr.indexOf(str[num]) === -1) {
            newStr += str[num];
        } else {
            i--;
        }
    }

    return newStr;
}

// 获取地址栏数据信息
function getUrlVal() {
    // 1,获取地址栏参数字符串
    let str = decodeURI(window.location.search).substr(1);

    // 创建存储结果的对象
    let obj = {};

    // 2 转化为数组 根据 分号空格转化
    const arr1 = str.split('&')

    // 3 循环变量数组,将数据字符串,根据=等号分割为数组
    arr1.forEach(v => {
        let arr2 = v.split('=');
        obj[arr2[0]] = arr2[1];
    })

    return obj;

}



// 生成table表格函数
// 参数1:数组,需要参照的数据数组
// 参数2:标签,需要写入内容的标签对象
function mySetTable(array, element) {
    var str = '';
    array.forEach(function (v, k) {
        str += '<tr>';
        for (var key in v) {
            str += `<td>${v[key]}</td>`;
        }
        str += `<td><button index="${k}">删除</button></td>`
        str += '</tr>';
    });
    element.innerHTML = str;
    var oBtns = document.querySelectorAll('button');

    mySetButton(oBtns, array, element);
}

// 给button按钮绑定删除效果函数
// 参数1,button按钮数组
// 参数2,数据数组
// 参数3,写入内容的标签对象
function mySetButton(BtnArray, array, element) {
    BtnArray.forEach(function (v) {
        v.onclick = function () {
            var bool = window.confirm('确定,是否删除');
            if (bool) {
                var index = v.getAttribute('index');
                array.splice(index, 1);
                mySetTable(array, element);
            }
        }
    })
}


// 处理监听事件兼容性函数
// 参数1:需要绑定事件的标签对象
// 参数2:需要绑定的事件类型,没有on
// 参数3:需要绑定的事件处理函数
function myAddEvent(element, type, fun) {
    if (element.addEventListener) {
        // 普通浏览器
        element.addEventListener(type, fun);
    } else {
        // 低版本IE浏览器
        element.attachEvent('on' + type, fun);
    }
}


// 获取css样式函数
// 参数1,需要属性的标签对象
// 参数2,需要属性的属性名称

function myGetStyle(element, type) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(element)[type];
    } else {
        return element.currentStyle[type];
    }
}



// 设定 cookie 函数
// 参数1: cookie 的键名
// 参数2: cookie 的键值
// 参数3: cookie 的时效(秒数)

function mySetCookie(key, value, time) {
    // 1,获取当前的时间对象
    const nowTime = new Date();

    // 2,获取当前时间的时间戳 --- 单位是毫秒
    let timeStamp = nowTime.getTime();

    // 3,计算时间戳    当前时间戳 - 8小时 + 时效的时间(秒)
    // 获取带有时效的时间戳 是世界标准时间
    let newTimeStamp = timeStamp - 8 * 60 * 60 * 1000 + time * 1000;

    // 4,将时间戳设定回时间对象
    nowTime.setTime(newTimeStamp);

    // 5,兼容没有传第三个参数的情况
    // 如果 time 是 undefined ,证明没有第三个参数,执行会话时效,赋值空字符串
    // 如果 time 不是 undefined ,证明没有第三个参数,执行 nowTime 时间对象中的时间戳时效
    let endTime = time === undefined ? '' : nowTime;

    // 6,设定cookie
    // 给cookie多设定一个属性,path=/
    // 让www中的所有文件都可以使用设定的cookie
    document.cookie = `${key}=${value};expires=${endTime};path=/`;

}



// 获取 cookie 的具体数据
function myGetCookie() {
    // 创建存储结果的对象
    let obj = {};

    // 1 获取cookie字符串
    let str = document.cookie;

    // 2 转化为数组 根据 分号空格转化
    const arr1 = str.split('; ')

    // 3 循环变量数组,将数据字符串,根据=等号分割为数组
    arr1.forEach(v => {
        let arr2 = v.split('=');
        obj[arr2[0]] = arr2[1];
    })

    return obj;
}




//点击购物车的函数点击购物车加载这个函数
//传参为储存后端返回值的结果 也就是商品的信息
  function cart(res){
    // console.log(res);
    //获取cook里的数据判断是否登陆
    let cook = myGetCookie();
        // console.log(cook);
        //没有登陆跳转登陆页面
        if (cook.login === undefined) {
          console.log(1111);

          let bool = window.confirm('您还没有登陆，点击定登陆，点击取消继续浏览');
          if (bool) {
            window.location.href = `./login-register.html?url=${window.location.href}`

          }

        } else {
          

          // console.log(localStorage.getItem('cart'));
          //获取localStorage看是否为空
          //如果为空则吧数据加载到 localStoraye里 并且定义一个变量储存点击购物车的次数
          if( localStorage.getItem('cart') === null ){
                console.log(111);
                res.mun = 1;
                res.buy = true;
                arr.push(res);
                console.log(arr);

          }else{
              //定义一个变量初始值为真 
            let bool = true;
              //获取localStorage的数据
            arr = JSON.parse(localStorage.getItem('cart'));
              //循环遍历这个数组如果已经存在这个商品商品数量的变量 mun加1 
              //bool赋值为假
              console.log(arr);
              console.log(res);

            arr.forEach((v)=>{
              // console.log(11111);
              console.log(v.goods_id,res.goods_id);

              if(v.goods_id === res.goods_id){
                v.mun++;
                bool = false;


              }

            })
            //判断bool的值如果说购物车没有这个商品就添加到localStorage里面

            if(bool){
              res.mun = 1;
              res.buy = true;
              arr.push(res);
              console.log(1112222333);
            }


          }
          localStorage.setItem('cart',JSON.stringify(arr));
          //已经登陆跳转购物车页面
          window.location.href = './cart.html'
          

        }
  }

  //点击直接加入购物车不通过详情页
  // 第二个参数是回调函数，是向购物车传餐的函数    
  function directCart(showOff,cart){
    //添加一个点击事件 事件委托的形式
    showOff.addEventListener('click',(e)=>{
        //判断是否是这个购物车标签
    if(e.target.getAttribute('name') === 'show'){
      console.log(e.target.getAttribute('goods_id'))

      $.ajax({
        url: '../server/goods_detail.php',
        //获取这个商品的id传参给后端
        data: { goods_id:e.target.getAttribute('goods_id') },
        type: 'post',
        dataType:'json',
        success:(res)=>{
          console.log(res);
          //接受数据调用添加购物车的函数
          cart(res);
        }
      })
    }
})
  }