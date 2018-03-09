var dataController = (function () {
    /*var backup = {
        name: [],
        breed: [],
        information: [],
        age: [],
        inoculations: [],
        diseases: [],
        parasites: []
    }*/
    var backup = [
        {
            name: "katrine",
            breed: "pooch1",
            information: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce efficitur blandit condimentum. Proin accumsan lorem vel gra vida fringilla. Suspendisse potenti. Mauris ut pulvinar nunc. Donec consectetur, diam in porta tempus, urna ligula ves tibulum nibh",
            age: 1,
            inoculations: "none",
            diseases: "none",
            parasites: "none"
        },
        {
            name: "Jennifer",
            breed: "pooch2",
            information: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce efficitur blandit condimentum. Proin accumsan lorem vel gra vida fringilla. Suspendisse potenti. Mauris ut pulvinar nunc. Donec consectetur, diam in porta tempus, urna ligula ves tibulum nibh",
            age: 2,
            inoculations: "none",
            diseases: "none",
            parasites: "none"
        },
        {
            name: "Woody",
            breed: "pooch3",
            information: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce efficitur blandit condimentum. Proin accumsan lorem vel gra vida fringilla. Suspendisse potenti. Mauris ut pulvinar nunc. Donec consectetur, diam in porta tempus, urna ligula ves tibulum nibh",
            age: 3,
            inoculations: "none",
            diseases: "none",
            parasites: "none"
        },
        {
            name: "Sophia",
            breed: "pooch4",
            information: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce efficitur blandit condimentum. Proin accumsan lorem vel gra vida fringilla. Suspendisse potenti. Mauris ut pulvinar nunc. Donec consectetur, diam in porta tempus, urna ligula ves tibulum nibh",
            age: 4,
            inoculations: "none",
            diseases: "none",
            parasites: "none"
        },
        {
            name: "Timmy",
            breed: "pooch5",
            information: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce efficitur blandit condimentum. Proin accumsan lorem vel gra vida fringilla. Suspendisse potenti. Mauris ut pulvinar nunc. Donec consectetur, diam in porta tempus, urna ligula ves tibulum nibh",
            age: 5,
            inoculations: "none",
            diseases: "none",
            parasites: "none"
        },
        {
            name: "Charly",
            breed: "pooch6",
            information: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce efficitur blandit condimentum. Proin accumsan lorem vel gra vida fringilla. Suspendisse potenti. Mauris ut pulvinar nunc. Donec consectetur, diam in porta tempus, urna ligula ves tibulum nibh",
            age: 6,
            inoculations: "none",
            diseases: "none",
            parasites: "none"
        },
        {
            name: "Scarlett",
            breed: "pooch7",
            information: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce efficitur blandit condimentum. Proin accumsan lorem vel gra vida fringilla. Suspendisse potenti. Mauris ut pulvinar nunc. Donec consectetur, diam in porta tempus, urna ligula ves tibulum nibh",
            age: 7,
            inoculations: "none",
            diseases: "none",
            parasites: "none"
        },
        {
            name: "Freddie",
            breed: "pooch8",
            information: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce efficitur blandit condimentum. Proin accumsan lorem vel gra vida fringilla. Suspendisse potenti. Mauris ut pulvinar nunc. Donec consectetur, diam in porta tempus, urna ligula ves tibulum nibh",
            age: 8,
            inoculations: "none",
            diseases: "none",
            parasites: "none"
        }
    ]

    /* DataController Return*/

    return {
        petDetail: function (position) {
            return {
                name: backup[position].name,
                breed: backup[position].breed,
                information: backup[position].information,
                age: backup[position].age,
                inoculations: backup[position].inoculations,
                diseases: backup[position].disease,
                parasites: backup[position].parasites
            }
        },

        backupData: function () {
            return backup;
        }
    }

})();

var UIController = (function () {

    var DOMStrings = {
        ourPetContainer: ".our_pet_content_container",
        place: "#our_pet_content",
        crossButton: ".cross_button",
        body: "body",
        popup: "#popup"
    };

    var updateUI = function (data) {/*
        var html = '<section id="popup"><div class="popup_container"><div class="petimage"><img src=%image%></div><div class="pet_detail"><h4>%name%</h4><h6>%breed%</h6><p>%information%</p><ul type="none"><li><span>•</span>Age: %age%</li><li><span>•</span>Inoculations: %inoculations%</li><li><span>•</span>Diseases: %diseases%</li><li><span>•</span>Parasites: %parasites%</li></ul></div><span class="cross_button"><p>&#10005;</p></span></div></section>';

        var newHtml = html.replace("%image%", data.image);
        newHtml = newHtml.replace("%name%", data.name);
        newHtml = newHtml.replace("%breed%", data.breed);
        newHtml = newHtml.replace("%information%", data.information);
        newHtml = newHtml.replace("%age%", data.age);
        newHtml = newHtml.replace("%inoculations%", data.inoculations);
        newHtml = newHtml.replace("%diseases%", data.diseases);
        newHtml = newHtml.replace("%parasites%", data.parasites);

        document.querySelector(DOMStrings.place).insertAdjacentHTML("afterend", newHtml);*/
        
        document.querySelector(".petimage img").src = data.image;
        document.querySelector(".pet_detail h4").textContent = data.name;
        document.querySelector(".pet_detail h4").textContent = data.breed;
        document.querySelector(".pet_detail h4").textContent = data.information;
        document.querySelector(".pet_detail h4").textContent = data.age;
        document.querySelector(".pet_detail h4").textContent = data.inoculations;
        document.querySelector(".pet_detail h4").textContent = data.diseases;
        document.querySelector(".pet_detail h4").textContent = data.parasites;
        console.log(data.name);
        
    }

    /*UIController Return*/

    return {
        getDomStr: function () {
            return {
                petContainer: DOMStrings.ourPetContainer,
                place: DOMStrings.place,
                crossButton: DOMStrings.crossButton,
                body: DOMStrings.body,
                popup: DOMStrings.popup
            }
        },
        deployHtml: function (targetData) {
            updateUI(targetData);
        }
    }

})();

var controller = (function (dataCtrl, UICtrl) {

    /*variable for scroll axis to sx(scrollx), sy(scrolly)*/

    var sx, sy;

    var DOM = UICtrl.getDomStr();
    var petStoredData = dataCtrl.backupData();
    var mainData = {};
    var newMain = {};

    var boot = function () {
        document.querySelector(DOM.petContainer).addEventListener("click", getTargetData);

        document.querySelector(DOM.crossButton).addEventListener("click", removePopup);
    }


    var getTargetData = function (event) {

        var existID = event.target.parentNode.id;
        console.log(existID !== "our_pet_content" && event.srcElement.textContent == document.querySelector(".pets button").textContent);

        if (existID !== "our_pet_content" && event.srcElement.textContent === document.querySelector(".pets button").textContent) {
            var id = event.target.parentNode.id;
            var image = event.target.parentNode.childNodes[1].childNodes[1].src;

            mergeObject(id, image);

            /* to add event listners to newly created div called popup */
            boot();




            // stop scroll
            stopScroll("enable");
        }
    }

    var removePopup = function (event) {
        console.log(document.querySelector(DOM.body).removeChild(document.querySelector(DOM.popup)));

        stopScroll("disable");
    }

    var mergeObject = function (petId, petImage) {
        mainData.id = petId;
        mainData.image = petImage;
        newMain = Object.assign(mainData, petStoredData[petId]);
        console.log(newMain);

        /* send it to uiController */
        UICtrl.deployHtml(newMain);
    }

    /* stopscroll function */

    var stopScroll = function (checkStat) {
        sx = scrollX;
        sy = scrollY;
        checkStat === "enable" ? window.addEventListener('scroll', noscroll) : window.removeEventListener('scroll', noscroll);

    };

    var noscroll = function () {
        window.scroll(sx, sy);
    }

    /*Controller Return*/

    return {
        bootOnLoad: function () {
            boot();
        }
    }

})(dataController, UIController);



controller.bootOnLoad();
