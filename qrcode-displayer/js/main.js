const showQr = function(qrContent) {
  const qrDom = $("#qrcode-div")[0];
  var qrcode = new QRCode(qrDom, {
    text: qrContent,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
  });
}

const showText = function(text) {
  $("#qrcode-div").text(text)
}

const getParamters = function(key) {
  const url = new URL(window.location.href);
  return url.searchParams.get(key);
}

$(function() {
  const qrContent = getParamters('text');
  if(!!qrContent) {
    showQr(qrContent);
  } else {
    showText("no pay no gain");
  }
  
});