import { ROLES } from "./roles";
import pashaHoldingIcon from "@/assets/images/reports/pasa-holding.png";
import pashaBankIcon from "@/assets/images/reports/pasha-bank.png";
import kapitalBankIcon from "@/assets/images/reports/kapital-bank.png";
import pashaLifeIcon from "@/assets/images/reports/pasha-life.png";
import pashaInsuranceIcon from "@/assets/images/reports/pasha-insurance.png";

// "Management Dashboard" sehifesinin raporlari
const managementDashboard = [
  {
    companyName: "PASHA Holding CC",
    badgeName: "Management Dashboard",
    link: "https://app.powerbi.com/links/EhgXbesice?ctid=de2ad714-c56e-4a86-8d9b-85198dba6c23&pbi_source=linkShare",
    logo: pashaHoldingIcon,
    roles: [],
  },
];

// "HR Committee" sehifesinin raporlari
const hrCommittee = [
  {
    companyName: "PASHA Bank",
    badgeName: "HR Committee",
    link: "https://app.powerbi.com/links/1b1e23uo60?ctid=de2ad714-c56e-4a86-8d9b-85198dba6c23&pbi_source=linkShare",
    logo: pashaBankIcon,
    roles: [],
  },
  {
    companyName: "Kapital Bank",
    badgeName: "HR Committee",
    link: "https://app.powerbi.com/links/EhgXbesice?ctid=de2ad714-c56e-4a86-8d9b-85198dba6c23&pbi_source=linkShare",
    logo: kapitalBankIcon,
    roles: [],
  },
  {
    companyName: "PASHA Life",
    badgeName: "HR Committee",
    link: "https://app.powerbi.com/links/WfGm7VO__4?ctid=de2ad714-c56e-4a86-8d9b-85198dba6c23&pbi_source=linkShare",
    logo: pashaLifeIcon,
    roles: [],
  },
  {
    companyName: "PASHA Insurance",
    badgeName: "HR Committee",
    link: "https://app.powerbi.com/links/s62Y7mUGzp?ctid=de2ad714-c56e-4a86-8d9b-85198dba6c23&pbi_source=linkShare",
    logo: pashaInsuranceIcon,
    roles: [],
  },
  {
    companyName: "PASHA Bank Georgia",
    badgeName: "HR Committee",
    link: "https://app.powerbi.com/links/EhgXbesice?ctid=de2ad714-c56e-4a86-8d9b-85198dba6c23&pbi_source=linkShare",
    logo: pashaBankIcon,
    roles: [],
  },
  {
    companyName: "PASHA Bank Turkey",
    badgeName: "HR Committee",
    link: "https://app.powerbi.com/links/EhgXbesice?ctid=de2ad714-c56e-4a86-8d9b-85198dba6c23&pbi_source=linkShare",
    logo: pashaBankIcon,
    roles: [],
  },
];

// "SB Reports" sehifesinin raporlari
const sbReports = [
  {
    companyName: "PASHA Bank",
    badgeName: "SB Report",
    link: "https://app.powerbi.com/links/EhgXbesice?ctid=de2ad714-c56e-4a86-8d9b-85198dba6c23&pbi_source=linkShare",
    logo: pashaBankIcon,
    roles: [],
  },
  {
    companyName: "PASHA Life",
    badgeName: "SB Report",
    link: "https://app.powerbi.com/links/EhgXbesice?ctid=de2ad714-c56e-4a86-8d9b-85198dba6c23&pbi_source=linkShare",
    logo: pashaLifeIcon,
    roles: [],
  },
  {
    companyName: "PASHA Insurance",
    badgeName: "SB Report",
    link: "https://app.powerbi.com/links/EhgXbesice?ctid=de2ad714-c56e-4a86-8d9b-85198dba6c23&pbi_source=linkShare",
    logo: pashaInsuranceIcon,
    roles: [],
  },
];


const groupWideActivities = [
  {
    companyName: "Group Mobility Report",
    badgeName: "Group wide activities",
    link: "https://app.powerbi.com/links/8XheDFf1cV?ctid=de2ad714-c56e-4a86-8d9b-85198dba6c23&pbi_source=linkShare",
    logo: null,
    roles: [],
  },
  {
    companyName: "Loyalty program - Deyerlisen",
    badgeName: "Group wide activities",
    link: "https://app.powerbi.com/links/KN569gAxlf?ctid=de2ad714-c56e-4a86-8d9b-85198dba6c23&pbi_source=linkShare",
    logo: null,
    roles: [],
  },
  {
    companyName: "Exit Survey - PASHA Bank",
    badgeName: "Group wide activities",
    link: "https://app.powerbi.com/links/EhgXbesice?ctid=de2ad714-c56e-4a86-8d9b-85198dba6c23&pbi_source=linkShare",
    logo: pashaBankIcon,
    roles: [],
  },
  {
    companyName: "Exit Survey - PASHA Life",
    badgeName: "Group wide activities",
    link: "https://app.powerbi.com/links/EhgXbesice?ctid=de2ad714-c56e-4a86-8d9b-85198dba6c23&pbi_source=linkShare",
    logo: pashaLifeIcon,
    roles: [],
  },
  {
    companyName: "Exit Survey - PASHA Insurance",
    badgeName: "Group wide activities",
    link: "https://app.powerbi.com/links/EhgXbesice?ctid=de2ad714-c56e-4a86-8d9b-85198dba6c23&pbi_source=linkShare",
    logo: pashaInsuranceIcon,
    roles: [],
  },
  {
    companyName: "Exit Survey - Kapital Bank",
    badgeName: "Group wide activities",
    link: "https://app.powerbi.com/links/EhgXbesice?ctid=de2ad714-c56e-4a86-8d9b-85198dba6c23&pbi_source=linkShare",
    logo: kapitalBankIcon,
    roles: [],
  },
];

const db = {
  [ROLES.ADMIN]: [
    ...managementDashboard,
    ...hrCommittee,
    ...sbReports,
    ...groupWideActivities
  ],
  [ROLES.HR]: [
    ...hrCommittee
  ],
};

export {
  managementDashboard,
  hrCommittee,
  sbReports,
  groupWideActivities,
  db
};
