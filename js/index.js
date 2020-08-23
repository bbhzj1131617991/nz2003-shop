let str = '';
      let arr = [];
      const showOff = document.querySelector('#showOff');
      const cartGo = document.querySelector('#cartGo');
      cartGo.addEventListener('click',()=>{
        let cook = myGetCookie();
        // console.log(cook);
        //没有登陆跳转登陆页面
        if (cook.login === undefined) {
          console.log(1111);

          let bool = window.confirm('您还没有登陆，点击定登陆，点击取消继续浏览');
          if (bool) {
            window.location.href = `./login-register.html?url=${window.location.href}`

          }

        }else{
          window.location.href = './cart.html'
        }
      })
      
        let i = 0;



     
      directCart(showOff,cart);

  
      
      
      setAjax('其他',6,12);
      
       function setAjax(name,page,line){
        $.ajax({
        url: '../server/goods_list.php',
        type:'get',
        data:{cat_one_id:name,page:page, line: line },
        dataType:'json',
        success:(ele)=>{
          console.log(ele);
           res = ele;
          
            res.forEach((v)=>{
            
              str +=`
              <div class="col-lg-3 col-md-6 col-sm-6 col-12 mt--30">
                                        <div class="product">
                                            <div class="inner">
                                                <div class="thumbnail" style="transition: 1s;">
                                                        <img src=${v.goods_big_logo} alt="Product Images" style="transition: 2s;">
                                                </div>
                                                <div class="product-hover-action">
                                                    <div class="hover-inner">
                                                        <a title="Quick View" class="quickview" href="./product-details.html?goods_id=${v.goods_id}"><i class="fa fa-search"></i></a>
                                                        <a ><i class="fa fa-cart-plus" name="show" goods_id=${v.goods_id}></i></a>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="content">
                                                <h2><a href="./product-details.html?goods_id=${v.goods_id}">${v.goods_name}</a></h2>
                                                <span class="prize">¥${v.goods_price}</span>
                                            </div>
                                        </div>
                                    </div>
              `;
            })

              
            
            showOff.innerHTML = str;
        }

      })
      }
          
          let j = 3
      window.onscroll = function(){
        //获取滚动条高度
        let scrollTop = document.documentElement.scrollTop;
        let winHeight = document.documentElement.clientHeight;

      if(scrollTop>winHeight*j-200){
        console.log(scrollTop);
        console.log(winHeight*j);
         setAjax('其他',j,12);
         console.log(111);
         j++;
      }

      }