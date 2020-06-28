import {Book, SdStorage, ShoppingBasket, PrintOutlined} from '@material-ui/icons';

export default [
    {
        title: 'project.app.nav.sale',
        items: [
            {
                title: 'project.app.route.cart',
                route: '/sale/cart',
                icon: ShoppingBasket
            },
        ]
    },
    {
        title: 'project.app.nav.records',
        items: [
            {
                title: 'project.app.route.sales',
                route: '/records/sales',
                icon: SdStorage
            },
            {
                title: 'project.app.route.preOrders',
                route: '/records/preOrders',
                icon: Book
            }
        ]
    },
    {
        title: 'project.app.nav.config',
        items: [
            {
                title: 'project.app.route.printerConfig',
                route: '/config/printer',
                icon: PrintOutlined
            }
        ]
    },
];
