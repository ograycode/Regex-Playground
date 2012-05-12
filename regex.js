$(document).ready(function() {

    var textToParse = $("#textarea");
    var regexBox = $("#textbox");
    var outBox = $("#output");
    var checkboxGlobal = $("#checkbox-global");
    var checkboxInsensitive = $("#checkbox-insensitive");
    var checkboxMultiline = $("#checkbox-multiline");

    regexBox.keyup(function() {
        myParser();
    });

    textToParse.keyup(function() {
        myParser();
    });

    $(".ui-checkbox").change(function() {
        myParser();
    });


    function myParser() {
        if (regexBox.val() == "") {
            outBox.text("");
        }
        else {
            try {
                var matches;
                var reg = modifiersCheck();
                if (reg == "") {
                    matches = textToParse.val().match(regularRegex(regexBox.val()));
                }
                else {
                    matches = textToParse.val().match(modifiedRegex(regexBox.val(), reg));
                }
                outBox.text(matches.toString());
            }
            catch (err) {
                outBox.text("Not yet valid regex");
            }
        }
    }

    function regularRegex(v) {
        return new RegExp(v);
    }

    function modifiedRegex(v, m) {
        return new RegExp(v, m);
    }

    function modifiersCheck() {
        var modifiers = "";
        if (checkboxGlobal.is(':checked')) {
            modifiers += "g";
        }
        if (checkboxInsensitive.is(':checked')) {
            modifiers += "i";
        }
        if (checkboxMultiline.is(':checked')) {
            modifiers += "m";
        }
        return modifiers;
    }

});