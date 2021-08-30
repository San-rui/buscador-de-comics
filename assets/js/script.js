var createHeader = function () {
    var header = document.createElement('header');
    var mainTitle = document.createElement('h1');
    var containerImg = document.createElement('div');
    mainTitle.innerHTML = "ADA COMICS";
    //headerImg.setAttribute('src','./assets/images/pngwing.com.png');
    header.classList.add('primary-header');
    header.appendChild(mainTitle);
    header.appendChild(containerImg);
    document.body.appendChild(header);
};
createHeader();
