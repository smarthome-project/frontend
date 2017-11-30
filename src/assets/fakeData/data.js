export const roomsFakeData = [
	{
		id: 1,
		name: 'Salon',
		img: 'http://www.ekspertbudowlany.pl/images/photos/24/3056/__b_oswietplenie-1.jpg'
	},
	{
		id: 2,
		name: 'Kuchania',
		img: 'https://img.shmbk.pl/rimgsph/742948_e396c2c9-8244-4c6f-9838-1741a3dba52c_max_900_1200_kuchnia-kuchnia-styl-nowoczesny.jpg'
	}
] 

export const devicesFakeData = [
	{
		id: 1,
		roomId: 1,
		name: 'Lampa',
		type: 'power'
	},
	{
		id: 2,
		roomId: 1,
		name: 'Ledy',
		type: 'led'
	},
	{
		id: 3,
		roomId: 1,
		name: 'Rolety',
		type: 'toggler'
	},
	{
		id: 4,
		roomId: 2,
		name: 'Express do kawy',
		type: 'power'
	}
] 

export const deviceTypesFakeData = [
	{
		id: 1,
		name: 'POWER',
		defaultState: {
			'active': false
		}
	},
	{
		id: 2,
		name: 'LED',
		defaultState: {
			'color': '#FFFFFF',
			'active': false
		}
	},
	{
		id: 3,
		name: 'MOTOR',
		defaultState: {
			'position': 0.0
		}
	}
]