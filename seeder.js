var seeder = require('mongoose-seed');
const config = require('./config/main')

seeder.connect(config.database, function() {
  seeder.loadModels([
    'models/group'
  ]);
  seeder.clearModels(['Group'], function() {
    seeder.populateModels(data, function() {
      seeder.disconnect();
    });
  });
});

var data = [
	{
		'model': 'Group',
		'documents': [
			{
				'name': 'Public',
				'status': 0
			},
			{
				'name': 'Geo',
				'status': 1
			}
		]
	}
];