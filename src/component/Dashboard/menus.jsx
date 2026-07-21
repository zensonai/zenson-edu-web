import {
    BiSolidDashboard,
    BiBuildings,
    BiShield,
} from "react-icons/bi";

import {
    FaUsers,
    FaUserShield,
    FaClipboardList,
    FaChalkboardTeacher,
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
                name: "Parents",
                icon: <FaUsers />,
                submenu: [
                    {
                        name: "All Parents",
                        link: "/dashboard/parents",
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
                name: "Attendance",
                icon: <FaUserCheck />,
                link: "/dashboard/attendance",
            },
            {
                name: "Assignments",
                icon: <FaTasks />,
                link: "/dashboard/assignments",
            },
            {
                name: "Exams & Results",
                icon: <FaClipboardCheck />,
                submenu: [
                    {
                        name: "Exams",
                        link: "/dashboard/exams",
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
        section: "Reports",
        items: [
            {
                name: "Student Progress",
                icon: <FaChartLine />,
                link: "/dashboard/report/student-progress",
            },
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