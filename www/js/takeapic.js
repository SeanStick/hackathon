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
	// document.getElementById("text1").innerHTML = imageData;
}

function onFail(message) {
	alert('Failed because: ' + message);
}

function resetFields(){
	$("#url").val('');
	$("#team").val('');



}

function sendData(message) {
  var userID = localStorage.getItem("userID");
	$.ajax({
		url: 'https://hackathon--1378.appspot.com/api',
		type: 'post',
		data: {
			card: message,
			user: userID,
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
		//console.log(data);
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
				//console.log(resp);
				strResp = JSON.stringify(resp);

				var re = /\d{6}/;
				var myArray = strResp.match(re);
				//console.log(myArray[0]);
        alert("google returned" + myArray[0]);
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
				//console.log(resp);
			},
			complete: function(jqXHR, textStatus){
				// probably don't need
			}
		});
	}

function startDictation() {

	if (window.hasOwnProperty('webkitSpeechRecognition')) {
		var recognition = new webkitSpeechRecognition();
	}
	else{
		var recognition = new SpeechRecognition();
	}
	try{
		recognition.continuous = false;
		recognition.interimResults = false;

		recognition.lang = "en-US";
		recognition.start();

		recognition.onresult = function(e) {
			var myTranscript = e.results[0][0].transcript;
			var re = /\d{6}/;
			var myText = myTranscript.replace(/(\-)|(\s)/g,"");
			
			recognition.stop();

			document.getElementById('transcript').value = myText.match(re);
			sendTextData();
		};

		recognition.onerror = function(e) {
			recognition.stop();
		}
	}
	catch(e){
		console.log("no speech recognition");
	}
}

function saveUserID() {

  localStorage.setItem("userID", $("#userID").val());

}
