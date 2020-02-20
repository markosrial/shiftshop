import {Category, Group, Receipt, Settings, ShoppingBasket} from '@material-ui/icons';
import {Role} from '../../users';

export default [
    {
        title: 'project.app.nav.catalog',
        items: [
            {
                title: 'project.app.route.products',
                route: '/catalog/products',
                icon: ShoppingBasket,
            },
            {
                title: 'project.app.route.categories',
                route: '/catalog/categories',
                icon: Category,
            },
            {
                title: 'project.app.route.options',
                route: '/catalog/options',
                icon: Settings,
                children: [
                    {
                        title: 'project.app.route.customers',
                        route: '/catalog/options/customers',
                        permissions: [Role.MANAGER, Role.ADMIN, Role.SALESMAN]
                    },
                    {
                        title: 'project.app.route.projects',
                        route: '/catalog/options/projects',
                        permissions: [Role.MANAGER, Role.ADMIN, Role.SALESMAN]
                    }
                ]
            }
        ],
        permissions: [Role.MANAGER, Role.ADMIN, Role.SALESMAN]
    },
    {
        title: 'project.app.nav.sales',
        items: [
            {
                title: 'project.app.route.records',
                route: '/sales/records',
                icon: Receipt,
            }
        ],
        permissions: [Role.MANAGER, Role.ADMIN]
    },
    {
        title: 'project.app.nav.staff',
        items: [
            {
                title: 'project.app.route.users',
                route: '/staff/users',
                icon: Group
            }
        ],
        permissions: [Role.MANAGER]
    },
];
