import {
    BiSolidDashboard,
    BiBuildings,
    BiShield,
} from "react-icons/bi";

import {
    FaUsers,
    FaUserShield,
    FaClipboardList,
    FaUserGraduate,
    FaSchool,
    FaBook,
    FaCalendarAlt,
    FaUserCheck,
    FaTasks,
    FaClipboardCheck,
    FaChartLine,
    FaChartBar,
    FaFileAlt,
    FaBullhorn,
    FaEnvelope,
    FaBell,
    FaBuilding,
    FaGraduationCap,
    FaCreditCard,
} from "react-icons/fa";

import {
    MdBusiness,
    MdWorkspacePremium,
    MdSecurity,
    MdSettings,
    MdHistory,
    MdAssessment,
    MdPeople,
    MdAdminPanelSettings,
    MdFolder,
} from "react-icons/md";
import { BsCashCoin } from "react-icons/bs";

import { FaChalkboardUser } from "react-icons/fa6";


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
                        link: "/dashboard/user/create",
                    },
                ],
            },
        ],
    },
    {
        section: "Payments",
        items: [
            {
                name: "Payment Management",
                icon: <BsCashCoin />,
                submenu: [
                    {
                        name: "Payments",
                        link: "/dashboard/payments",
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





export const instituteAdmin = [
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
        section: "People Management",
        items: [
            {
                name: "Students",
                icon: <FaUserGraduate />,
                submenu: [
                    {
                        name: "All Students",
                        link: "/dashboard/students",
                    },
                    {
                        name: "Add Student",
                        link: "/dashboard/student/create",
                    },
                ],
            },
            {
                name: "Teachers",
                icon: <FaChalkboardUser />,
                submenu: [
                    {
                        name: "All Teachers",
                        link: "/dashboard/teachers",
                    },
                    {
                        name: "Add Teachers",
                        link: "/dashboard/teacher/create",
                    },
                ],
            },
        ],
    },
    {
        section: "Academic Management",
        items: [
            {
                name: "Classes",
                icon: <FaSchool />,
                submenu: [
                    {
                        name: "All Classes",
                        link: "/dashboard/classes",
                    },
                    {
                        name: "Create Class",
                        link: "/dashboard/class/create",
                    },
                ],
            },
            {
                name: "Timetable",
                icon: <FaCalendarAlt />,
                link: "/dashboard/timetable",
            },
        ],
    },
    {
        section: "Learning",
        items: [
            {
                name: "Assignments",
                icon: <FaClipboardCheck />,
                submenu: [
                    {
                        name: "Assignments",
                        link: "/dashboard/assignments",
                    },
                    {
                        name: "Create Assignment",
                        link: "/dashboard/assignment/create",
                    },
                    {
                        name: "Results",
                        link: "/dashboard/assignment/results",
                    },
                ],
            },
        ],
    },
    {
        section: "Reports",
        items: [
            {
                name: "Attendance Reports",
                icon: <FaChartBar />,
                link: "/dashboard/report/attendance",
            },
            {
                name: "Teacher Reports",
                icon: <FaFileAlt />,
                link: "/dashboard/report/teachers",
            },
        ],
    },
    {
        section: "Communication",
        items: [
            {
                name: "Announcements",
                icon: <FaBullhorn />,
                link: "/dashboard/announcements",
            },
            {
                name: "Messages",
                icon: <FaEnvelope />,
                link: "/dashboard/messages",
            },
        ],
    },
    {
        section: "Institute Settings",
        items: [
            {
                name: "Settings",
                icon: <MdSecurity />,
                submenu: [
                    {
                        name: "Institute Profile",
                        link: "/dashboard/settings/profile",
                    },
                    {
                        name: "Grading System",
                        link: "/dashboard/settings/grading",
                    },
                    {
                        name: "Subscription",
                        link: "/dashboard/settings/subscription",
                    },
                ],
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
    {
        section: "Classes & TimeTable",
        items: [
            {
                name: "Classes",
                icon: <FaSchool />,
                submenu: [
                    {
                        name: "My Classes",
                        link: "/dashboard/classes/my-classes",
                    },
                ],
            },
            {
                name: "Time Table",
                icon: <FaSchool />,
                submenu: [
                    {
                        name: "My Time Table",
                        link: "/dashboard/timetable",
                    },
                ],
            },
        ],
    },

    {
        section: "Learning",
        items: [
            {
                name: "Assignments",
                icon: <FaClipboardCheck />,
                submenu: [
                    {
                        name: "Assignments",
                        link: "/dashboard/assignments",
                    },
                    {
                        name: "Create Assignment",
                        link: "/dashboard/assignment/create",
                    },
                    {
                        name: "Results",
                        link: "/dashboard/results",
                    },
                ],
            },
        ],
    },
    {
        section: "Payments",
        items: [
            {
                name: "Payments",
                icon: <BsCashCoin />,
                submenu: [
                    {
                        name: "Create Payment",
                        link: "/dashboard/payments/create-payment",
                    },
                    {
                        name: "View Transactions",
                        link: "/dashboard/payments/view-my-payments",
                    },
                ],
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
    {
        section: "Classes & TimeTable",
        items: [
            {
                name: "Classes",
                icon: <FaSchool />,
                submenu: [
                    {
                        name: "My Classes",
                        link: "/dashboard/student/my-classes",
                    },
                ],
            },
            {
                name: "Time Table",
                icon: <FaSchool />,
                submenu: [
                    {
                        name: "My Time Table",
                        link: "/dashboard/timetable",
                    },
                ],
            },
        ],
    },
    {
        section: "Learning",
        items: [
            {
                name: "My Assignments",
                icon: <FaTasks />,
                link: "/dashboard/student/assignments",
            },
            {
                name: "Exams & Results",
                icon: <FaClipboardCheck />,
                submenu: [
                    {
                        name: "Exams",
                        link: "/dashboard/student/my-exams",
                    },
                    {
                        name: "Results",
                        link: "/dashboard/student/my-results",
                    },
                ],
            },
        ],
    },
    {
        section: "Payments",
        items: [
            {
                name: "Payments",
                icon: <BsCashCoin />,
                submenu: [
                    {
                        name: "Create Payment",
                        link: "/dashboard/payments/create-payment",
                    },
                    {
                        name: "View Transactions",
                        link: "/dashboard/payments/view-my-payments",
                    },
                ],
            },
        ],
    },
];

export const parentMenu = [
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
    institute_admin: instituteAdmin,
    teacher: teacherMenu,
    student: studentMenu,
    parent: parentMenu,
};