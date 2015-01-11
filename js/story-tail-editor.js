!function() {
    var StoryEditor = function() {
        this.controls = {};
        this.elements = {};
        this.events = {};
        this.state = {};

        this.initElements();
        this.initControlls();
        this.initMethods();
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
        this.controls.getHTML = document.getElementById('panelCreateHTML');
        this.controls.livePreview = document.getElementById('livePreview');
    };

    StoryEditor.prototype.initMethods = function() {
        this.methods = {
            createHTML: function() {
                var blocks = this.elements.slideList.querySelectorAll('.b-slide-helper'),
                    blocksLength = blocks.length,
                    result = '';

                for (var i=0; i<blocksLength; i++) {
                    var block = '<div class="b-slide">'+blocks[i].innerHTML+'</div>'
                    result += block;
                }

                return result;
            }
        }
    };

    StoryEditor.prototype.initControllsListener = function() {
        var self = this,
            contructor = new ContructorFactory();


        this.events.panel = {
            addSlide: function(e) {
                var slideList = self.elements.slideList;

                slideList.appendChild(contructor.Slide().el);
                slideList.appendChild(contructor.Slide().helper);
            },

            livePreview: function() {
                var html = self.methods.createHTML();

                document.addEventListener()

            },
            getHTML: function() {
                var html = self.methods.createHTML();

            },
            textAlignCenter: function(e) {

            },
            createBlockIntoSlide: function(e) {

                var contentSlide = Array.prototype.slice.apply(self.state.currentSlide.childNodes),
                    newBlock = document.createElement('div');

                newBlock.className = "inner-block";
                newBlock.contentEditable = true;

                for (var i = 0, max = contentSlide.length; i<max; i++) {
                    var elem = contentSlide[i];
                    if (elem.nodeType == 3) {
                        var wrapper = document.createElement('div');

                        wrapper.innerHTML = elem.textContent;

                        elem.remove();

                        elem = wrapper;
                    };

                    newBlock.appendChild(elem);
                };

                self.state.currentHelper.appendChild(newBlock)

                newBlock.onmousedown = function(e) { // отследить нажатие
                    var self = this;

                    moveAt(e);

                    function moveAt(e) {
                        self.style.left = e.pageX-300+'px';
                        self.style.top = e.pageY-150+'px';
                    }

                    document.onmousemove = function(e) {
                        moveAt(e);
                    }

                    document.onmouseup = function() {
                        document.onmousemove = self.onmouseup = null;
                    }
                }


            }
        };

        for (nameButton in this.controls) {
            this.controls[nameButton].addEventListener('click', this.events.panel[nameButton]);
        }
    };

    var Contructor = {
        Slide: function(param) {

            var slide = document.createElement('div'),
                slideHelper = document.createElement('div');

            slide.contentEditable = true;
            slide.className = "b-slide";
            slideHelper.className = "b-slide-helper";
            slide.setAttribute('data-id', 'slide_' + param.id);

            this.name = param.name;
            this.el = slide;
            this.helper = slideHelper;
            this.collection = [];
            this.id = param.id

            this.initEvents()

            return this;
        }
    };

    Contructor.Slide.prototype.Events = function(){
        var self = this;
        return {
            initCurrentSlide: function(e) {
                storyEditor.state.currentSlide = e.target;
                storyEditor.state.currentHelper = e.target.nextSibling;


                var slideListItems = document.getElementById('slideList').children;



                for (var i= 0, max = slideListItems.length; i<max; i++ ) {
                    slideListItems[i].classList.remove('current');
                }

                self.el.classList.add('current');
            },
            addPositionСarriage: function(e) {

                if (e.target.classList.contains('b-slide')) {
                    var lastItem = Array.prototype.pop.apply(e.target.childNodes),
                        range = document.createRange();

                    range.setStartAfter(lastItem);
                    range.collapse(true);

                    var selection = window.getSelection();

                    selection.removeAllRanges();
                    selection.addRange(range);
                }



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

            return new Contructor.Slide({
                name: "slide",
                id: this.count++
            });
        }
    }

    var storyEditor =  new StoryEditor();
}(window)