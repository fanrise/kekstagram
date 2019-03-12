'use strict';

var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var descriptions = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var photosList = [];

var getArrayOfNumbers = function (array, length) {
  for (var i = 0; i < length; i++) {
    array[array.length] = i + 1;
  }
};

var mixArray = function (array, times) {
  for (var i = 0; i < array.length * times; i++) {
    var randomIndex1 = Math.floor(Math.random() * array.length);
    var randomIndex2 = Math.floor(Math.random() * array.length);
    var tempIndex = photosList[randomIndex1];
    array[randomIndex1] = array[randomIndex2];
    array[randomIndex2] = tempIndex;
  }
};
getArrayOfNumbers(photosList, 25);
mixArray(photosList, 1);

var userPictures = []; // Создание пустого массива

var addObjectToArray = function (number) { // Добавляются данные фотографий
  for (var i = 0; i < number; i++) {
    userPictures[userPictures.length] = {
      url: 'photos/' + photosList[i] + '.jpg',
      objectIndex: i,
      likes: Math.floor(Math.random() * (201 - 15)) + 15,
      comments: getRandomElement(comments),
      numberOfComments: Math.floor(Math.random() * (125 - 5)) + 5,
      description: getRandomElement(descriptions)
    };
  }
};
addObjectToArray(25);

var pictures = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content;

var createElement = function (i) {
  var element = pictureTemplate.cloneNode(true);
  element.querySelector('.picture__img').setAttribute('src', userPictures[i].url);
  element.querySelector('.picture__img').setAttribute('objectIndex', userPictures[i].objectIndex);
  element.querySelector('.picture__likes').textContent = userPictures[i].likes;
  element.querySelector('.picture__comments').textContent = userPictures[i].numberOfComments;
  return element;
};

var insertElement = function (array) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(createElement(i));
  }
  pictures.appendChild(fragment);
};

insertElement(userPictures);

var bigPicture = document.querySelector('.big-picture');

var createBigElement = function (i) {
  bigPicture.querySelector('.big-picture__img > img').setAttribute('src', userPictures[i].url);
  bigPicture.querySelector('.likes-count').textContent = userPictures[i].likes;
  bigPicture.querySelector('.comments-count').textContent = userPictures[i].numberOfComments;
  bigPicture.querySelector('.social__caption').textContent = userPictures[i].description;
  bigPicture.querySelector('.social__comments').innerHTML = (
    '<li class="social__comment social__comment--text"><img class="social__picture" src="img/avatar-' +
      (Math.floor(Math.random() * (7 - 1)) + 1) + '.svg" alt="Аватар комментатора фотографии" width="35" height="35"> <p class="social__text">' + userPictures[i].comments + '</p></li>'
  );
  return bigPicture;
};

bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
bigPicture.querySelector('.social__comments-loader').classList.add('visually-hidden');

// var smallPictures = querySelectorAll('.picture');
document.addEventListener('click', function (evt) {
  evt.stopPropagation();
  if (evt.target.className === 'picture__img') {
    createBigElement(evt.target.getAttribute('objectIndex'));
    bigPicture.classList.remove('hidden');
  }
});

var bigPictureCancel = document.querySelector('.big-picture__cancel')

bigPictureCancel.addEventListener('click', function () {
  bigPicture.classList.add('hidden');
});

var imgUpload = document.querySelector('.img-upload');
var uploadFile = imgUpload.querySelector('#upload-file');
var imgUploadOverlay = imgUpload.querySelector('.img-upload__overlay');
var imgUploadCancel = imgUpload.querySelector('.img-upload__cancel');

var openUploadModal = function () {
  for (var i = 0; i < effectsRadio.length; i++) {
    effectsRadio[i].addEventListener('click', onEffectClick);
  }
  scaleControlSmaller.addEventListener('click', onControlSmallerClick);
  scaleControlBigger.addEventListener('click', onControlBiggerClick);
  document.addEventListener('keydown', onDocumentEsc);
  imgUploadOverlay.classList.remove('hidden');
};

var closeUploadModal = function () {
  for (var i = 0; i < effectsRadio.length; i++) {
    effectsRadio[i].removeEventListener('click', onEffectClick);
  }
  scaleControlSmaller.removeEventListener('click', onControlSmallerClick);
  scaleControlBigger.removeEventListener('click', onControlBiggerClick);
  document.removeEventListener('keydown', onDocumentEsc);
  imgUploadOverlay.classList.add('hidden');
  imgagePrevie.className = '';
  imgUploadEffectLevel.classList.add('hidden');
  textHashtags.classList.remove('text__hashtags--error');
  textHashtags.setCustomValidity('');
  uploadFile.value = '';
  textHashtags.value = '';
  textDescription.value = '';
};

var onDocumentEsc = function (evt) {
  if (evt.keyCode === 27) {
    if (evt.target === textHashtags || evt.target === textDescription) {
      evt.stopPropagation();
      evt.target.blur();
    } else {
      closeUploadModal();
    }
  }
};

uploadFile.addEventListener('change', function () {
  openUploadModal();
});

imgUploadCancel.addEventListener('click', function () {
  closeUploadModal();
});

var scaleControlSmaller = imgUpload.querySelector('.scale__control--smaller');
var scaleControlBigger = imgUpload.querySelector('.scale__control--bigger');
var scaleControlValue = imgUpload.querySelector('.scale__control--value');
var imgUploadPreview = imgUpload.querySelector('.img-upload__preview');

var changeScale = function () {
  imgUploadPreview.style.transform = 'scale(' + parseInt(scaleControlValue.value, 10) * 0.01 + ')';
};

var onControlSmallerClick = function () {
  var currentValue = scaleControlValue.value;
  if (scaleControlValue.value !== '25%') {
    scaleControlValue.value = parseInt(currentValue, 10) - 25 + '%';
    changeScale();
  } else {
    return;
  }
};

var onControlBiggerClick = function () {
  var currentValue = scaleControlValue.value;
  if (scaleControlValue.value !== '100%') {
    scaleControlValue.value = parseInt(currentValue, 10) + 25 + '%';
    changeScale();
  } else {
    return;
  }
};

var imgagePrevie = imgUploadPreview.querySelector('img');
var effectsRadio = imgUpload.querySelectorAll('.effects__radio');

var onEffectClick = function (evt) {
  if (evt.target.value === 'none') {
    imgUploadEffectLevel.classList.add('hidden');
  } else {
    imgUploadEffectLevel.classList.remove('hidden');
  }
  // imgagePrevie.style.filter = '';
  imgagePrevie.className = '';
  imgagePrevie.classList.add('effects__preview--' + evt.target.value);
};

var imgUploadEffectLevel = imgUpload.querySelector('.img-upload__effect-level');
imgUploadEffectLevel.classList.add('hidden');

// var effectLevelPin = imgUpload.querySelector('.effect-level__pin');
// var effectLevelLine = imgUpload.querySelector('.effect-level__line');
//
// effectLevelPin.addEventListener('mouseup', function () {
//   var positionPx = window.getComputedStyle(effectLevelPin).left;
//   var positionPersent = parseInt(positionPx, 10) / 453;
//   imgagePrevie.style.filter = 'grayscale(' + positionPersent + ')';
// });

var imgUploadSubmit = imgUpload.querySelector('.img-upload__submit');
var imgUploadForm = imgUpload.querySelector('.img-upload__form');
var textHashtags = imgUpload.querySelector('.text__hashtags');
var textDescription = imgUpload.querySelector('.text__description');

// imgUploadSubmit.addEventListener('click', function (evt) {
//   // evt.preventDefault();
// });

var errorAction = function () {
  textHashtags.classList.add('text__hashtags--error');
  textHashtags.reportValidity();
};

var successAction = function () {
  textHashtags.classList.remove('text__hashtags--error');
  textHashtags.setCustomValidity('');
};

var checkHashtags = function () {
  textHashtags.value = textHashtags.value.replace(/\s+/g, ' ');
  var hashtagsArray = textHashtags.value.toLowerCase().split(' ');
  for (var i = 0; i < hashtagsArray.length; i++) {
    if (hashtagsArray.length > 5) {
      textHashtags.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
      errorAction();
      break;
    } else if (hashtagsArray[i][0] !== '#' && hashtagsArray[i] !== '') {
      textHashtags.setCustomValidity('Хэш-тег должен начинаться с символа #');
      errorAction();
      break;
    } else if (hashtagsArray[i] === '#') {
      textHashtags.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
      errorAction();
      break;
    } else if (hashtagsArray[i].indexOf('#', 1) !== -1) {
      textHashtags.setCustomValidity('Хеш-теги должны разделяться пробелом');
      errorAction();
      break;
    } else if ((hashtagsArray.indexOf(hashtagsArray[i]) !== -1) && (hashtagsArray.indexOf(hashtagsArray[i]) !== i)) {
      textHashtags.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
      errorAction();
      break;
    } else if (hashtagsArray[i].length > 20) {
      textHashtags.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку');
      errorAction();
      break;
    } else {
      successAction();
    }
  }
};

textHashtags.addEventListener('input', function () {
  checkHashtags();
});
