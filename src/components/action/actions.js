module.exports = {
    'tea': [{
        title: 'Ver ficha de asociado',
        description: 'Puedes consultar la ficha de asociado, viendo los datos de los padres.',
        action: {name: 'datesheet'},
        roles: ['administrativo', 'coordinador:jefe']
    },
    {
        title: 'Editar ficha de asociado',
        description: 'Puedes modificar la ficha de asociado, incluido los datos de los padres.',
        action: {name: 'datesheet'},
        roles: ['administrativo', 'coordinador:jefe']
    },
    {
        title: 'Acceder a Memorandum',
        description: 'Puedes visualizar el Memorandum así como escribir en él.',
        action: {name: 'home'},
        roles: ['terapeuta', 'coordinador:jefe']
    }
    ]
}