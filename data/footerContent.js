module.exports = [
  {
    id: 1,
    title: "For Candidates",
    menuList: [
      // { name: "Browse Jobs", route: "/job-list-v11" },
      // { name: "Browse Categories", route: "/job-list-v3" },
      { name: "Candidate Dashboard", route: "/candidate/dashboard" },
      // { name: "Job Alerts", route: "/candidate/job-alerts" },
      // {
      //   name: "My Bookmarks",
      //   route: "/candidate/short-listed-jobs",
      // },
    ],
  },
  {
    id: 2,
    title: "For Employers",
    menuList: [
      // { name: "Browse Candidates", route: "/candidates-list-v1" },
      { name: "Employer Dashboard", route: "/employer/dashboard" },
      { name: "Add Job", route: "/employer/post-jobs" },
      // { name: "Job Packages", route: "/employer/packages" },
    ],
  },
  {
    id: 3,
    title: "About Us",
    menuList: [
      { name: "About Us", route: "/about" },
      { name: "Job Page Invoice", route: "/invoice" },
      { name: "Terms Page", route: "/terms" },
      // { name: "Blog", route: "/blog-list-v1" },
      { name: "Contact", route: "/contact" },
    ],
  },
  {
    id: 4,
    title: "Helpful Resources",
    menuList: [
      // { name: "Site Map", route: "/" },
      { name: "Terms of Use", route: "/terms" },
      { name: "Privacy Center", route: "/" },
      { name: "Security Center", route: "/" },
      { name: "Accessibility Center", route: "/" },
    ],
  },
];
