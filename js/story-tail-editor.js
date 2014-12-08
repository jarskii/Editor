!function() {
    var StoryEditor = function() {
        this.controls = {};
        this.elements = {};
        this.events = {};

        this.initElements();
        this.initControlls();
        this.initControllsListener();

    };

    StoryEditor.prototype.initElements = function() {
        this.elements.slideList = document.getElementById('slideList');
    };

    StoryEditor.prototype.initControlls = function() {
        this.events.panel = {};
        this.controls.addSlide = document.getElementById('panelAddSlide');
        this.controls.textAlignCenter = document.getElementById('panelTextAlignCenter');
    };


    StoryEditor.prototype.initControllsListener = function() {

        this.events.panel = {
            addSlide: function(e) {

            },
            textAlignCenter: function(e) {

            }
        };

        for (nameButton in this.controls) {
            this.controls[nameButton].addEventListener('click', this.events.panel[nameButton]);
        }
    }



    new StoryEditor();
}(window)