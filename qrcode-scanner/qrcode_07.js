// ref https://www.tpisoftware.com/tpu/articleDetails/1221

const CodeHandler = function(){
  this.sms_regex = /(SMSTO):(\d+):(.*)/;
  // this.start = function(string) {
  //   const link = this.parse(string);
  //   this.set_value(link);
  // }
  this.parse = function(string){
    let regex = this.sms_regex;
    let result = this.sms_regex.exec(string);
    if(result) {
      const tel = result[2];
      const text = result[3];
      const android_sms_url_scheme = `sms:${tel}?body=${text}`;
      const ios_sms_url_scheme     = `sms:${tel}&body=${text}`;
      return android_sms_url_scheme;
    } else {
      return string;
    }
  };
  // this.set_value = function(link) {
  //   $("#target_button").attr("href", link);
  // }
}

const StatusHandler = function(){
  this.set_resule = function(link) {
    $("#target_button").attr("href", link);
    $("#target_button").removeClass("empty");
  }
  this.clear_result = function() {
    $("#target_button").removeAttr("href");
    $("#target_button").addClass("empty");
  }
}

// ref : https://github.com/mebjas/html5-qrcode
// ref : https://github.com/mebjas/html5-qrcode#scanning-without-cameraid
const QrWidget = function(){
  this.html5QrCode = new Html5Qrcode("qr-reader-div");
  this.codeHandler = new CodeHandler();
  this.statusHandler = new StatusHandler();
  this.is_start = false;

  this.qrCodeSuccessCallback = (decodedText, decodedResult) => {
    const qrText = decodedResult.decodedText;
    const link = this.codeHandler.parse(qrText);
    this.statusHandler.set_resule(link);
    // this.pause();
    this.stop();
  };
  this.reloadQrcode = function() {
    this.statusHandler.clear_result();
    // this.resume();
    this.start();
  }
  this.config = { fps: 10, qrbox: { width: 250, height: 250 } };

  this.start = function(){
    this.html5QrCode.start({ facingMode: "environment" }, this.config, this.qrCodeSuccessCallback);
    this.is_start = true;
    this.statusHandler.clear_result();
  };
  this.stop = function(){
    this.html5QrCode.stop().then((ignore) => {
      this.is_start = false;
    }).catch((err) => {
      // Stop failed, handle it.
      alert(err)
    });
  };
  this.weightSwitch = function() {
    this.is_start ? this.stop() : this.start()
  };
  this.pause = function() {
    this.html5QrCode.pause();
  };
  this.resume = function() {
    this.html5QrCode.resume();
  };
}





$(function() {
  const qr = new QrWidget;

  $("#reload").on( "click", function() {
    qr.reloadQrcode();
  });

  $("#options_button").on( "click", function() {
    qr.weightSwitch();
  });

  qr.start();
});
