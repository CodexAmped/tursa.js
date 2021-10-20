;(function(w, d){
    var _viewElement = null,
        _defaultRoute = null,
        _rendered = false;

        var Tursa = function() {
            this._routeMap = {};
        }

        Tursa.prototype.AddRoute = function(controller, route, template) {
            this._routeMap[route] = new routeObj(controller, route, template);
        }

        Tursa.prototype.init = function() {
            // Create update view delegate
            var updateViewDelegate = updateView.bind(this);
            
            // Get the view element reference
            _viewElement = d.querySelector('[t-view]');
            if(!_viewElement) return;

            // Set default route 
            _defaultRoute = this._routeMap[Object.getOwnPropertyNames(this._routeMap)[0]];

            // Wire up the hash change event with the update view delegate
            w.onhashchange = updateViewDelegate;

            // Call the update view delegate
            updateViewDelegate();
        }
        
        function updateView() {
            // get the route name from the address bar hash
            var pageHash = w.location.hash.replace('#', '');
            routeName = null;
            routeObj = null;

            routeName = pageHash.replace('/', '');

            _rendered = false;

            // fetch the route object from the route name
            routeObj = this._routeMap[routeName];
            // route name not defined then use default route
            if(!routeObj)
            {
                routeObj = _defaultRoute;
            }

            // render the view html associated wuth the view route
            loadTemplates(routeObj, _viewElement);
        }   

        function loadTemplates(routeObj, _viewElement) {
            var xmlhttp;
            if(window.XMLHttpRequest)
            {
                // Code for IE7+, FireFox, Chrome, Safari, Opera
                xmlhttp = new XMLHttpRequest();
            }
            else
            {   
                // Code for IE6, IE5
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    // load viiew
                    loadView(routeObj, _viewElement, xmlhttp.responseText)
                }
            }
            xmlhttp.open("GET", routeObj.template, true);
            xmlhttp.send();
        }
        function loadView(routeObj, viewElement, viewHtml) {
            // Create the model object
            var model = {};

            // Call the controller function of the root
            routeObj.controller(model);

            // Replace the view html tokens with the model properties
            viewHtml = replaceTokens(viewHtml, model)
            // Render the view
            if(!_rendered)
            {
                viewElement.innerHTML = viewHtml;
                _rendered = true;
            }
        }
        function replaceTokens(viewHtml, model) {
            var modelProps = Object.getOwnPropertyNames(model);

            modelProps.forEach(function (element, index, array) {
                viewHtml = viewHtml.replace('{{' + element + '}}', model[element]);
            });
            return viewHtml;
        }
        var routeObj = function(c, r, t) {
            this.controller = c;
            this.route = r;
            this.template = t;
        }
        w['Tursa'] = new Tursa();
})(window, document);