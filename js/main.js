var bookmarkName = document.getElementById("name");
var bookmarkUrl = document.getElementById("url");
var modal = document.getElementById("modal");

var nameErrMsg = document.getElementById('name-err-msg');
var urlErrMsg = document.getElementById('url-err-msg');

var bookmarks = [];
var errors = [{
    name: {
        error: "",
        msg: "",
    }
}, {
    url: {
        error: "",
        msg: "",
    }
}];
var msgs = [];
var msg;

if (localStorage.getItem("bookmarks") == null) {
    bookmarks = [];
} else {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    displayBookmarks(bookmarks);
};

function addBookmark() {
    var bookmark = {
        name: bookmarkName.value.toLowerCase(),
        url: bookmarkUrl.value,
    };
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    displayBookmarks(bookmarks);
    console.log(bookmarks);
    clear();
};

function displayBookmarks(list) {
    var tBody = document.getElementById("bodyData");
    var cartona = "";
    for (let i = 0; i < list.length; i++) {
        cartona += `
         <tr>
            <td>${i + 1}</td>
            <td class="text-capitalize">${list[i].name}</td>
            <td><a class="btn btn-visit" href="${list[i].url}" target="_blank"><i class="fa-solid fa-eye pe-2" aria-hidden="true"></i>Visit</a></td>
            <td><button class="btn btn-delete" onclick="deleteBookmark(${i})"><i class="fa-solid fa-trash pe-2" aria-hidden="true"></i>Delete</button></td>
          </tr>`;
    };
    tBody.innerHTML = cartona;
};

function clear() {
    bookmarkName.value = "";
    bookmarkUrl.value = "";
    bookmarkName.classList.remove("is-valid");
    bookmarkUrl.classList.remove("is-valid");
};

function deleteBookmark(index) {
    bookmarks.splice(index, 1);
    displayBookmarks(bookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    console.log(bookmarks);
};

function validateName(input) {
    nameErrMsg.classList.add('d-none');
    var regex = /^([A-Za-z]{3,})$/;

    if (regex.test(input.value)) {
        if (bookmarks.length != 0) {
            for (let i = 0; i < bookmarks.length; i++) {
                if (input.value == bookmarks[i].name) {
                    bookmarkName.classList.add("is-invalid");
                    bookmarkName.classList.remove("is-valid");
                    msg = "name is already registered";
                    if (!msgs.includes(msg)) {
                        if (msgs.includes("name is invalid")) {
                            msgs.splice(msgs.indexOf("name is invalid"), 1);
                        };
                        msgs.push(msg);
                        break;
                    };
                };
                bookmarkName.classList.add("is-valid");
                bookmarkName.classList.remove("is-invalid");
                if (msgs.includes("name is invalid")) {
                    msgs.splice(msgs.indexOf("name is invalid"), 1);
                };
                if (msgs.includes("name is already registered")) {
                    msgs.splice(msgs.indexOf("name is already registered"), 1);
                };
            };
        } else {
            bookmarkName.classList.add("is-valid");
            bookmarkName.classList.remove("is-invalid");
            if (msgs.includes("name is already registered")) {
                msgs.splice(msgs.indexOf("name is already registered"), 1);
            };
            if (msgs.includes("name is invalid")) {
                msgs.splice(msgs.indexOf("name is invalid"), 1);
            };
        };
    } else {
        bookmarkName.classList.add("is-invalid");
        bookmarkName.classList.remove("is-valid");
        msg = "name is invalid";
        if (!msgs.includes(msg)) {
            if (msgs.includes("name is already registered")) {
                msgs.splice(msgs.indexOf("name is already registered"), 1);
            };
            msgs.push(msg);
        };
    };
};

function validateURL(input) {
    urlErrMsg.classList.add('d-none');
    var regex = /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/;

    if (regex.test(input.value)) {
        if (bookmarks.length != 0) {
            for (let i = 0; i < bookmarks.length; i++) {
                if (input.value == bookmarks[i].url) {
                    bookmarkUrl.classList.add("is-invalid");
                    bookmarkUrl.classList.remove("is-valid");
                    msg = "url is already registered";
                    if (!msgs.includes(msg)) {
                        if (msgs.includes("url is invalid")) {
                            msgs.splice(msgs.indexOf("url is invalid"), 1);
                        };
                        msgs.push(msg);
                        break;
                    };
                } else {
                    bookmarkUrl.classList.add("is-valid");
                    bookmarkUrl.classList.remove("is-invalid");
                    if (msgs.includes("url is invalid")) {
                        msgs.splice(msgs.indexOf("url is invalid"), 1);
                    };
                    if (msgs.includes("url is already registered")) {
                        msgs.splice(msgs.indexOf("url is already registered"), 1);
                    };
                };
            };
        } else {
            bookmarkUrl.classList.add("is-valid");
            bookmarkUrl.classList.remove("is-invalid");
            if (msgs.includes("url is already registered")) {
                msgs.splice(msgs.indexOf("url is already registered"), 1);
            };
            if (msgs.includes("url is invalid")) {
                msgs.splice(msgs.indexOf("url is invalid"), 1);
            };
        };
    } else {
        bookmarkUrl.classList.add("is-invalid");
        bookmarkUrl.classList.remove("is-valid");
        msg = "url is invalid";
        if (!msgs.includes(msg)) {
            if (msgs.includes("url is already registered")) {
                msgs.splice(msgs.indexOf("url is already registered"), 1);
            };
            msgs.push(msg);
        };
    };
};

function validate() {
    if (msgs.length != 0) {
        for (let i = 0; i < msgs.length; i++) {
            switch (msgs[i]) {
                case "name is invalid":
                    errors[0].name.error = msgs[i];
                    errors[0].name.msg = "Site name must contain at least 3 characters";
                    break;
                case "name is already registered":
                    errors[0].name.error = msgs[i];
                    errors[0].name.msg = "Site name can't be repeated";
                    break;
                case "url is invalid":
                    errors[1].url.error = msgs[i];
                    errors[1].url.msg = "Site url must be a valid one";
                    break;
                case "url is already registered":
                    errors[1].url.error = msgs[i];
                    errors[1].url.msg = "Site url can't be repeated";
                    break;
            };
        };
        console.log("errors", errors);
        openModal();
    } else {
        if (bookmarkName.value == "" && bookmarkUrl.value == "") {
            urlErrMsg.classList.remove('d-none');
            nameErrMsg.classList.remove('d-none');
            bookmarkName.classList.add("is-invalid");
            bookmarkUrl.classList.add("is-invalid");
        } else if (bookmarkName.value == "") {
            nameErrMsg.classList.remove('d-none');
            bookmarkName.classList.add("is-invalid");
        } else if (bookmarkUrl.value == "") {
            urlErrMsg.classList.remove('d-none');
            bookmarkUrl.classList.add("is-invalid");
        } else {
            addBookmark();
        };
    };
};


function openModal() {
    modal.classList.remove('d-none');
    var errorTitle = document.getElementById('error-title');
    var errorMsgs = document.getElementById('error-msgs');

    for (let i = 0; i < errors.length; i++) {
        if (errors[0].name.error != "" && errors[1].url.error != "") {
            errorTitle.innerHTML = "Site Name or Url is not valid, Please follow the rules below:";
            errorMsgs.innerHTML = `<li><i class="fa-regular fa-circle-right p-2"></i>${errors[0].name.msg}</li>
            <li><i class="fa-regular fa-circle-right p-2"></i>${errors[1].url.msg}</li>`;
        } else if (errors[0].name.error != "") {
            errorTitle.innerHTML = errors[0].name.error;
            errorMsgs.innerHTML = `<li><i class="fa-regular fa-circle-right p-2"></i>${errors[0].name.msg}</li>`;
        } else if (errors[1].url.error != "") {
            errorTitle.innerHTML = errors[1].url.error;
            errorMsgs.innerHTML = `<li><i class="fa-regular fa-circle-right p-2"></i>${errors[1].url.msg}</li>`;
        };
    };
};

function closeModal() {
    modal.classList.add('d-none');
    errors = [{
        name: {
            error: "",
            msg: "",
        }
    }, {
        url: {
            error: "",
            msg: "",
        }
    }];
};
