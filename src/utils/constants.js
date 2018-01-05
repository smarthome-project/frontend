export default {
	LOCALSTORAGE_TOKEN: 'auth-token',

	STATE_ACTIVE: 'app-active',
	STATE_INACTIVE: 'app-inactive',

	CRON_DAYS_EVERY: 'cron-everyday',
	CRON_DAYS_ONE_IN_WEEK: 'cron-onceInWeek',
	CRON_DAYS_CHOOSED: 'cron-specificDays',

	CRON_TIME_SPECIFIC_ONE: 'cron-oneSpecificTime',
	CRON_TIME_EVERY_HH: 'cron-everyHours',
	CRON_TIME_EVERY_MM: 'cron-everyMins',
	CRON_TIME_SPECIFIC: 'cron-specificTimes',

	CRON_DICT_DAYS_SHORT: {
		1: 'Pn',
		2: 'Wt',
		3: 'Śr',
		4: 'Cz',
		5: 'Pt',
		6: 'Sb',
		0: 'Nd'
	},

	CRON_DICT_DAYS_FULL: {
		1: 'Poniedziałek',
		2: 'Wtorek',
		3: 'Środe',
		4: 'Czwartek',
		5: 'Piątek',
		6: 'Sobote',
		0: 'Niedziele'
	},

	//errForm -> errName -> errMsg
	ERRORS_DICT: {
		'postRoom': {
			'name': {
				'Validation len on name failed': {mainErr: 'Błąd dodania pomieszczenia', subErr: 'nieprawidłowa długość nazwy.'}
			},
			'image_path': {
				'Validation len on image_path failed': {mainErr: 'Błąd dodania pomieszczenia', subErr: 'wybierz zdjęcie.'}
			}
		}
	}

}