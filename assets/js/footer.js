var createFooter = function () {
    var footer = document.createElement('footer');
    footer.classList.add('footer-style');
    var footerText1 = document.createElement('p');
    footerText1.classList.add('footer-text-style');
    var footerText2 = document.createElement('p');
    footerText2.classList.add('footer-text-style');
    var imageFooter = document.createElement('img');
    imageFooter.setAttribute('src', '../assets/images/love.png');
    imageFooter.classList.add('footer-img');
    footerText1.innerHTML = "Hecho con";
    footerText2.innerHTML = "por San";
    footer.appendChild(footerText1);
    footer.appendChild(imageFooter);
    footer.appendChild(footerText2);
    document.body.appendChild(footer);
};
createFooter();
