module.exports = function(grunt) {

  grunt.registerTask('convert_features_json', function() {
    var categories = grunt.file.readJSON('features.json');

    var converted_features = [];
    for (var category_name in categories) {
      var features = categories[category_name];
      for(var i in features) {
        features[i].category = category_name;
        converted_features.push(features[i]);
      }
    }

    grunt.file.write('modules/converted_features.json', JSON.stringify(converted_features));
  });
};
