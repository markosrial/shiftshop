import {Book, CloudUpload, SdStorage, ShoppingBasket} from '@material-ui/icons';

export default [
    {
        title: 'project.app.nav.sales',
        items: [
            {
                title: 'project.app.route.shopping',
                route: '/sales/shopping',
                icon: ShoppingBasket
            },
            /*{
                title: 'project.app.route.preOrders',
                route: '/sales/preOrders',
                icon: Book
            }*/
        ]
    },
    {
        title: 'project.app.nav.records',
        items: [
            {
                title: 'project.app.route.localRecords',
                route: '/records/local',
                icon: SdStorage
            },
            {
                title: 'project.app.route.uploadedRecords',
                route: '/records/uploaded',
                icon: CloudUpload,
            }
        ]
    },
];
