class Ajax {
  get(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        Ajax.handleResponse(xhr, callback);
      }
    };
  }

  post(url, data, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        Ajax.handleResponse(xhr, callback);
      }
    };
  }

  patch(url, data, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("PATCH", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        Ajax.handleResponse(xhr, callback);
      }
    };
  }

  delete(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", url);
    xhr.send();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        Ajax.handleResponse(xhr, callback);
      }
    };
  }

  static handleResponse(xhr, callback) {
    let data = null;
    if (xhr.responseText) {
      try {
        data = JSON.parse(xhr.responseText);
      } catch (e) {
        console.error("Ошибка JSON:", e);
      }
    }
    callback(data, xhr.status);
  }
}

export const ajax = new Ajax();
