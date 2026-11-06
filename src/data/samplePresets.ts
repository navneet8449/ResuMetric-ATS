import { SampleDataPreset } from '../types';

export const SAMPLE_PRESETS: SampleDataPreset[] = [
  {
    id: 'fullstack-fintech',
    title: 'Full Stack Engineer vs. Senior FinTech Role',
    role: 'Full Stack Software Engineer',
    resumeText: `ALEX RIVERA
San Francisco, CA • alex.rivera@email.com • linkedin.com/in/alexrivera • github.com/arivera-dev

PROFESSIONAL SUMMARY
Results-driven Full Stack Engineer with 4 years of experience building and scaling responsive web applications and REST APIs using TypeScript, React, and Node.js. Passionate about clean architecture, test automation, and front-end performance optimization.

TECHNICAL SKILLS
Languages: TypeScript, JavaScript (ES6+), Python, HTML5, CSS3, SQL
Frontend: React, Next.js, Redux Toolkit, Tailwind CSS, Webpack
Backend: Node.js, Express.js, RESTful APIs, GraphQL
Databases: PostgreSQL, MongoDB, Redis
DevOps & Tools: Docker, Git, GitHub Actions, Jest, Cypress, Vite

PROFESSIONAL EXPERIENCE
Software Engineer | Apex Cloud Solutions (Austin, TX)
June 2022 – Present
• Engineered client-facing web dashboard in React and TypeScript serving 45,000 monthly active users.
• Improved page load time by 38% through code splitting, memoization, and lazy asset loading.
• Developed 14 microservice REST APIs in Node.js and Express with PostgreSQL backend.
• Implemented automated CI/CD pipelines using GitHub Actions, decreasing deploy failures by 22%.
• Integrated Redis caching layer, decreasing database query latency from 240ms to 42ms.
• Collaborated in an agile team of 6 engineers, participating in bi-weekly sprints and peer code reviews.

Junior Web Developer | Nimbus Interactive (Remote)
January 2020 – May 2022
• Built responsive landing pages and internal admin portals using React, HTML5, and Tailwind CSS.
• Maintained unit tests with Jest, increasing codebase coverage from 55% to 80%.
• Resolved 120+ customer-reported bug tickets across frontend and backend services.
• Assisted senior architects in migrating legacy monolithic code to modular component libraries.

EDUCATION
B.S. in Computer Science | University of Texas at Austin (Graduated May 2020)`,
    jobTitle: 'Senior Full Stack Engineer (FinTech & High Scale)',
    jobDescriptionText: `Job Title: Senior Full Stack Engineer - Payment Infrastructure
Company: NovaPay Financial Technologies
Location: San Francisco, CA (Hybrid)

About the Role:
NovaPay is looking for a Senior Full Stack Engineer with 5+ years of production experience to architect, scale, and maintain our high-volume real-time payments platform processing over $2B annually.

Key Responsibilities:
• Lead end-to-end architecture and implementation of resilient payments dashboards and checkout workflows.
• Design secure, high-throughput microservices using TypeScript, Node.js, and Golang or Python.
• Work extensively with AWS infrastructure (ECS, Lambda, RDS Aurora, SQS/SNS) and Terraform.
• Enforce strict security standards (PCI-DSS, SOC2 compliance) and data encryption protocols.
• Mentor junior and mid-level engineers through code reviews, system design sessions, and technical documentation.
• Partner closely with Product, Compliance, and DevOps teams to deliver mission-critical financial features.

Required Qualifications & Must-Haves:
• 5+ years of professional full stack engineering experience in production web applications.
• Deep expertise with TypeScript, React 18+, modern state management, and Node.js.
• Strong database design skills with relational systems (PostgreSQL, MySQL) and query optimization at scale.
• Hands-on production experience with AWS cloud services (ECS/EKS, S3, RDS, CloudWatch).
• Experience with event-driven architectures, Kafka, or message queues (RabbitMQ/SQS).
• Strong understanding of web security, authentication (OAuth2, JWT), and compliance requirements.

Nice to Have / Bonus:
• Experience in FinTech, banking, or PCI-DSS regulated environments.
• Experience with Infrastructure as Code using Terraform or CloudFormation.
• Familiarity with Golang for high-throughput distributed workers.`
  },
  {
    id: 'devops-cloud',
    title: 'Cloud DevOps Engineer vs. Staff SRE Role',
    role: 'Cloud DevOps & Infrastructure Engineer',
    resumeText: `PRIYA SHARMA
Seattle, WA • p.sharma@cloudops.net • (555) 234-5678 • linkedin.com/in/priyasharma-devops

SUMMARY
Certified AWS Solutions Architect and DevOps Engineer with 6 years of experience automating cloud infrastructure, orchestrating Kubernetes clusters, and establishing GitOps delivery pipelines. Proven track record of maintaining 99.99% system availability across multi-region production deployments.

CORE COMPETENCIES
Cloud: AWS (EC2, EKS, RDS, S3, IAM, Route53, CloudWatch), GCP (GKE, Cloud Run)
Container & Orchestration: Kubernetes, Docker, Helm, ArgoCD
Infrastructure as Code: Terraform, Terragrunt, Ansible, CloudFormation
CI/CD: GitLab CI, GitHub Actions, Jenkins, Spinnaker
Monitoring & Observability: Prometheus, Grafana, Datadog, ELK Stack, OpenTelemetry
Scripting: Bash, Python, Go (intermediate)

PROFESSIONAL EXPERIENCE
Senior DevOps Engineer | CloudScale Systems (Seattle, WA)
March 2021 – Present
• Architected and managed 18 production Kubernetes (EKS) clusters supporting 200+ containerized microservices.
• Standardized multi-region infrastructure provisioning using modular Terraform, cutting cloud spend by 18% ($240k/yr).
• Built automated GitOps release workflows using ArgoCD and GitHub Actions, speeding up deployment velocity from weekly to 15+ times daily.
• Implemented centralized observability with Prometheus, Grafana, and OpenTelemetry, reducing MTTR for Sev-1 incidents by 45%.
• Authored comprehensive disaster recovery runbooks and conducted quarterly chaos engineering drills.

DevOps Engineer | Strata Security (Denver, CO)
August 2018 – February 2021
• Migrated 30+ legacy virtual machines on AWS EC2 to containerized workloads using Docker and AWS ECS.
• Automated security vulnerability scanning in CI/CD pipeline using Trivy and SonarQube, catching 95% of critical CVEs prior to staging.
• Managed PostgreSQL and Redis database backups, failover replicas, and read-replica scaling.
• Administered Linux servers (Ubuntu/CentOS), writing Bash and Python automation scripts for routine patching.

CERTIFICATIONS
• AWS Certified Solutions Architect – Professional (Active)
• Certified Kubernetes Administrator (CKA - Linux Foundation)

EDUCATION
B.S. in Information Systems | University of Colorado Boulder (2018)`,
    jobTitle: 'Staff Site Reliability Engineer (Global Distributed Systems)',
    jobDescriptionText: `Job Title: Staff Site Reliability Engineer
Company: Orbit Global Networks
Location: Remote (US)

Role Overview:
Orbit Global Networks is seeking a Staff SRE to own reliability, disaster recovery, and infrastructure scaling for our global edge network serving 20M requests/second.

Key Responsibilities:
• Define and champion SLOs, SLAs, and error budgets across all core distributed backend services.
• Architect multi-cloud resilient topologies across AWS and GCP using Terraform and Kubernetes.
• Build automated self-healing infrastructure and chaos experiments (Gremlin/Chaos Mesh).
• Deeply investigate complex network bottlenecks (TCP/IP, BGP, DNS, HTTP/3, eBPF).
• Lead post-mortem retrospectives and drive permanent systemic mitigations.

Minimum Requirements:
• 8+ years of experience in SRE, DevOps, or distributed systems production operations.
• Advanced mastery of Kubernetes internals (operators, CNI, CSI, CRDs).
• Proficient software engineering skills in Go or Rust to build custom internal platform tooling.
• Deep Linux kernel performance tuning and network troubleshooting (eBPF, tcpdump, strace).
• Proven experience managing production systems at hyper-scale (10k+ nodes or multi-million RPS).`
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst vs. Senior Analytics Engineer',
    role: 'Junior Data Analyst',
    resumeText: `MARCUS CHEN
Chicago, IL • mchen.data@outlook.com • (312) 555-0199 • github.com/marcuschen-analytics

SUMMARY
Data Analyst with 1.5 years of experience turning raw operational data into actionable business intelligence reports. Proficient in SQL queries, Python data wrangling (pandas), and interactive Tableau dashboard creation.

TECHNICAL TOOLKIT
• Querying & Analysis: SQL (PostgreSQL, MySQL), Python (pandas, NumPy, matplotlib)
• Visualization: Tableau, Power BI, Excel (Advanced, Pivot Tables, VLOOKUP, XLOOKUP)
• Tools: Jupyter Notebooks, Git, Google Sheets, basic dbt

EXPERIENCE
Junior Data Analyst | RetailPulse Analytics (Chicago, IL)
July 2023 – Present
• Created 8 automated weekly executive dashboards in Tableau tracking revenue, customer churn, and inventory turnover.
• Wrote SQL queries against a 2M-row PostgreSQL database to answer ad-hoc questions from marketing and operations managers.
• Automated manual spreadsheet reconciliation using Python scripts, saving 6 hours of analyst labor each week.
• Collaborated with senior analysts to audit data quality and identify tracking discrepancies in Google Analytics 4.

Data Intern | Midwest Logistics Group (Chicago, IL)
Summer 2022
• Cleaned and standardized shipment tracking records using Excel and basic Python.
• Built delivery delay summary reports presented to warehouse logistics team.

EDUCATION
B.S. in Economics & Statistics | University of Illinois Urbana-Champaign (2023)`,
    jobTitle: 'Senior Analytics Engineer & Data Modeler',
    jobDescriptionText: `Job Title: Senior Analytics Engineer
Company: Elevate Commerce
Location: Chicago, IL (Hybrid)

Role Overview:
Elevate Commerce is seeking an experienced Analytics Engineer (4+ years) to lead our modern data stack transformation, building robust dbt data models, maintaining BigQuery/Snowflake warehouses, and establishing data contracts.

Requirements:
• 4+ years of hands-on experience in analytics engineering or data engineering.
• Advanced SQL and dimensional data modeling (Kimball methodology, star schemas).
• Expert proficiency with dbt (dbt Core or dbt Cloud), including macros, testing, and CI runs.
• Production experience with Snowflake or Google BigQuery and orchestrators like Airflow or Dagster.
• Experience writing Python for data pipelines and API integrations.
• Strong stakeholder management and mentoring experience.`
  }
];
