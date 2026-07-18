import {
    BiSolidDashboard,
    BiBuildings,
    BiShield,
} from "react-icons/bi";

import {
    FaUsers,
    FaUserShield,
    FaClipboardList,
} from "react-icons/fa";

import {
    MdBusiness,
    MdWorkspacePremium,
    MdSecurity,
} from "react-icons/md";


export const superAdminMenu = [
    {
        section: "Main",
        items: [
            {
                name: "Dashboard",
                link: "/dashboard",
                icon: <BiSolidDashboard />,
            },
        ],
    },
    {
        section: "Tenants Management",
        items: [
            {
                name: "Tenants",
                icon: <MdBusiness />,
                submenu: [
                    {
                        name: "Tenants",
                        link: "/dashboard/tenants",
                    },
                    {
                        name: "Create Tenant",
                        link: "/dashboard/tenant/create",
                    },
                    {
                        name: "Export Tenant Data",
                        link: "/dashboard/tenant/export",
                    },
                ],
            },
            {
                name: "Tenant Admin",
                icon: <FaUserShield />,
                submenu: [
                    {
                        name: "Tenant Admins",
                        link: "/dashboard/tenant-admins",
                    },
                    {
                        name: "Create Tenant Admin",
                        link: "/dashboard/tenant-admin/create",
                    },
                    {
                        name: "Export Tenant Admin Data",
                        link: "/dashboard/tenant-admin/export",
                    },
                ],
            },
        ],
    },
    {
        section: "Subscription",
        items: [
            {
                name: "Plan Management",
                icon: <MdWorkspacePremium />,
                submenu: [
                    {
                        name: "Plans",
                        link: "/dashboard/plans",
                    },
                    {
                        name: "Create New Plan",
                        link: "/dashboard/plan/create",
                    },
                ],
            },
        ],
    },
    {
        section: "System",
        items: [
            {
                name: "System Management",
                icon: <BiBuildings />,
                submenu: [
                    {
                        name: "Platform users",
                        link: "/dashboard/platfrom-users",
                    },
                    {
                        name: "Create Platform user",
                        link: "/dashboard/platfrom-user/create",
                    },
                ],
            },
        ],
    },
    {
        section: "Security",
        items: [
            {
                name: "Security Management",
                icon: <MdSecurity />,
                submenu: [
                    {
                        name: "Login history",
                        link: "/dashboard/security/login-history",
                    },
                    {
                        name: "Audit Logs",
                        link: "/dashboard/security/audit-logs",
                    },
                ],
            },
        ],
    },
];


export const systemAdminMenu = [
    {
        section: "Main",
        items: [
            {
                name: "Dashboard",
                link: "/dashboard",
                icon: <BiSolidDashboard />,
            },
        ],
    },
    {
        section: "Settings",
        items: [
            {
                name: "Settings",
                icon: <MdSecurity />,
                submenu: [
                    {
                        name: "Cost Unit Price",
                        link: "/dashboard/settings/unit-price",
                    },
                ],
            },
        ],
    },
];


export const userMenu = [
    {
        section: "Main",
        items: [
            {
                name: "Dashboard",
                link: "/dashboard",
                icon: <BiSolidDashboard />,
            },
        ],
    },
];


export const teacherMenu = [
    {
        section: "Main",
        items: [
            {
                name: "Dashboard",
                link: "/dashboard",
                icon: <BiSolidDashboard />,
            },
        ],
    },
];


export const studentMenu = [
    {
        section: "Main",
        items: [
            {
                name: "Dashboard",
                link: "/dashboard",
                icon: <BiSolidDashboard />,
            },
        ],
    },
];


export const menus = {
    super_admin: superAdminMenu,
    system_admin: systemAdminMenu,
    user: userMenu,
    teacher: teacherMenu,
    student: studentMenu,
};