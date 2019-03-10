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

var userPictures = [];
var addObjectToArray = function (number) {
  for (var i = 0; i < number; i++) {
    userPictures[userPictures.length] = {
      url: 'photos/' + photosList[i] + '.jpg',
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
// bigPicture.classList.remove('hidden');

var createBigElement = function () {
  bigPicture.querySelector('.big-picture__img > img').setAttribute('src', userPictures[0].url);
  bigPicture.querySelector('.likes-count').textContent = userPictures[0].likes;
  bigPicture.querySelector('.comments-count').textContent = userPictures[0].numberOfComments;
  bigPicture.querySelector('.social__caption').textContent = userPictures[0].description;
  bigPicture.querySelector('.social__comments').innerHTML = (
    '<li class="social__comment social__comment--text"><img class="social__picture" src="img/avatar-' +
      (Math.floor(Math.random() * (7 - 1)) + 1) + '.svg" alt="Аватар комментатора фотографии" width="35" height="35"> <p class="social__text">' + userPictures[0].comments + '</p></li>'
  );
  return bigPicture;
};

bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
bigPicture.querySelector('.social__comments-loader').classList.add('visually-hidden');

// createBigElement();

var imgUpload = document.querySelector('.img-upload');
var uploadFile = imgUpload.querySelector('#upload-file');
var imgUploadOverlay = imgUpload.querySelector('.img-upload__overlay');
var imgUploadCancel = imgUpload.querySelector('.img-upload__cancel');

var onDocumentEsc = function (evt) {
  if (evt.keyCode === 27) {
    imgUploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onDocumentEsc);
  }
};

uploadFile.addEventListener('change', function () {
  imgUploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentEsc);
});

imgUploadCancel.addEventListener('click', function () {
  imgUploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentEsc);
});

var scaleControlSmaller = imgUpload.querySelector('.scale__control--smaller');
var scaleControlBigger = imgUpload.querySelector('.scale__control--bigger');
var scaleControlValue = imgUpload.querySelector('.scale__control--value');

scaleControlSmaller.addEventListener('click', function () {
  var currentValue = scaleControlValue.value;
  if (scaleControlValue.value !== '25%') {
    scaleControlValue.value = parseInt(currentValue, 10) - 25 + '%';
  } else {
    return;
  }
});

scaleControlBigger.addEventListener('click', function () {
  var currentValue = scaleControlValue.value;
  if (scaleControlValue.value !== '100%') {
    scaleControlValue.value = parseInt(currentValue, 10) + 25 + '%';
  } else {
    return;
  }
});
