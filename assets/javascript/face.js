    //function to do the conversion of an image (received as url argument) and return and call a call back function
    function convertImageFromUrlToBase64String (url, callbackFn) {
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
      //"image_url=" +image.src,
      "return_landmark=1",
      "return_attributes=gender,age,emotion,ethnicity,beauty,glass,skinstatus,facequality"
    ].join('&');
    var query = url + '?' + queryParams;
    console.log("The queryURL = "+query);
    $.ajax({
          url: query,
          method: "POST"
        }).then(function(response) {
    
          // Create CODE HERE to Log the queryURL
          
          // Create CODE HERE to log the resulting object
          console.log(response);
          var age = response.faces[0].attributes.age.value;
          var gender = (response.faces[0].attributes.gender.value).toLowerCase();
          var ethnicity = (response.faces[0].attributes.ethnicity.value).toLowerCase();
          var bType = gender+'_score';
          var bRequest = 'response.faces[0].attributes.beauty.'+bType;
          var beauty = bRequest;
          var emotions = response.faces[0].attributes.emotion;
          var output = 'AGE = '+age+', Ethnicity = '+ethnicity+', Gender = '+gender;
          var $imageStats = $('<p>');
          $imageStats.text(output);
          $('.face-display').append($imageStats);
          console.log(output+', Beauty = '+beauty);
    
        });
  }
  
  
  
  