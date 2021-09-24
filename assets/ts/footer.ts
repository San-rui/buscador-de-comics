const footer = document.createElement('footer');
footer.classList.add('footer-style');

const footerText =document.createElement('p');
footerText.classList.add('footer-text-style');
footerText.innerHTML="Hecho con amor por San";

footer.appendChild(footerText)
document.body.appendChild(footer);
