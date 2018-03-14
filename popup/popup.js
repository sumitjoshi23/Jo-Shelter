var dataController = (function () {
    /*var backup = {
        name: [],
        breed: [],
        information: [],
        age: [],
        lifeSpan: [],
        height: [],
        gender: []
    }*/
    var backup = [
        {
            name: "katrine",
            breed: "Chartreux",
            information: "The Chartreux is a rare breed of domestic cat from France and is recognised by a number of registries around the world. The Chartreux is large and muscular (called cobby) with relatively short, fine-boned limbs, and very fast reflexes.",
            age: "1 Year, 3 Months",
            lifeSpan: "11-15 years",
            height: "30cm",
            gender: "Female"
        },
        {
            name: "Jennifer",
            breed: "Golden retriever pup",
            information: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce efficitur blandit condimentum. Proin accumsan lorem vel gra vida fringilla. Suspendisse potenti. Mauris ut pulvinar nunc. Donec consectetur, diam in porta tempus, urna ligula ves tibulum nibh",
            age: "2 Months",
            lifeSpan: "10-12 years",
            height: "25 cm",
            gender: "male"
        },
        {
            name: "Woody",
            breed: "Golden Retriever",
            information: "The Golden Retriever is a large-sized breed of dog bred as gun dogs to retrieve shot waterfowl such as ducks and upland game birds during hunting and shooting parties,[3] and were named 'retriever' because of their ability to retrieve shot game undamaged.",
            age: "2 year",
            lifeSpan: "10-12 years",
            height: "59 cm",
            gender: "Female"
        },
        {
            name: "Sophia",
            breed: "Harrier",
            information: "The Harrier is similar to the English Foxhound, but smaller. Harriers stand between 21 and 24 inches at the shoulder, and adults weigh between 45 and 65 lbs. They do shed, have short hair and hanging ears, and come in a variety of color patterns.",
            age: "5 Months",
            lifeSpan: "12-15 year",
            height: "35 cm",
            gender: "Female"
        },
        {
            name: "Timmy",
            breed: "scotish fold",
            information: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce efficitur blandit condimentum. Proin accumsan lorem vel gra vida fringilla. Suspendisse potenti. Mauris ut pulvinar nunc. Donec consectetur, diam in porta tempus, urna ligula ves tibulum nibh",
            age: "5 months",
            lifeSpan: "13-15 years",
            height: "22cm",
            gender: "Male"
        },
        {
            name: "Charly",
            breed: "Beagle",
            information: "The beagle is a breed of small hound that is similar in appearance to the much larger foxhound. The beagle is a scent hound, developed primarily for hunting hare. With a great sense of smell and superior tracking instinct, the beagle is employed as detection dog for prohibited agricultural imports and foodstuffs in quarantine around the world.",
            age: "1 Year",
            lifeSpan: "12-15 years",
            height: "39 cm",
            gender: "Male"
        },
        {
            name: "Scarlett",
            breed: "lorem",
            information: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce efficitur blandit condimentum. Proin accumsan lorem vel gra vida fringilla. Suspendisse potenti. Mauris ut pulvinar nunc. Donec consectetur, diam in porta tempus, urna ligula ves tibulum nibh",
            age: "3 year",
            lifeSpan: "13 years",
            height: "55 cm",
            gender: "Female"
        },
        {
            name: "Freddie",
            breed: "Domestic Cat",
            information: "Cats are similar in anatomy to the other felids, with a strong flexible body, quick reflexes, sharp retractable claws, and teeth adapted to killing small prey. Cat senses fit a crepuscular and predatory ecological niche.",
            age: "8 months",
            lifeSpan: "11-12 years",
            height: "50 cm",
            gender: "Female"
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
                lifeSpan: backup[position].lifeSpan,
                height: backup[position].height,
                gender: backup[position].gender
            }
        }
    }

})();

var UIController = (function () {

    var DOMStrings = {
        ourPetContainer: ".our_pet_content_container",
        place: "#our_pet_content",
        crossButton: ".cross_button",
        body: "body",
        popup: "#popup",
        knowMoreButton: ".pets button",
        popupContainer: ".popup_container",
        showPopup : "show_popup",
        
        
        petImageClass: ".petimage img",
        petNameClass: ".pet_detail h4",
        petBreedClass: ".pet_detail h6",
        petinformationClass: ".pet_detail p",
        petULClass: ".pet_detail ul li span ~ span"
        
        
    };

    var updateUI = function (data) {

        document.querySelector(DOMStrings.petImageClass).src = data.image;
        document.querySelector(DOMStrings.petNameClass).textContent = data.name;
        document.querySelector(DOMStrings.petBreedClass).textContent = data.breed;
        document.querySelector(DOMStrings.petinformationClass).textContent = data.information;
        document.querySelectorAll(DOMStrings.petULClass)[0].textContent = data.age;
        document.querySelectorAll(DOMStrings.petULClass)[1].textContent = data.lifeSpan;
        document.querySelectorAll(DOMStrings.petULClass)[2].textContent = data.height;
        document.querySelectorAll(DOMStrings.petULClass)[3].textContent = data.gender;
        console.log("height", data.gender);
    }

    /*UIController Return*/

    return {
        getDomStr: function () {
            return {
                petContainer: DOMStrings.ourPetContainer,
                place: DOMStrings.place,
                crossButton: DOMStrings.crossButton,
                body: DOMStrings.body,
                popup: DOMStrings.popup,
                knowMoreBtn : DOMStrings.knowMoreButton,
                pupupContainer: DOMStrings.popupContainer,
                showPopup : DOMStrings.showPopup
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
    /*var petStoredData = dataCtrl.backupData();*/
    var mainData = {};
    var newMain = {};

    var boot = function () {
        document.querySelector(DOM.petContainer).addEventListener("click", getTargetData);

        document.querySelector(DOM.crossButton).addEventListener("click", removePopup);
        /*document.querySelector("#popup").addEventListener("click", removePopup);*/

        /* grey space click */
        window.addEventListener("click", greyAreaClick);
    }

    var getTargetData = function (event) {

        var existID = event.target.parentNode.id;

        if (existID !== DOM.place && event.srcElement.textContent === document.querySelector(DOM.knowMoreBtn).textContent) {
            var id = event.target.parentNode.id;
            var image = event.target.parentNode.childNodes[1].childNodes[1].src;

            mergeObject(id, image);

            document.querySelector(DOM.popup).style.visibility = "visible";
            document.querySelector(DOM.pupupContainer).classList.toggle(DOM.showPopup);

            // stop scroll
            stopScroll("enable");
        }
    }

    var removePopup = function (event) {

        document.querySelector(DOM.popup).style.visibility = "hidden";
        document.querySelector(DOM.pupupContainer).classList.toggle(DOM.showPopup);

        stopScroll("disable");
    }

    /* grey space click */

    var greyAreaClick = function (event) {
        if (event.target === document.querySelector(DOM.popup)) {
            removePopup();
        }
    }

    var mergeObject = function (petId, petImage) {
        mainData.id = petId;
        mainData.image = petImage;
        newMain = Object.assign(mainData, dataCtrl.petDetail(petId));

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
