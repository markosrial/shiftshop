import {Category, Dashboard, Group, Receipt, ShoppingBasket} from '@material-ui/icons';
import {Role} from '../../users';

export default [
    {
        title: 'project.app.nav.app',
        items: [
            {
                title: 'project.app.route.dashboard',
                route: '/dashboard',
                icon: Dashboard
            }
        ],
        permissions: [Role.MANAGER, Role.ADMIN, Role.SALESMAN]
    },
    {
        title: 'project.app.nav.catalog',
        items: [
            {
                title: 'project.app.route.products',
                route: '/catalog/products',
                icon: ShoppingBasket
            },
            {
                title: 'project.app.route.categories',
                route: '/catalog/categories',
                icon: Category,
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
