import $ from "jquery";

const showToast = function (params) {
    $(document).Toasts('create', params);
};

const showSuccessToast = function (title, body) {
    return showToast({
        title,
        body,
        class: 'bg-success',
        autohide: true,
        delay: 3000
    });
}


const showInfoToast = function (title, body) {
    return showToast({
        title,
        body,
        class: 'bg-info',
        autohide: true,
        delay: 3000
    });
}

const showErrorToast = function (title, body) {
    return showToast({
        title,
        body,
        class: 'bg-danger',
        autohide: true,
        delay: 8000
    });
}


export {  showSuccessToast, showInfoToast, showErrorToast, showToast }