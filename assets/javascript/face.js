//Global variables, accessible to other files
faceAge = 0;
faceGender = 'male';
/*faceEthnicity;
faceBType;
faceBRequest;
faceBeauty;
faceEmotions;*/

//function to do the conversion of an image (received as url argument) and return and call a call back function
function convertImageFromUrlToBase64String(url, callbackFn) {
  var img = new Image();
  img.crossOrigin = "Anonymous";
  img.onload = function () {
    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;

    var context = canvas.getContext('2d');
    context.drawImage(img, 0, 0);
    var dataUrl = canvas.toDataURL('image/jpg');
    if (dataUrl && typeof callbackFn === 'function') {
      // look for "data: image/png;base64,"
      // or look for "data: image/jpg;base64,"
      // or look for "data: image/jpeg;base64,"
      //The Call back function, passes it the dataURL (base64 image) as an argument
      callbackFn(dataUrl.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""));
    }
  };
  img.src = url;//url is the img src
}
  
  //FaceAPI Analyze:
  function analyzeFace(){
    var url = "https://api-us.faceplusplus.com/facepp/v3/face/analyze";
    var queryParams = [
      "api_key=" + key,
      "api_secret=" + secret,
      "face_tokens="+faceToken,
      "return_landmark=1",
      "return_attributes=gender,age,emotion,ethnicity,beauty,glass,skinstatus,facequality"
    ].join('&');
    var query = url + '?' + queryParams;
    //console.log("The queryURL = "+query);
    $.ajax({
          url: query,
          method: "POST"
        }).then(function(response) {
          //console.log(response);
          faceAge = response.faces[0].attributes.age.value;
          faceGender = (response.faces[0].attributes.gender.value).toLowerCase();
          faceEthnicity = (response.faces[0].attributes.ethnicity.value).toLowerCase();
          faceBType = faceGender+'_score';
          faceBRequest = 'response.faces[0].attributes.beauty.'+faceBType;
          faceBeauty = faceBRequest;
          faceEmotions = response.faces[0].attributes.emotion;    
        });
  } 
  
  
  