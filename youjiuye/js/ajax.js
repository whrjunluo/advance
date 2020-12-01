// window.onload = function () {
function ajax(url, method, fn, data) {
  // 创建ajax对象
  var ajax1 = new XMLHttpRequest();
  // 调用ajax
  if (method == "get") {
    data ? ajax1.open(method, url + "?" + data) : ajax1.open(method, url);
    ajax1.send();
  } else {
    ajax1.open(method, url)
    ajax1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    data ? ajax1.send(data) : ajax1.send();
  }
  ajax1.onreadystatechange = function () {
    if (ajax1.readyState == 4 && (ajax1.status == 200 || ajax1.status == 304)) {
      fn(ajax1.responseText)
    }
  }
}

// }