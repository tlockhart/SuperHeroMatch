$(document).ready(function () {
  // FacePlusPlus API:
  var key = 'o5qW4trQcuO1e8ElIJEIDnecHNILHOSu'
  var secret = 'i4yY2sL2dg8cOxpUYTN8AZ4pKMHGP2lV'

  var input = document.querySelector('#image-input')
  var preview = document.querySelector('.preview')
  var error = document.querySelector('.error')
  var fileTypes = [
    'image/jpeg',
    'image/pjpeg',
    'image/png'
  ]
  var list
  var listItem
  var br = document.createElement('BR')
  var para = document.createElement('p')
  var fileName, fileSize
  var image
  var imageWidth
  var imageHeight
  var isInputValid = false
  var faceToken

  // const
  var imageMin = 48
  var imageMax = 800
  var maxKB = 2

  $('#select-btn').on('click', function () {
  // select button isn't a button, its a label
    // event.preventDefault();
    $('#select-btn').hide()

    // enable submit-image (Upload Image Button)
    $('#submit-image').prop('disabled', false)

    var $ptag = $('.preview #file-msg').text()
  })

  function enableSubmitBtn () {
    var $ptag = $('.preview #file-msg').text()
    if ($ptag === 'File not accepted.') {
      // disable submit-btn
      $('#submit-btn').prop('disabled', true)
      // console.log("Image not processed");
    }
  }
  $('#submit-image').on('click', function () {
    // Don't refresh the page!
    event.preventDefault()
    /*********************************************************************
    *Enablesubmit Button for Error Handling
    ***********************************************************************/
    $('#select-btn').attr('disabled', 'disabled')
    $('#submit-image').prop('disabled', true)
    // face++ timer to give results time to return
    enableSubmitBtn()

    /***********************************************************************/

    // Check Image Dimensions
    if (imageWidth >= imageMin && imageWidth <= imageMax && imageHeight >= imageMin && imageHeight <= imageMax) {
      isInputValid = true
    } else {
      isInputValid = false
    }

    // Check File Size
    var unit = fileSize.slice(-2)
    var fileSizeNumber = fileSize.replace(/[^\d.-]/g, '')
    // console.log("FILESIZE = "+fileSizeNumber+"Unit = "+unit);
    if (unit === 'MB') {
      if (fileSizeNumber <= maxKB) {
        isInputValid = true
      } else {
        isInputValid = false
      }
    }

    // If input is not valid do not accept image and do nothing
    if (!isInputValid) {
      // console.log ("Image is not acceptable!");
      var fileMsg = document.getElementById('file-msg')
      // console.log ("IS FILEMSG CREATED = "+fileMsg);
      if (fileMsg) {
        document.getElementById('file-msg').innerHTML = 'File not accepted.'
      } else {
        var error = document.createElement('p')
        error.setAttribute('id', 'file-msg')
        var node = document.createTextNode('File not accepted.')
        error.appendChild(node)
        preview.appendChild(error)
      }

      document.getElementById('submit-btn').disabled = true

      // show select image:
      $('#select-btn').show()

      // disable submit-image (Upload Image Button)
      $('#submit-image').prop('disabled', true)
      return

      // Disable submit-btn button
      // $('#submit-btn').attr('disabled', 'disabled');
      // disable submit-btn
      // $('#submit-btn').prop('disabled', true);
      document.getElementById('submit-btn').disabled = true
    } else {
      // console.log ("Image is acceptable, Sending to FacePlusPlus!");
      var imageUrl = image.src
      /*********************************************************
         *This is a call to the function above, it accepts the
         *base64Str from the callbackFn and sends it to Face++API:
         *It will take 10 sec depending on photo size
        ***********************************************************/
      convertImageFromUrlToBase64String(imageUrl, function (base64Str) {
        var cors = 'https://cors-anywhere.herokuapp.com/'
        var query = cors + 'https://api-us.faceplusplus.com/facepp/v3/detect'
        var queryParameters = [
          'api_key=' + key,
          'api_secret=' + secret,
          'image_base64=' + base64Str,
          // This works:
          // "image_url=" + imageUrl,
          'return_landmark=1',
          'return_attributes=gender,age'
        ].join('&')

        // console.log("The queryURL = " + query);

        $.ajax({
          url: query,
          method: 'POST',
          data: {
            'api_key': key,
            'api_secret': secret,
            'image_base64': base64Str,
            'return_landmark': 1,
            'return_attributes': 'gender,age',
            // dataType: 'jsonp',
            // success: options.success,
            // error: options.error,
            timeout: 10 * 1000
          }
        }).then(function (response) {
          // Create CODE HERE to Log the queryURL
          // Create CODE HERE to log the resulting object
          parseToken(response)
        })
      })// convertImageFromUrlToBase64String
    }// else
  })// submit-Image on click

  /********************************************
 * Store Face_Token for data Analysis:
 * ******************************************/
  function parseToken (faceObj) {
    faceToken = faceObj.faces[0].face_token
    // console.log(faceToken);

    // Call FaceAPI to Analyze data
    analyzeFace()
  }

  // When there is a change on the input field call setDimensions
  $('#image-input').on('change', setDimensions)
  // });

  // When there is a change on the input field call updateImageDisplay
  input.addEventListener('change', updateImageDisplay)

  // Check whether the file type of the input file is valid
  function isFileTypeValid (file) {
    for (var i = 0; i < fileTypes.length; i++) {
      if (file.type === fileTypes[i]) {
        // console.log("File Length = "+fileTypes.length);
        return true
      }
    }

    return false
  }
  // Returns formatted version of file size
  function returnFileSize (number) {
    if (number < 1024) {
      return number + 'bytes'
    } else if (number >= 1024 && number < 1048576) {
      return (number / 1024).toFixed(1) + 'KB'
    } else if (number >= 1048576) {
      return (number / 1048576).toFixed(1) + 'MB'
    }
  }

  function updateImageDisplay () {
    // empty previous contents of .preview
    while (preview.firstChild) {
      preview.removeChild(preview.firstChild)
    }

    // Store the selected file into a variable called curFiles
    var curFiles = input.files

    // If no file was selected Output message to preview
    if (curFiles.length === 0) {
      para.textContent = 'No file currently selected for upload'
      preview.appendChild(para)
    }
    // If files selected loop through the files
    else {
      list = document.createElement('ol')
      preview.appendChild(list)
      for (var i = 0; i < curFiles.length; i++) {
        listItem = document.createElement('li')
        listItem.setAttribute('id', 'li-id')
        // Print the image name and file size if the file type matches the accepted types
        if (isFileTypeValid(curFiles[i])) {
          fileName = curFiles[i].name
          fileSize = returnFileSize(curFiles[i].size)
          // console.log(curFiles[i]);
          image = document.createElement('img')
          image.setAttribute('id', 'image-id')
          image.src = window.URL.createObjectURL(curFiles[i])
          image.style.width = '200px'
          listItem.appendChild(image)
          document.getElementById('submit-image').disabled = false
        }
        // Else print out file is not valid
        else {
          para.textContent = 'File name ' + curFiles[i].name + ': File type not valid. Please select an image.'
          listItem.appendChild(para)
          document.getElementById('submit-image').disabled = true
        }// else
      }// for
    }// else
    /******************************
     * DISPLAY SAME PICTURE
     * *****************************/
    curFiles == []
    input.value = null
    /******************************/
  }// updateImageDisplay

  function setDimensions () {
    var _URL = window.URL || window.webkitURL
    var img
    var file
    var $p = $('<p>')
    if ((file = this.files[0])) {
      img = new Image()
      img.onload = function () {
        imageWidth = this.width
        imageHeight = this.height
        para = document.createTextNode('File Name: ' + fileName + ', File Size: ' + fileSize + ', Width: ' + imageWidth + ', Height: ' + imageHeight)
        listItem.appendChild(br)
        listItem.appendChild(para)
        list.appendChild(listItem)

        // Insert break before paragraph:
        listItem.insertBefore(br, para)
      }
      img.onerror = function () {
        // console.log('NOT A Valid File: '+file.type);
        var error = document.createElement('p')
        var node = document.createTextNode('Not a valid file: ' + file.type)
        error.appendChild(node)
        preview.appendChild(error)
        document.getElementById('submit-image').disabled = true
      }
      img.src = _URL.createObjectURL(file)
    }// if
  }// setDimensions
  // function to do the conversion of an image (received as url argument) and return and call a call back function
  function convertImageFromUrlToBase64String (url, callbackFn) {
    var img = new Image()
    img.crossOrigin = 'Anonymous'
    img.onload = function () {
      var canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height

      var context = canvas.getContext('2d')
      context.drawImage(img, 0, 0)
      var dataUrl = canvas.toDataURL('image/jpg')
      if (dataUrl && typeof callbackFn === 'function') {
      // look for "data: image/png;base64,"
      // or look for "data: image/jpg;base64,"
      // or look for "data: image/jpeg;base64,"
      // The Call back function, passes it the dataURL (base64 image) as an argument
        callbackFn(dataUrl.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''))
      }
    }
    img.src = url// url is the img src
  }// convertImage
  function analyzeFace () {
    var url = 'https://api-us.faceplusplus.com/facepp/v3/face/analyze'
    var queryParams = [
      'api_key=' + key,
      'api_secret=' + secret,
      'face_tokens=' + faceToken,
      'return_landmark=1',
      'return_attributes=gender,age,emotion,ethnicity,beauty,glass,skinstatus,facequality'
    ].join('&')
    var query = url + '?' + queryParams
    // console.log("The queryURL = "+query);
    $.ajax({
      url: query,
      method: 'POST'
    }).then(function (response) {
      // console.log(response);
      var faceAge = response.faces[0].attributes.age.value
      var faceGender = (response.faces[0].attributes.gender.value).toLowerCase()
      var faceEthnicity = (response.faces[0].attributes.ethnicity.value).toLowerCase()
      var faceBType = faceGender + '_score'
      var faceBRequest = 'response.faces[0].attributes.beauty.' + faceBType
      var faceBeauty = faceBRequest
      var faceEmotions = response.faces[0].attributes.emotion

      // $faceMsg.text('');
      var $facePara = $('#face')
      if ($facePara.length === 0) {
        var $faceMsg = $('<p>')
        $faceMsg.attr('id', 'face')
        $faceMsg.text('Identity processed!')
        $faceMsg.attr('age', faceAge)
        $faceMsg.attr('gender', faceGender)
        $('.preview').append($faceMsg)

        // Enable submit button  when response from face++ received
        $('#submit-btn').prop('disabled', false)
        $('#submit-btn').show();
        $('#reset-btn').hide();

        // console.log("Image has been processed!"+"Gender = "+faceGender+" Age = "+faceAge);
      } else {
        $faceMsg.text('Image not processed!')
        // console.log("Image has been processed!"+"Gender = "+faceGender+" Age = "+faceAge);
        // console.log("face id is not null");
      }
    })
  }// analyzeFace
}) // document ready
