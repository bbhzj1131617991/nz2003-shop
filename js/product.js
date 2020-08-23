//定义一个数组来存储购物车的信息

let arr = [];

//获取地址栏的传餐信息
const valObj = getUrlVal();
console.log(valObj);
//获取标签
const oDiv = document.querySelector('#detaall');
$.ajax({
  url: '../server/goods_detail.php',
  data: { goods_id: valObj.goods_id },
  type: 'post',
  dataType: 'json',
  success: (result) => {
    let  res = result;
    console.log(result);
    let src = `
          <div class="row">
                  <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                      <div class="single-product-left-side">
                          <div class="product__details__container">
                              <div class="tab_container big_img_container">
                                  <div class="big_img tab-pane fade show active" id="img1" role="tabpanel">
                                      <img class="w-100" src=${result.goods_big_logo}>
                                  </div>
                                  
                              </div>
                              <div class="sm_roduct_nav nav nav-tabs" role="tablist">
                                  <a class="active" id="img1-tab" data-toggle="tab" href="#img1" role="tab" aria-controls="img1" aria-selected="true">
                                      <img src=${result.goods_big_logo} alt="gomes restaurant">
                                  </a>
                                  <a id="nav-img2-tab" data-toggle="tab" href="#img2" role="tab" aria-controls="img2" aria-selected="false">
                                      <img src=${result.goods_small_logo} alt="gomes restaurant">
                                  </a>
                                  

                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-12 col-12 mt_sm--40">
                      <div class="single-product-details-side">
                          <div class="product-details">
                              <div class="inner">
                                  <div class="header">
                                      <div class="product-badges">
                                          <span>商品名称</span>
                                      </div>
                                      <h4 class="heading heading-h4">${result.cat_id}</h4>
                                  </div>

                                  <div class="price">
                                      <p class="theme-color">¥${result.goods_price}</p>
                                  </div>

                                  <div class="description">
                                      <p class="bk_pra"> ${result.goods_name}</p>
                                  </div>

                                  <div class="quenty-container">
                                      <div class="quenty-button">
                                          <h6 class="heading heading-h6">数量</h6>
                                          <input type="number" class="input-text qty text" step="1" min="1" name="quantity" value="1" title="Qty" size="4">
                                      </div>

                                      <div class="product-action" id="cart1">
                                          <a class="addtocart" href="#"><i
                                                  class="fa fa-cart-arrow-down"></i><span >
                                                    加入购物车
                                                </span></a>
                                          <a class="wislist" href="#"></a>
                                      </div>
                                  </div>

                                  
                                      
                                  </div>

                              </div>
                          </div>

                      </div>
                  </div>
                  ${result.goods_introduce}

          
          `;


    oDiv.innerHTML = src;


    //点击购物车
    const oCart = document.querySelector('#cart1');
    console.log(oCart);


      

    

    oCart.addEventListener('click', () => {
       cart(res)
       

    })



  }
})
