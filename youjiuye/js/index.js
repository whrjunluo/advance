window.onload = function () {
  // 左右箭头必须添加 arr_l 和arr_r 类名  别问为什么，问就是形参太多了
  function FocusPic(arr, banner, trigger) {
    // 创建构造函数
    // 静态属性
    this.arr = arr;
    // 添加元素 方法
    if (typeof (this.add) !== "function") {
      FocusPic.prototype.add = function () {
        for (let i = 0; i < this.arr.length; i++) {
          // 生成图片的盒子
          let div = document.createElement("div");
          div.classList = "item";
          // 生成图片
          let img = document.createElement("img");
          img.src = this.arr[i];
          div.appendChild(img)
          banner.appendChild(div);
          // 生成点点
          let span = document.createElement("span");
          span.classList = " ";
          trigger.appendChild(span);
        }
      }
    }
    this.add();
    let items = document.querySelectorAll(".item");
    let spans = trigger.querySelectorAll("span");
    items[0].className += " cur_banner";
    spans[0].className = "current";
    let timer;
    let i = 0;

    function trans() {
      i++;
      if (i > items.length - 1) {
        i = 0;
      };
      if (i < 0) {
        i = items.length - 1;
      }
      for (let j = 0; j < items.length; j++) {
        removeClass(items[j], "cur_banner")
        removeClass(spans[j], "current")

      }
      items[i].className += " cur_banner";
      spans[i].className = " current";
    };
    if (typeof (this.move) !== "function") {
      FocusPic.prototype.move = function () {
        clearInterval(timer);


        timer = setInterval(trans, 2000)
      }
    }
    this.move();
    banner.onmouseleave = this.move;
    banner.onmouseover = function () {
      clearInterval(timer);
    }
    let arr_l = document.querySelector(".arr_l");
    let arr_r = document.querySelector(".arr_r");
    arr_r.onclick = function () {
      clearInterval(timer);
      trans();
    };
    arr_l.onclick = function () {
      i -= 2;
      clearInterval(timer);
      trans();
    }
    for (let index = 0; index < spans.length; index++) {
      spans[index].onclick = function () {
        // clearInterval(timer);
        i = index
        for (let j = 0; j < items.length; j++) {
          removeClass(items[j], "cur_banner")
          removeClass(spans[j], "current")

        }
        items[i].className += " cur_banner";
        spans[i].className = " current";
      }

    }
  }

  function removeClass(obj, classname) {
    //如果原来有class
    if (obj.className != "") {
      var arrClassName = obj.className.split(" ");
      var _index = arrIndexOf(arrClassName, classname);
      //如果有需要移除的class
      if (_index != -1) {
        arrClassName.splice(_index, 1); //删除存在的class值
        obj.className = arrClassName.join(" "); //将数组以空格连接成字符串放到元素的class属性里
      }
    }
    //如果原来没有class无操作
  }

  function arrIndexOf(arr, v) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == v) {
        return i;
      }
    }
    return -1;
  }
  var dot = document.querySelector(".dot");
  var banner = document.querySelector(".banner");

  ajax("./data/banner.json", "get", function (res) {
    let arr = JSON.parse(res);
    var ex1 = new FocusPic(arr, banner, dot);
  });


}