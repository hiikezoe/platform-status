module.exports = function(grunt) {

  grunt.registerTask('convert_features_json', function() {
    var categories = grunt.file.readJSON('features.json');

    var valid_statuses = [
      'in progress',
      'favorable',
      'not favorable',
      'no opinion'
    ];

    var converted_features = [];
    var no_status = 0;
    for (var category_name in categories) {
      var features = categories[category_name];
      for(var i in features) {
        var feature = features[i];
        // Do some status validation
        if (valid_statuses.indexOf(feature.status) === -1) {
          if (valid_statuses.join('|') !== feature.status) {
            grunt.log.error(feature.name + ' does not have a valid status: "' + feature.status + '"');
            grunt.log.error('expected: ' + valid_statuses.join(', '))
            grunt.fail.warn('Choose amongst ' + valid_statuses.join(', '));
            continue;
          }

          no_status++;
          grunt.log.warn(feature.name + ' has no status');
        }

        feature.category = category_name;
        converted_features.push(feature);
      }
    }

    grunt.log.ok(no_status + ' features without statuses');
    grunt.log.ok(converted_features.length - no_status + ' features with status');
    grunt.file.write('modules/converted_features.json', JSON.stringify(converted_features));
  });
};
