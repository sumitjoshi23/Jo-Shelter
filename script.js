var sy;

addEventListener("scroll",function() {
    sy = scrollY;
    sy > 782 && sy < 1268 ? document.querySelector(".billi").classList.add("rotateBcBilli"): document.querySelector(".billi").classList.remove("rotateBcBilli");
    
    /*document.querySelector(".pets")[2];*/
});


