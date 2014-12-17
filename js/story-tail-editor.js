!function() {
    var StoryEditor = function() {
        this.controls = {};
        this.elements = {};
        this.events = {};
        this.state = {};

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
        this.controls.createBlockIntoSlide = document.getElementById('createBlockIntoSlide');
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

            },
            createBlockIntoSlide: function(e) {

                var contentSlide = self.state.currentSlide.childNodes;

                for (var i = 0, max = contentSlide.length; i < max; i++) {
                    console.log(contentSlide[i]);
                }

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
            initCurrentSlide: function() {
                storyEditor.state.currentSlide = self.el;

                var slideListItems = document.getElementById('slideList').children;

                for (var i= 0, max = slideListItems.length; i<max; i++ ) {
                    slideListItems[i].classList.remove('current');
                }

                self.el.classList.add('current');
            }
        }
    }

    Contructor.Slide.prototype.initEvents = function() {
        var events = this.Events();

        this.el.addEventListener('focusin', events.initCurrentSlide)
    };

    var ContructorFactory = function() {
            this.count = 1;
        };

    ContructorFactory.prototype = {
        constructor: ContructorFactory,
        Slide: function() {
            console.log(this);
            return new Contructor.Slide({
                name: "slide",
                id: this.count++
            });
        }
    }

    var storyEditor =  new StoryEditor();
}(window)