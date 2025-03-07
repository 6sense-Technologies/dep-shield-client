export const additionalDummyData = [
    {
      repositoryName: "6senseEV/6sense-ev-accounting-service",
      totalVulnerabilities: 13,
      vulnerabilities: [
        { id: 1, name: "Critical", severity: "Critical" },
        { id: 2, name: "High", severity: "High" },
      ],
      sharingDetails: [
        { id: 1, name: "User 1", avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg" },
      ],
    },
    {
      repositoryName: "6senseEV/6sense-ev-billing-service",
      totalVulnerabilities: 3,
      vulnerabilities: [
        { id: 1, name: "Low", severity: "Low" },
        { id: 2, name: "Medium", severity: "Medium" },
      ],
      sharingDetails: [
        { id: 1, name: "User 4", avatarUrl: "https://randomuser.me/api/portraits/women/4.jpg" },
        { id: 2, name: "User 5", avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg" },
      ],
    },
    {
      repositoryName: "6senseEV/6sense-ev-customer-service",
      totalVulnerabilities: 2,
      vulnerabilities: [
        { id: 1, name: "Critical", severity: "Critical" },
        { id: 2, name: "High", severity: "High" },
      ],
      sharingDetails: [
        { id: 1, name: "User 6", avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg" },
        { id: 2, name: "User 7", avatarUrl: "url7" },
        { id: 3, name: "User 8", avatarUrl: "https://randomuser.me/api/portraits/men/5.jpg" },
      ],
    },
  ];

  export const shareData = [
    {
      sharedBy: {
        name: "User 1",
        avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
      },
      sharedRepositories: 12,
      platform: "GitHub",
    },
    {
      sharedBy: {
        name: "User 2",
        avatarUrl: "https://randomuser.me/api/portraits/women/2.jpg",
      },
      sharedRepositories: 13,
      platform: "GitLab",
    },
    {
      sharedBy: {
        name: "User 3",
        avatarUrl: "https://randomuser.me/api/portraits/men/3.jpg",
      },
      sharedRepositories: 10,
      platform: "BitBucket",
    },
    {
      sharedBy: {
        name: "User 4",
        avatarUrl: "https://randomuser.me/api/portraits/women/4.jpg",
      },
      sharedRepositories: 15,
      platform: "GitHub",
    },
    {
      sharedBy: {
        name: "User 5",
        avatarUrl: "https://randomuser.me/api/portraits/men/5.jpg",
      },
      sharedRepositories: 8,
      platform: "GitLab",
    },
    {
      sharedBy: {
        name: "User 6",
        avatarUrl: "https://randomuser.me/api/portraits/women/6.jpg",
      },
      sharedRepositories: 20,
      platform: "BitBucket",
    },
  ];


  export const vulnerabilitiesData = [
    {
        name: "CVE-2023-42282",
        discovered: "24-01-2025",
        severity: "Critical",
        dependency: "follow-redirects (npm)",
        exploited: "NO"
    },
    {
        name: "CVE-2023-42282",
        discovered: "24-01-2025",
        severity: "Critical",
        dependency: "lp (npm)",
        exploited: "NO"
    },
    {
        name: "CVE-2023-42282",
        discovered: "24-01-2025",
        severity: "Low",
        dependency: "lp (npm)",
        exploited: "YES"
    },
    {
        name: "CVE-2023-42282",
        discovered: "24-01-2025",
        severity: "High",
        dependency: "mongoose (npm)",
        exploited: "YES"
    },
    {
        name: "CVE-2023-42282",
        discovered: "24-01-2025",
        severity: "Medium",
        dependency: "traverse (npm)",
        exploited: "YES"
    },
    {
        name: "CVE-2023-42282",
        discovered: "24-01-2025",
        severity: "Unknown",
        dependency: "cross-spawn (npm)",
        exploited: "NO"
    }
];

export const dependenciesData = [
    {
        name: "aio-pika (pip)",
        totalVulnerabilities: 5,
        vulnerabilityPriority: ["Critical", "High"],
        licenses: "Apache-2.0",
        health: {
            popularity: 85,
            contribution: 70
        }
    },
    {
        name: "requests (pip)",
        totalVulnerabilities: 3,
        vulnerabilityPriority: ["Medium", "Low"],
        licenses: "MIT",
        health: {
            popularity: 90,
            contribution: 60
        }
    },
    {
        name: "express (npm)",
        totalVulnerabilities: 7,
        vulnerabilityPriority: ["High", "Medium"],
        licenses: "MIT",
        health: {
            popularity: 75,
            contribution: 50
        }
    },
    {
        name: "lodash (npm)",
        totalVulnerabilities: 2,
        vulnerabilityPriority: ["Low", "-"],
        licenses: "MIT",
        health: {
            popularity: 95,
            contribution: 80
        }
    },
    {
        name: "django (pip)",
        totalVulnerabilities: 4,
        vulnerabilityPriority: ["Critical", "Unknown"],
        licenses: "BSD-3-Clause",
        health: {
            popularity: 80,
            contribution: 65
        }
    },
    {
        name: "react (npm)",
        totalVulnerabilities: 1,
        vulnerabilityPriority: ["Low", "-"],
        licenses: "MIT",
        health: {
            popularity: 98,
            contribution: 85
        }
    }
];

export const licensesData = [
    {
        name: "Apache-2.0",
        licenseRisk: "Low",
        dependencies: 12,
        licenseFamily: "Permissive"
    },
    {
        name: "MIT",
        licenseRisk: "Medium",
        dependencies: 8,
        licenseFamily: "Permissive"
    },
    {
        name: "GPL-3.0",
        licenseRisk: "High",
        dependencies: 5,
        licenseFamily: "Strong Copyleft"
    },
    {
        name: "BSD-3-Clause",
        licenseRisk: "Low",
        dependencies: 10,
        licenseFamily: "Permissive"
    },
    {
        name: "LGPL-2.1",
        licenseRisk: "Medium",
        dependencies: 7,
        licenseFamily: "Weak Copyleft"
    },
    {
        name: "MPL-2.0",
        licenseRisk: "Unknown",
        dependencies: 4,
        licenseFamily: "Weak Copyleft"
    }
];

export const RepoData = [
    {
        repositoryName: "CVE-2023-42282",

    },
    {
        repositoryName: "CVE-2023-42283",

    },
    {
        repositoryName: "CVE-2023-42284",

    },
    {
        repositoryName: "CVE-2023-42285",

    },
    {
        repositoryName: "CVE-2023-42286",
    },
    {
        repositoryName: "CVE-2023-42287",
    },
    {
        repositoryName: "CVE-2023-42288",

    },
    {
        repositoryName: "CVE-2023-42289",

    },
    {
        repositoryName: "CVE-2023-42290",

    },
    {
        repositoryName: "CVE-2023-42291",

    }
];

export const secondTabData = [
    { key: "Attack Vector", value: "Network" },
    { key: "Attack Complexity", value: "Medium" },
    { key: "Privileges Required", value: "None" },
    { key: "User Interaction", value: "Required" },
    { key: "Scope", value: "Unchanged" },
    { key: "Confidentiality", value: "High" },
    { key: "Integrity", value: "High" },
    { key: "Availability", value: "High" },
];

export const firstTabData = [
    { key: "Attack Vector", value: "Network" },
    { key: "Attack Complexity", value: "Medium" },
    { key: "Authentication", value: "None" },
    { key: "Confidentiality", value: "Partial" },
    { key: "Integrity", value: "None" },
    { key: "Availability", value: "None" },
];

export const DepData = [
  {
      repositoryName: "CVE-2023-42282",
  },
  {
      repositoryName: "CVE-2023-42283",
  },
  {
      repositoryName: "CVE-2023-42284",
  },
  {
      repositoryName: "CVE-2023-42285",
  },
  {
      repositoryName: "CVE-2023-42286",
  },
  {
      repositoryName: "CVE-2023-42287",
  },
  {
      repositoryName: "CVE-2023-42288",
  },
  {
      repositoryName: "CVE-2023-42289",
  },
  {
      repositoryName: "CVE-2023-42290",
  },
  {
      repositoryName: "CVE-2023-42291",
  }
];

export const EffectedlicensesData = [
    {
        name: "Apache-2.0",
        licenseRisk: "Low",
        dependencies: 12,
        licenseFamily: "Permissive",
        affectedRepositories: ["6senseEV/6sense-ev-oc", "pp-server"]
    },
    {
        name: "MIT",
        licenseRisk: "Medium",
        dependencies: 8,
        licenseFamily: "Permissive",
        affectedRepositories: ["repo1", "repo2", "repo3"]
    },
    {
        name: "GPL-3.0",
        licenseRisk: "High",
        dependencies: 5,
        licenseFamily: "Strong Copyleft",
        affectedRepositories: ["repo4"]
    },
    {
        name: "BSD-3-Clause",
        licenseRisk: "Low",
        dependencies: 10,
        licenseFamily: "Permissive",
        affectedRepositories: ["repo5", "repo6"]
    },
    {
        name: "LGPL-2.1",
        licenseRisk: "Medium",
        dependencies: 7,
        licenseFamily: "Weak Copyleft",
        affectedRepositories: ["repo7", "repo8", "repo9"]
    },
    {
        name: "MPL-2.0",
        licenseRisk: "Unknown",
        dependencies: 4,
        licenseFamily: "Weak Copyleft",
        affectedRepositories: ["repo10"]
    }
];