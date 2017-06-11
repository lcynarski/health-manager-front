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
                        order: 0
                    }
                }
            },
            {
                path: 'patientsList',
                data: {
                    menu: {
                        title: 'Patients List',
                        icon: 'view_list',
                        selected: false,
                        expanded: false,
                        order: 100,
                    }
                }
            },
            {
                path: '',
                data: {
                    menu: {
                        title: 'Authentication',
                        icon: 'security',
                        selected: false,
                        expanded: false,
                        order: 650,
                    }
                },
                children: [
                    {
                        path: ['/login'],
                        data: {
                            menu: {
                                title: 'general.menu.login'
                            }
                        }
                    },
                    {
                        path: ['/register'],
                        data: {
                            menu: {
                                title: 'general.menu.register'
                            }
                        }
                    }
                ]
            }
        ]
    }
];
