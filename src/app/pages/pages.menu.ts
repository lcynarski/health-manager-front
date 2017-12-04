export const PAGES_MENU = [
    {
        path: 'pages',
        children: [
            {
                path: 'dashboard',
                data: {
                    menu: {
                        title: 'Dashboard',
                        icon: 'home',
                        selected: false,
                        expanded: false,
                        order: 0,
                        availableFor: ['ROLE_PATIENT', 'ROLE_DOCTOR', 'ROLE_ADMIN', 'ROLE_RECEPTIONIST']
                    }
                }
            },
            {
                path: 'patientsList',
                data: {
                    menu: {
                        title: 'PatientsList',
                        icon: 'view_list',
                        selected: false,
                        expanded: false,
                        order: 100,
                        availableFor: ['ROLE_DOCTOR', 'ROLE_ADMIN', 'ROLE_RECEPTIONIST']
                    }
                }
            },
            {
                path: 'doctorsList',
                data: {
                    menu: {
                        title: 'ListOfDoctors',
                        icon: 'view_list',
                        selected: false,
                        expanded: false,
                        order: 100,
                        availableFor: ['ROLE_PATIENT', 'ROLE_DOCTOR', 'ROLE_ADMIN', 'ROLE_RECEPTIONIST']
                    }
                }
            },
            {
                path: 'medcom',
                data: {
                    menu: {
                        title: 'Medcom',
                        icon: 'dvr',
                        selected: false,
                        expanded: false,
                        order: 100,
                        availableFor: ['ROLE_DOCTOR', 'ROLE_ADMIN']
                    }
                }
            }
        ]
    }
];
