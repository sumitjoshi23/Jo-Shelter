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
            breed: "golden retriever pup",
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
                height: backup[position].disease,
                gender: backup[position].gender
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

    var updateUI = function (data) {
        
        document.querySelector(".petimage img").src = data.image;
        document.querySelector(".pet_detail h4").textContent = data.name;
        document.querySelector(".pet_detail h6").textContent = data.breed;
        document.querySelector(".pet_detail p").textContent = data.information;
        document.querySelectorAll(".pet_detail ul li span ~ span")[0].textContent = data.age;
        document.querySelectorAll(".pet_detail ul li span ~ span")[1].textContent = data.lifeSpan;
        document.querySelectorAll(".pet_detail ul li span ~ span")[2].textContent = data.height;
        document.querySelectorAll(".pet_detail ul li span ~ span")[3].textContent = data.gender;
        
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

        if (existID !== "our_pet_content" && event.srcElement.textContent === document.querySelector(".pets button").textContent) {
            var id = event.target.parentNode.id;
            var image = event.target.parentNode.childNodes[1].childNodes[1].src;

            mergeObject(id, image);
            
            document.querySelector("#popup").style.visibility = "visible";
            document.querySelector(".popup_container").classList.toggle("show_popup");
            
            // stop scroll
            stopScroll("enable");
        }
    }

    var removePopup = function (event) {
        
        document.querySelector("#popup").style.visibility = "hidden";
        document.querySelector(".popup_container").classList.toggle("show_popup");

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
