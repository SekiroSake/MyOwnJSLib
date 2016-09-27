//wrap up the project to take only global and jquery object
;(function(global, $) {
    //init New Object inside Greetr call to save new function call everytime
    var Greetr = function(firstName, lastName, language) {
        return new Greetr.init(firstName, lastName, language);
    }

    var supportedLangs = ['en', 'es'];

    // This makes user unable to change the CONSTANTS by greetings.en = ...

    var greetings = {
        en: 'Hello',
        es: 'Hola'
    };

    var formalGreetings = {
        en: 'Greetings',
        es: 'Saludos'
    };

    //log message shows when contants been used
    var logMessages = {
        en: 'Logged in',
        es: 'Inicio Sesion'
    }

    //To make resueable functions and make this library looks beautiful
    Greetr.prototype = {
        fullName: function() {
            return this.firstName + ' ' + this.lastName;
        },

        validate: function() {
            if (supportedLangs.indexOf(this.language) === -1) {
                throw "Invalid Language";
            }
        },

        greeting: function() {
            return greetings[this.language] + ' ' + this.firstName + '!';
        },

        formalGreetings: function() {
            return formalGreetings[this.language] + ',' + this.fullName();
        },

        greet: function(formal) {
            var msg;
            if (formal) {
                msg = this.formalGreetings();
            } else {
                msg = this.greeting()
            }
            if (console) {
                console.log(msg);
            }

            //'this' makes it chainable
            return this;
        },
        log: function() {
            if (console) {
                console.log(logMessages[this.language] + ': ' + this.fullName());

            }
            //Makes it chainable
            return this;
        },

        setLang: function(lang) {
            this.language = lang;

            this.validate();

            return this;
        },

        HTMLGreeting: function(selector, formal) {
            if (!$) {
                throw 'jQuery not loaded';
            }
            if (!selector) {
                throw 'Missing jQuery selector';
            }

            var msg;
            if (formal) {
                msg.this.formalGreeting();
            } else {
                msg = this.greeting();
            }

            $(selector).html(msg);
            return this;
        }
    };

    Greetr.init = function(firstName, lastName, language) {

        var self = this;
        self.firstName = firstName || '';
        self.lastName = lastName || '';
        self.language = language || 'en';

        self.validate();
    }

    // All the objects been created goin to point here for its prototype
    Greetr.init.prototype = Greetr.prototype;

    //global is what has been passed into this function
    //Expose this library to outside world via G$
    global.Greetr = global.G$ = Greetr; // at firstline: var Greetr = function(firstName ...

}(window, jQuery));
