!function() {
    var Editor = function() {
            this.text = null;
        },
        Contructor = {
            div: function() {
                var item = document.createElement('div');

                console.log();
                for(var i = 0; i < arguments.length; i++) {

                    console.log(i);
                    switch (i) {
                        case 0:
                            if (arguments[i]===null) break;

                            item.className = arguments[i];
                            break;
                        case 1:


                            if (arguments[i]===null) break;

                            var icon = document.createElement('i');

                            icon.className = arguments[i];
                            item.appendChild(icon);
                            break;
                        case 2:
                            if (arguments[i]===null) break;
                            console.log(arguments[3]);
                            item.addEventListener("click", arguments[i]);

                            break;
                        default:
                            break;
                    }
                };

                return item;
            }
        };

    Editor.prototype.Event =  {
        self: Editor,
        addImage: function() {
            console.log();
        }
    };

    Editor.prototype.createControls = function() {
        var wrapEl = document.createElement('div');

        wrapEl.className = 'b-editor';

        this.container.parentNode.appendChild(wrapEl);

        wrapEl.appendChild(this.container);

        var panel = Contructor.div('b-editor-panel');
        panel.appendChild(Contructor.div('b-editor-panel_add-image', 'icon-add-image', this.Event.addImage, this));

        wrapEl.insertBefore(panel, this.container);


    }



    Editor.prototype.init = function(textarea) {
        this.container = textarea;

        this.createControls();
    }

    window.FastEditor = new Editor();
}(window)