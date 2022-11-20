// assets
import { IconDashboard, IconGift, IconChristmasTree } from '@tabler/icons';

// constant
const icons = { IconDashboard, IconGift, IconChristmasTree };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: 'SJ Reunion 2022',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Event Details',
            type: 'item',
            url: '/dashboard/default',
            icon: icons.IconChristmasTree,
            breadcrumbs: false
        },
        {
            id: 'sample-page',
            title: 'Kris Kringle',
            type: 'item',
            url: '/sample-page',
            icon: icons.IconGift,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
