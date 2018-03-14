var yAxis;

var scollAnimation = function (event) {
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

document.querySelector(".menu").addEventListener("click", function() {
    this.classList.toggle("activeMenu");
    document.querySelector("nav").classList.toggle("navOnOff");
})

window.addEventListener("scroll", scollAnimation);



