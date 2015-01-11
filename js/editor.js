!function() {

    var Config = {
        url: 'http://localhost:7777/'
    };

    var Editor = function() {
            this.text = null;
        },
//        Создает элементы - навешивает обработчики
        Contructor = {
            div: function() {
                var item = document.createElement('div');

                for(var i = 0; i < arguments.length; i++) {
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
                            item.addEventListener("click", arguments[i]);
                            break;
                        default:
                            break;
                    }
                };

                return item;
            },
            inputFile: function() {
                var item = document.createElement('input');

                for(var i = 0; i < arguments.length; i++) {
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
                                item.type = arguments[i];
                            break;
                        case 3:
                            if (arguments[i]===null) break;
                            item.name = arguments[i];
                            break;
                        case 4:
                            if (arguments[i]===null) break;
                            item.addEventListener("change", arguments[i]);
                            break;
                        default:
                            break;
                    }
                };

                return item;
            },
            ajax: function(params) {
                var xhr = new XMLHttpRequest();

                xhr.open(params.type, params.url, true);

                xhr.onload = function () {
                    if (xhr.status === 200) {
                        console.log('ready!');
                    } else {
                        console.log('An error occurred!');
                    }
                };

                xhr.send(params.data);
                console.log(xhr);
            }
        };
//  Генератор событий
    Editor.prototype.Event =  {
        addImage: function(e) {
            console.log(this.files, window.FastEditor);

            var file = this.files[0],
                formData = new FormData();

            formData.append('image', file, file.name);

            Contructor.ajax({
                type: 'POST',
                url: Config.url + 'uploadAllImage',
                data: formData
            })

        },
        addLink: function() {
            var markedText = window.getSelection().getRangeAt(0).cloneContents();

            console.log(window.getSelection())
            console.log(window.getSelection().getRangeAt(0) )

        }

    };

    Editor.prototype.createControls = function() {
        var wrapEl = document.createElement('div');

        wrapEl.className = 'b-editor';

        this.container.parentNode.appendChild(wrapEl);

        wrapEl.appendChild(this.container);

        var panel = Contructor.div('b-editor-panel');

        panel.appendChild(Contructor.inputFile('b-editor-panel_add-image icon icon-image', null, 'file','image[]', this.Event.addImage));
        panel.appendChild(Contructor.div('b-editor-panel_add-link', 'icon icon-link', this.Event.addLink, this));

        wrapEl.insertBefore(panel, this.container);
    };



    Editor.prototype.init = function(textarea) {
        this.container = textarea;

        this.createControls();
    };

    window.FastEditor = new Editor();
}(window)