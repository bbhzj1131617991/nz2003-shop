
    
    const oCart = document.querySelector('tbody')
    const oPay = document.querySelector('#pay');
    const oCom = document.querySelector('#com');
    const cartArr = JSON.parse(localStorage.getItem('cart'));
    let str = '';
    setCart (cartArr);

    oCom.addEventListener('click',(e)=>{
      if(e.target.getAttribute('name') ==='del'){
          cartArr.forEach((v,k)=>{
            // console.log(e.target.getAttribute('goods_id'));

              if(v.goods_id == e.target.getAttribute('goods_id') ){
                cartArr.splice(k,1);

                oCart.innerHTML = '';


              }
          })
      }
      if(e.target.getAttribute('name') === 'plus'){
          cartArr.forEach((v,k)=>{
              if(v.goods_id == e.target.getAttribute('goods_id')){
                    v.mun++;
                    if(v.mun>v.goods_weight){
                      v.mun = v.goods_weight;
                    }
              }
          })
      }

      if(e.target.getAttribute('name')=== 'less'){
        cartArr.forEach((v,k)=>{
            if(v.goods_id == e.target.getAttribute('goods_id')){
                v.mun--;
                if(v.mun < 1){
                  v.mun = 1;
                }
            }
        })
      }
      if(e.target.getAttribute('name') === 'che'){
          cartArr.forEach((v,k)=>{
            if(v.goods_id == e.target.getAttribute('goods_id')){
              v.buy = !v.buy;
            }
          })
      }

      setCart (cartArr);
        console.log(cartArr);
        localStorage.setItem('cart', JSON.stringify(cartArr));


    })


    //生成页面的函数
    function setCart(arr){  
     let str = '';
     let type = 0;
     let m = 0;
     let n = 0;
      arr.forEach((v) => {
        if(v.buy){
          type++;
          n += v.mun;
          m += v.mun * v.goods_price
        }
            str += `

              <tr>
                <td><input name="che" goods_id="${v.goods_id}" type="checkbox" ${v.buy ? 'checked' : ''}></td>

                <td class="pro-thumbnail"><a href="#"><img src=${v.goods_big_logo}></a></td>
                <td class="pro-title"><a href="#">${v.cat_id}</a></td>
                <td class="pro-price"><span>¥${v.goods_price}</span></td>
                <td class="pro-quantity">
                    <div class="pro-qty"><button name="plus" goods_id="${v.goods_id}" >+</button>${v.mun}<button name="less" goods_id="${v.goods_id}" >-</button> </div>
                </td>
                <td class="pro-subtotal"><span>¥${((v.goods_price) * (v.mun)).toFixed(2)}</span></td>
                <td class="pro-remove" ><af><i class="fa fa-trash-o" name="del" goods_id=${v.goods_id}></i></a></td>
                </tr>

              `

              })
              oCart.innerHTML = str;
              oPay.innerHTML = `

              <div class="col-lg-6 col-12 mb--40 d-flex">
                        <div class="cart-summary">
                          <div class="cart-summary-wrap">
                            <h4>结算</h4>
                            <p>商品数<span>${n}</span></p>
                            <p>商品种类<span>${type}</span></p>
                            <h2>总价 <span>${m.toFixed(2)}</span></h2>
                          </div>

                        </div>
                      </div>

            `
    }