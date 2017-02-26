/* eslint-disable */
window.CTCallBackList = {};
String.prototype.hashCode = function() {
  var hash = 0;
  if (this.length == 0) return hash;
  for (var index = 0; index < this.length; index++) {
    var charactor = this.charCodeAt(index);
    hash = ((hash << 5) - hash) + charactor;
    hash = hash & hash;
  }
  return hash;
};

function LinkToDevice(openCallback, closeCallback, errorCallback) {
  if (window.WebSocket != undefined && typeof isiOS == "undefined") {
    // wsConnection = new WebSocket('ws://10.199.25.169:9000');
    wsConnection = new WebSocket('ws://192.168.2.100:9000');

    wsConnection.addEventListener("open", function(event) {
      openCallback ? openCallback(event) : null;
    });

    wsConnection.addEventListener("close", function() {
      closeCallback ? closeCallback() : null;
    });

    wsConnection.addEventListener("error", function(event) {
      errorCallback ? errorCallback(event) : null;
    });

    wsConnection.addEventListener("message", function(event) {
      if (event.data != "connection initialized") {
        var resultData = JSON.parse(event.data);
        var callbackIdentifier = resultData.callbackIdentifier;
        window.Callback(callbackIdentifier, resultData.result, event.data);
      }
    });
  }
}

function CloseLink() {
  wsConnection.close();
}

function LoadNative(url) {
  if (typeof isiOS != "undefined") {
    var messagingIframe = document.createElement('iframe');
    messagingIframe.style.display = 'none';
    messagingIframe.src = url;
    document.documentElement.appendChild(messagingIframe);
    setTimeout(function() { document.documentElement.removeChild(messagingIframe) }, 0)
  } else {
    wsConnection.send(url);
  }
}

function LoadAPI(apiName, data, callback) {
  var dataString = encodeURIComponent(JSON.stringify(data));
  var timestamp = Date.parse(new Date());
  var identifier = (apiName + dataString + timestamp).hashCode().toString();
  window.CTCallBackList[identifier] = callback;

  var url = "blbridge://api?callbackIdentifier=" + identifier + "&data=" + dataString + "&apiName=" + apiName;
  LoadNative(url);
}

function LoadMethod(targetName, actionName, data, callback) {
  var dataString = encodeURIComponent(JSON.stringify(data));
  var identifier = (targetName + actionName + dataString).hashCode().toString();
  window.CTCallBackList[identifier] = callback;

  var url = "blbridge://component?callbackIdentifier=" + identifier + "&data=" + dataString + "&targetName=" + targetName + "&actionName=" + actionName;
  LoadNative(url);
}

window.Callback = function(identifier, resultStatus, resultData) {

  callBackDict = window.CTCallBackList[identifier];

  if (callBackDict) {

    isFinished = true;
    if (resultStatus == "success") {
      callBackDict.success(resultData);
    }
    if (resultStatus == "fail") {
      callBackDict.fail(resultData);
    }
    if (resultStatus == "progress") {
      isFinished = false;
      callBackDict.progress(resultData);
    }

    if (isFinished) {
      window.CTCallBackList[identifier] = null;
      delete window.CTCallBackList[identifier];
    }
  }
}

if (typeof wsConnection == "undefined" || wsConnection.readyState != 1) {
  LinkToDevice(function(event) {
    // linked
    console.log('linked')
  }, function() {
    // close
    console.log('close')
  }, function(event) {
    // error
    console.log('error')
  });
} else {
  console.log('close')
  CloseLink();
}
