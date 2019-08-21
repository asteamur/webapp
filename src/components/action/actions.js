//import dayjs from 'dayjs'

export default {
    'tea': [
        {
            title: 'Crear usuario',
            description: 'Puedes crear la ficha de asociado para el usuario.',
            action: {name: 'datasheet'},
            roles: ['admin', 'administrativo', 'coordinador:jefe'],
            params: false,
            dependsOnSelected: false
        },
        {
            title: 'Ver ficha de asociado',
            description: 'Puedes consultar y editar la ficha de asociado, viendo los datos de los padres.',
            action: {name: 'datasheet'},
            roles: ['admin', 'administrativo', 'coordinador:jefe'],
            dependsOnSelected: true
        },
        {
            title: 'Acceder a Memorandum',
            description: 'Puedes visualizar el Memorandum así como escribir en él.',
            action: {name: 'home'},
            roles: ['admin', 'terapeuta', 'coordinador:jefe'],
            query: () => {return {
                since: 7,
                //dateInit: dayjs().add(-7, 'day').format('YYYY-MM-DD'), 
                //dateEnd: dayjs().format('YYYY-MM-DD')
                }
            },
            dependsOnSelected: true
        }
    ]
}