var budgetController = (function () {

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    Expense.prototype.calcPercentage = function (totalInc) {
        if (totalInc > 0) {
            this.percentage = Math.round((this.value / totalInc) * 100);
        } else {
            this.percentage = -1;
        }
    };

    Expense.prototype.getPercentage = function () {
        return this.percentage;
    };

    var totalBudget = function (type) {
        var sum = 0;
        data.allItems[type].forEach(function (element) {
            sum = sum + element.value;
        })
        data.total[type] = sum;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        total: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };

    return {
        addItems: function (type, desc, val) {
            var newItem, ID;
            // Create a new id
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            // we create a new item inc or exp
            if (type === "exp") {
                newItem = new Expense(ID, desc, val);
            } else if (type === "inc") {
                newItem = new Income(ID, desc, val);
            };

            // push into our data structu            
            data.allItems[type].push(newItem);

            // return item
            return newItem;
        },

        deleteItem: function (type, id) {
            var arr, ind;

            //  data.allItems[type][index];

            var arr = data.allItems[type].map(function (element) {
                return element.id;
            });

            index = arr.indexOf(id);

            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }
        },

        calculateBuget: function () {
            // total only
            totalBudget("inc");
            totalBudget("exp");



            // total budget
            data.budget = data.total.inc - data.total.exp;

            // percentage
            if (data.total.inc > 0) {
                data.percentage = Math.round((data.total.exp / data.total.inc) * 100);
            } else {
                data.percentage = -1;
            }
        },

        calculatePercentage: function () {
            data.allItems.exp.forEach(function (element) {
                element.calcPercentage(data.total.inc);
            });
        },

        getBudget: function () {
            return {
                budget: data.budget,
                totalInc: data.total.inc,
                totalExp: data.total.exp,
                percentage: data.percentage
            };
        },

        getPercentage: function () {
            var allPercentage;
            allPercentage = data.allItems.exp.map(function (e) {
                return e.percentage;
            });
            return allPercentage;
        },

        testing: function () {
            console.log(data);
        }

    }

})();


var UIController = (function () {

    var DOMString = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        inputAddButton: ".add__btn",
        inputIncome: ".income__list",
        inputExpenses: ".expenses__list",
        budgetLabel: ".budget__value",
        incomeLabel: ".budget__income--value",
        expenseLabel: ".budget__expenses--value",
        percentageLabel: ".budget__expenses--percentage",
        container: ".container",
        expensePercentageLabel: ".item__percentage",
        month: ".budget__title--month"
    };

    var formatNumber = function (num, type) {
        var numSplit, int, dec;
        // sign
        // dec
        // thousands

        num = Math.abs(num);
        num = num.toFixed(2);
        // now we have string of fotmated decimal number ;

        numSplit = num.split(".");
        int = numSplit[0];
        dec = numSplit[1];

        if (int.length > 3 && int.length < 6) {
            // 12500
            int = int.substr(0, int.length - 3) + "," + int.substr(int.length - 3, 3);

        }
        // 12,345
        else if (int.length > 5) {
            // 12500
            int = int.substr(0, int.length - 5) + "," + int.substr(int.length - 5, 2) + "," + int.substr(int.length - 3, 3);
            // 2,50,000
        };

        return (type === "exp" ? "-" : "+") + " " + int + "." + dec;
    };

    var nodeListPercentages = function (lists, callback) {
        for (var i = 0; i < lists.length; i++) {
            callback(lists[i], i);
        }
    };

    return {

        getInput: function () {
            return {
                type: document.querySelector(DOMString.inputType).value,
                description: document.querySelector(DOMString.inputDescription).value,
                value: parseFloat(document.querySelector(DOMString.inputValue).value)
            }
        },

        addListItem: function (obj, type) {
            var html, newHtml, place;

            if (type === "inc") {
                place = DOMString.inputIncome;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

            } else if (type === "exp") {
                place = DOMString.inputExpenses;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                html = html.replace("%percentage%", obj.id);
            }

            newHtml = html.replace("%id%", obj.id);
            newHtml = newHtml.replace("%description%", obj.description);
            newHtml = newHtml.replace("%value%", formatNumber(obj.value, type));

            document.querySelector(place).insertAdjacentHTML("beforeend", newHtml);

        },

        deleteListItem: function (id) {
            var item = document.getElementById(id);

            item.parentNode.removeChild(item);
        },

        clearFields: function () {
            var field, newField;

            field = document.querySelectorAll(DOMString.inputDescription + "," + DOMString.inputValue);

            newField = Array.prototype.slice.call(field);

            newField.forEach(function (content) {
                content.value = "";
            });

            field[0].focus();
        },


        displayBudget: function (obj) {

            var type;
            obj.budget > 0 ? type = "inc" : type = "exp";


            document.querySelector(DOMString.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMString.incomeLabel).textContent = formatNumber(obj.totalInc, "inc");
            document.querySelector(DOMString.expenseLabel).textContent = formatNumber(obj.totalExp, "exp");

            if (obj.percentage > 0 && obj.totalExp < obj.totalInc) {
                document.querySelector(DOMString.percentageLabel).textContent = obj.percentage + "%";
            } else {
                document.querySelector(DOMString.percentageLabel).textContent = "---";
            }
            if (obj.totalExp > obj.totalInc) {
                document.querySelector(DOMString.percentageLabel).textContent = "***";
            }

        },

        displayPercentages: function (percentages) {
            // percentages is the array
            var fields = document.querySelectorAll(DOMString.expensePercentageLabel);

            // now the fiels is the node lists(not only list)  the list of elements called node list

            nodeListPercentages(fields, function (current, index) {
                // current will have value of array , index will have index of that perticular array item
                if (percentages[index] > 0 && percentages[index] < 100) {
                    current.textContent = percentages[index] + "%";
                } else {
                    current.textContent = "---";
                }
                if (percentages[index] > 100) {
                    current.textContent = "***";
                }

            });

        },

        displayDate: function () {
            var now, months, month, year;

            now = new Date();

            months = ["January", "february", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

            month = now.getMonth();
            year = now.getFullYear();
            document.querySelector(DOMString.month).textContent = months[month] + "-" + year;
        },

        changedType: function () {

            var fields = document.querySelectorAll(
                DOMString.inputType + "," + DOMString.inputDescription + "," + DOMString.inputValue
            );

            nodeListPercentages(fields, function (current) {
                current.classList.toggle("red-focus");
            });

            document.querySelector(DOMString.inputAddButton).classList.toggle("red");
        },

        getDOMStrings: function () {
            return DOMString;
        },
    }

})();


var controller = (function (budgetCtrl, UICtrl) {

    var setupEventListener = function () {
        var DOM = UICtrl.getDOMStrings();

        document.querySelector(DOM.inputAddButton).addEventListener("click", CtrlAddItems);

        document.addEventListener('keypress', function (e) {
            if (e.keyCode === 13) {
                CtrlAddItems();
            }
            //keypress
            //console.log(e.keyCode, e.shiftKey);
            else if (e.keyCode === 126) {
                if (document.querySelector(DOM.inputType).value === "inc") {
                    document.querySelector(DOM.inputType).value = "exp";
                } else if (document.querySelector(DOM.inputType).value === "exp") {
                    document.querySelector(DOM.inputType).value = "inc";
                }
                UICtrl.changedType();
            }
                        // Have to do more   like while inputing desc or value
        });

        document.querySelector(DOM.container).addEventListener("click", ctrlDelItem);

        document.querySelector(DOM.inputType).addEventListener("change", UICtrl.changedType);
    };

    var updateBudget = function () {
        // 1. Calculate the budget
        budgetCtrl.calculateBuget();
        // 2. Return the budget
        var budget = budgetCtrl.getBudget();
        // 3. Display the budget into the UI
        UICtrl.displayBudget(budget);
    };

    var CtrlAddItems = function () {

        var input, newItem;
        // 1. Get the field input data

        input = UICtrl.getInput();

        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            // 2. Add the item to the budget controller

            newItem = budgetCtrl.addItems(input.type, input.description, input.value);

            // 3. Add the item to the UI

            UICtrl.addListItem(newItem, input.type);

            // 4. Clear up the fields
            UICtrl.clearFields();

            // 4. Calculate the budget
            updateBudget();
            // 5. Display the budget to the UI

            updatePercentages();
        }
    };

    var updatePercentages = function () {
        // calculate percentage
        budgetCtrl.calculatePercentage();

        // read percentage from budget Controller
        var percentages = budgetCtrl.getPercentage();

        // make changes on the UI
        UICtrl.displayPercentages(percentages);
    };

    var ctrlDelItem = function (event) {
        var itemID, splitID, type, ID;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemID) {
            splitID = itemID.split("-");
            type = splitID[0];
            ID = parseInt(splitID[1]);

            // delete from data structure
            budgetCtrl.deleteItem(type, ID);
            // delete from UI
            UICtrl.deleteListItem(itemID);
            // Update budget from UI
            updateBudget();

            updatePercentages();
        }
    };

    return {
        init: function () {
            console.log("The Application has been started.");
            UICtrl.displayDate();
            setupEventListener();
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: 0
            });
        }
    }


})(budgetController, UIController);

controller.init();