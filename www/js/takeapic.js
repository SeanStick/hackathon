function takephoto() {
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL
    });
}

function onSuccess(imageData) {
    var image = document.getElementById('myImage');
    image.src = "data:image/jpeg;base64," + imageData;
    document.getElementById("text1").innerHTML = imageData;
}

function onFail(message) {
    alert('Failed because: ' + message);
}

function sendData(message) {
    alert("start");

   
// $.post( "http://soytap.azurewebsites.net/api", function( data ) {
//   // $( ".result" ).html( data );
//   alert(data);
// });

    $.ajax({
        url: 'http://soytap.azurewebsites.net/api',
        type: 'post',
        data: {
            card: message,
            user: '1'
        },
        headers: {
            type: 'RTC'
        },
        success: function(data) {
            console.info(data);
        },
        cache: false
    });


}


function scan()
{
    cordova.plugins.barcodeScanner.scan(
        function (result) {
            if(!result.cancelled)
            {
                if(result.format == "QR_CODE")
                {                    
                    console.log("QR Data");
                    alert(result.text);
                    sendData(result.text)
                }
            }
        },
        function (error) {
            alert("Scanning failed: " + error);
        }
   );
}

function sendTextData() {
    sendData($("#rtcText").val())
}