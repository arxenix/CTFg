var langMap = {
    "python/2": "text/x-python",
    "python/latest": "text/x-python",
    "java/latest": "text/x-java",
    "clang/latest": "text/x-c++src",
    "ruby/latest": "text/x-rsrc",
    "perl/latest": "text/x-perl",
    "javascript/latest": "text/javascript"
};

Template.programmingModule.helpers({
    hasSolved(probId) {
        var team = Teams.findOne({});
        if(team) {
            return team.hasSolved(probId);
        }
    },
    getLangName(lang) {
        return ProblemSchema.allowedLanguages.autoform.options[lang];
    }
});

Template.programmingModule.events({
    /* Handle programming language changes */
    "change .select-language": function(e) {
        var newValue = e.currentTarget.value;
        var editor = $('.CodeMirror')[0].CodeMirror;
        if(newValue in langMap) {
            editor.setOption("mode", langMap[newValue]);
        }
    }
});

Template.programmingModule.onRendered(function(){
    var id = this.data.id;
    var selectLang = $("#select-language-"+id);
    selectLang.selectpicker();
    console.log(selectLang.options[0]);
    CodeMirror.fromTextArea($("#programming-area-"+id).get(0), {
        lineNumbers: true,
        mode: "text/x-python"
    });
});
