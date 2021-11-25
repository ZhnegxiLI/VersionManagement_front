import $ from "jquery";

const initializeSelect2 = function () {
    //Initialize Select2 Elements
    $(".select2").select2();

    //Initialize Select2 Elements
    $(".select2bs4").select2({
        theme: "bootstrap4",
    });
}

export { initializeSelect2 }