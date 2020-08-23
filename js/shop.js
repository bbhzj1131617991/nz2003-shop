const oShop = document.querySelector('#shop');
// const ggg = document.querySelector('#cartggg');
let objggg = {};
let arr = [];

directCart(oShop,cart);
let ajaxArr;
//获取地址栏传参数的地址
let valObj = getUrlVal();
//
console.log(valObj);
getAjax(valObj, 1, 12);
function getAjax(object, page, line) {

  $.ajax({
    url: '../server/goods_list.php',
    data: { cat_one_id: object.cat_one_id, page: page, line: line },
    type: 'get',
    dataType: 'json',
    success: (result) => {
      objggg = result;
      let src = ``;
      result.forEach((v) => {
        src += `
          <div class="col-lg-4 col-md-6 col-sm-6 col-12 col-xl-3 mt--60">
            <div class="product">
              <div class="inner">
                <div class="thumbnail">
                  <a href="product-details.html?goods_id=${v.goods_id}">
                    <img src="${v.goods_big_logo}">
                  </a>
                </div>
                <div class="product-hover-action">
                  <div class="hover-inner">
                    <a title="Quick View" class="quickview" href="./product-details.html?goods_id=${v.goods_id}"><i
                        class="fa fa-search" ></i></a>
                        <a><i class="fa fa-cart-plus" name="show" goods_id=${v.goods_id}></i></a>

                  </div>
                </div>
              </div>
              <div class="content">
                <h2><a href="product-details.html?goods_id=${v.goods_id}">${v.goods_name}</a></h2>
                <span class="prize">${v.goods_price}</span>
              </div>
            </div>
          </div>
          `
      })



      oShop.innerHTML = src;


      // })
      $('.M-box').pagination({
        mode: 'fixed',                   // 固定分页按钮的数量
        pageCount: result[0].sumPage,   // 查询结果中的总页数
        totalData: result[0].row,       // 查询结果中的数据中数据
        current: result[0].page,        // 当前页数
        showData: line,                 // 每页的数据数量
        count: 15,                      // 设定总显示的页数
        coping: true,                   // 显示首页末页
        isHide: true,                   // 总页数为0或者1时,隐藏控件
        keepShowPN: true,               // 显示上一页下一页
        homePage: '首页',               // 首页的文本内容
        endPage: '末页',                // 首页的文本内容
        prevContent: '上一页',
        nextContent: '下一页',
        callback: function (res) {
          // 在插件定义的回调函数中,形参里存储数据信息

          // 获取点击分页显示按钮,要显示的页数信息
          // 插件定义好的,直接使用就可以了
          let p = res.getCurrent();

          // 可以根据新的页数,发起新的请求,渲染生成新的页面内容

          getAjax(valObj, p, 12);
        }
      });

    }

  })

}



