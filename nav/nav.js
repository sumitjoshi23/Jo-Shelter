var yAxis;

var scollAnimation = function () {
    yAxis = scrollY
    if (yAxis < 40) {
        document.querySelector("nav").classList.remove("activeNav");
        document.querySelector(".navbar").classList.remove("activeNavbar");
        document.querySelector(".logo").classList.remove("activeLogo");
    } else if (yAxis > 40) {
        document.querySelector("nav").classList.add("activeNav");
        document.querySelector(".navbar").classList.add("activeNavbar");
        document.querySelector(".logo").classList.add("activeLogo");
    }
}

window.addEventListener("scroll", scollAnimation);
