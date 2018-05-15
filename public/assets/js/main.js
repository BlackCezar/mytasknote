let input = document.querySelectorAll('.input__text');

input.forEach(element => {
    element.onfocus = function() {
        let label = element.labels[0];
        label.className = "label label_down";
    }
    element.onblur = function() {
        if (element.value == "") {
            element.labels[0].className = "label";
        }
    }
});

