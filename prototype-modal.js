/**
 * Adds a modal to the page warning user that page is a prototype. Then sets a cookie so that it shouldn't be shown again for that domain and directory
 *
 * version: 1.1.0
 */

var prototypeModal = {
    init: function() {
        if (this.hasCookie()) {
            return;
        }
        this.injectModalCSS();
        this.showModal();
        this.bindModal();
    },
    path: function() {
        var path = location.pathname.split('/');
        path.pop();
        return path.join('/');
    },
    modalCSS:
        // To edit CSS beautify string below -> edit -> minify again.
        // Also, we can't write this CSS inline because that doesn't support media queries.
        '#modal,#modal:after{position:absolute;width:100%;height:100%}#modal{display:flex;align-items:center}#modal:after{content:"";background-color:#323232;opacity:.7}#modal__container{background-color:#fff;z-index:1;margin-right:auto;margin-left:auto;padding:16px;width:448px}@media only screen and (max-width:767px){#modal__container{width:100%;margin-right:24px;margin-left:24px}}',
    injectModalCSS: function() {
        document.head.innerHTML += '<style>' + this.modalCSS + '</style>'
    },
    showModal: function() {
        document.getElementsByTagName('body')[0].innerHTML += (
            '<div id="modal">' +
            '<div id="modal__container">' +
            '<h2 class="margin-top--1 margin-bottom">This is a prototype</h2>' +
            '<p class="flush">Warning, this is an experimental prototype used for research and testing.</p>' +
            '<p class="flush">The content may not be complete or accurate.</p>' +
            '<button id="modal__continue" class="btn btn--primary margin-top--2">I understand</button>' +
            '</div>' +
            '</div>'
        );
    },
    bindModal: function() {
        document.getElementById('modal__continue').addEventListener('click', function() {
            document.getElementById('modal').remove();
            prototypeModal.setCookie();
        });
    },
    setCookie: function() {
        document.cookie = 'ons-prototype-' + location.origin + this.path() + '= ; path=' + this.path();
    },
    hasCookie: function() {
        return document.cookie.indexOf('ons-prototype-' + location.origin + this.path()) >= 0;
    }
};

prototypeModal.init();