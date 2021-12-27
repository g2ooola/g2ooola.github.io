// ref : https://github.com/mebjas/html5-qrcode

// ref : https://github.com/mebjas/html5-qrcode#scanning-without-cameraid
const QrWidget = function(){
  this.html5QrCode = new Html5Qrcode("qr-reader-div");
  this.qrCodeSuccessCallback = (decodedText, decodedResult) => {
      /* handle success */
      this.stop();
      // alert(decodedResult.decodedText);

      $("#target_button").attr("href", decodedResult.decodedText);
      
  };
  this.config = { fps: 10 };
  // options
  //  寬跟高 : qrbox: { width: 250, height: 250 }

  this.start = function(){
    this.html5QrCode.start({ facingMode: "environment" }, this.config, this.qrCodeSuccessCallback);
  };
  this.stop = function(){
    this.html5QrCode.stop().then((ignore) => {
      // QR Code scanning is stopped.
    }).catch((err) => {
      // Stop failed, handle it.
      alert(err)
    });
  };
}



$(function() {
  const qr = new QrWidget;

  $("#reload").on( "click", function() {
    qr.start();
  });

  qr.start();
});
