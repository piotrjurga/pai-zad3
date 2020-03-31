function isNotWhiteSpaceOrEmpty(str) {
    return !/^[\s\t\r\n]*$/.test(str);
}

function isValidEmail(str) {
    let email = /^[a-zA-Z_0-9\.]+@[a-zA-Z_0-9\.]+\.[a-zA-Z][a-zA-Z]+$/;
    return email.test(str);
}

function checkAndFocus(obj, field) {
    let str = obj.value;
    let errorFieldName = "e_" + field.name.substr(2, field.name.length);
    let errorField = document.getElementById(errorFieldName);
    if (!field.validate(str)) {
        obj.focus();
        errorField.innerHTML = field.msg;
        return false;
    }
    else {
        errorField.innerHTML = "";
        return true;
    }
}

function showElement(e) {
    document.getElementById(e).style.visibility = 'visible';
}
function hideElement(e) {
    document.getElementById(e).style.visibility = 'hidden';
}

function validate(form) {
    fields = [
        {
            name: "f_imie", 
            msg: "Podaj imię!",
            validate: isNotWhiteSpaceOrEmpty
        },
        {
            name: "f_nazwisko", 
            msg: "Podaj nazwisko!",
            validate: isNotWhiteSpaceOrEmpty
        },
        {
            name: "f_email", 
            msg: "Podaj poprawny email!",
            validate: isValidEmail
        },
        {
            name: "f_kod", 
            msg: "Podaj kod pocztowy!",
            validate: isNotWhiteSpaceOrEmpty
        },
        {
            name: "f_ulica", 
            msg: "Podaj ulicę!",
            validate: isNotWhiteSpaceOrEmpty
        },
        {
            name: "f_miasto",
            msg: "Podaj miasto!",
            validate: isNotWhiteSpaceOrEmpty
        }
    ];
    
    for (var i in fields) {
        obj = form.elements[fields[i].name];
        if (!checkAndFocus(obj, fields[i]))
            return false;
    }

    return true;
}

function alterRows(i, e) {
    if (e) {
        if (i % 2 == 1) {
            e.setAttribute("style", "background-color: Aqua;");
        }
        e = e.nextSibling;
        while (e && e.nodeType != 1) {
            e = e.nextSibling;
        }
        alterRows(++i, e);
    }
}

function nextNode(e) {
    while (e && e.nodeType != 1) {
        e = e.nextSibling;
    }
    return e;
}
function prevNode(e) {
    while (e && e.nodeType != 1) {
        e = e.previousSibling;
    }
    return e;
}
function swapRows(b) {
    let tab = prevNode(b.previousSibling);
    let tBody = nextNode(tab.firstChild);
    let lastNode = prevNode(tBody.lastChild);
    tBody.removeChild(lastNode);
    let firstNode = nextNode(tBody.firstChild);
    tBody.insertBefore(lastNode, firstNode);
}

function cnt(form, msg, maxSize) {
    if (form.value.length > maxSize)
        form.value = form.value.substring(0, maxSize);
    else
        msg.innerHTML = maxSize - form.value.length;
}
