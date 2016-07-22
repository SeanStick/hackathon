function takephoto() {
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL
    });
}

function onSuccess(imageData) {
    var image = document.getElementById('myImage');
    image.src = "data:image/jpeg;base64," + imageData;
    dataPacket = {"requests":[{"features":[{"type":"TEXT_DETECTION","maxResults":1}],"image":{"content":imageData}}]};

    callGoogleVision(dataPacket);
    document.getElementById("text1").innerHTML = imageData;
}

function onFail(message) {
    alert('Failed because: ' + message);
}

function sendData(message) {  
    $.ajax({
        url: 'http://soytap.azurewebsites.net/api',
        type: 'post',
        data: {
            card: message,
            user: '1',
            toast: true,
            openTab: true
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
    sendData($("#transcript").val())
    alert($("#transcript").val())
}



function callGoogleVision(data){
        console.log(data);
        $.ajax({
            type:"POST",
            url: "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAkmciEMCM4IyBvgDkXUPCg-YLiVIwwxRE",
            data: JSON.stringify(data),
            cache: false,
            headers: {
                key: "AIzaSyAkmciEMCM4IyBvgDkXUPCg-YLiVIwwxRE"
            },
            contentType: "text/plain;charset=UTF-8",
            success: function( resp ){
                // it works
                $("#results").html(resp);
                console.log(resp);
                strResp = JSON.stringify(resp);

                var re = /\d{6}/;
                var str = "fee 123456 fi fo fum";
                var myArray = strResp.match(re);
                console.log(myArray[0]);
                // alert(myArray[0]);
                sendData(myArray[0]);

                // for (var i = 0; i < myArray; i++) {
                //     alert(myArray[i]);
                //     //Do something
                // }


            },
            error: function( resp ){
                // error!
                $("#results").html(resp);
                console.log(resp);
            },
            complete: function(jqXHR, textStatus){
                // probably don't need
            }
        });
    }

function startDictation() {

    if (window.hasOwnProperty('webkitSpeechRecognition')) {

        var recognition = new webkitSpeechRecognition();

        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.lang = "en-US";
        recognition.start();

        recognition.onresult = function(e) {
            document.getElementById('transcript').value
                                                             = e.results[0][0].transcript;
            recognition.stop();
            document.getElementById('labnol').submit();
        };

        recognition.onerror = function(e) {
            recognition.stop();
        }

    }
}