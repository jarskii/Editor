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
        var self = this,
            contructor = new ContructorFactory();

        this.events.panel = {
            addSlide: function(e) {
                var slideList = self.elements.slideList;

                slideList.appendChild(contructor.Slide().el);
            },
            textAlignCenter: function(e) {

            }
        };

        for (nameButton in this.controls) {
            this.controls[nameButton].addEventListener('click', this.events.panel[nameButton]);
        }
    };

    var Contructor = {
        Slide: function(param) {

            var slide = document.createElement('div');

            slide.contentEditable = true;
            slide.className = "b-slide";
            slide.setAttribute('data-id', 'slide_' + param.id);

            this.name = param.name;
            this.el = slide;
            this.collection = [];
            this.id = param.id

            this.initEvents()

            return this;
        }
    };

    Contructor.Slide.prototype.Events = function(){
        var self = this;
        return {
            createTextWrap: function() {
                self.collection.push({
                    el: this.firstChild
                })
            }
        }
    }

    Contructor.Slide.prototype.initEvents = function() {
        var events = this.Events();

        this.el.addEventListener('focusout', events.createTextWrap)
    };

    var ContructorFactory = function() {
            this.count = 1;
        };

    ContructorFactory.prototype = {
        constructor: ContructorFactory,
        Slide: function() {
            return new Contructor.Slide({
                name: "slide",
                id: this.count++
            });
        }
    }





    new StoryEditor();
}(window)