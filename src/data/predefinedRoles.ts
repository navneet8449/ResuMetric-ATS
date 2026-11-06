import { PredefinedJobRole } from '../types';

export const PREDEFINED_JOB_ROLES: PredefinedJobRole[] = [
  // 1. Frontend Developer
  {
    id: 'frontend-developer',
    title: 'Frontend Developer',
    roleHint: 'Senior Frontend Developer (React, Next.js & Modern Web)',
    category: 'Frontend & Mobile',
    experienceLevel: '4+ Years',
    companyName: 'Lumina Digital Experience',
    jobTitle: 'Senior Frontend Developer - Web Experience Platform',
    keySkills: ['React 18+', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux / Zustand', 'HTML5/CSS3', 'Web Vitals', 'Jest / Playwright'],
    jobDescriptionText: `Job Title: Senior Frontend Developer - Web Experience Platform
Company: Lumina Digital Experience
Location: San Francisco, CA (Hybrid / Remote Option)

About Lumina:
Lumina delivers high-traffic, hyper-responsive digital web applications for global enterprise clients serving over 50M monthly unique visitors.

Role Overview:
We are seeking an experienced Frontend Developer (4+ years) to lead client-facing web architecture, build performant component libraries, and optimize web vitals across modern web browsers.

Key Responsibilities:
• Architect, build, and optimize scalable web applications using React 18+, Next.js (App Router), and TypeScript.
• Translate high-fidelity Figma designs into responsive, accessible, pixel-perfect user interfaces with Tailwind CSS.
• Optimize application performance, focusing on Core Web Vitals (Largest Contentful Paint, Cumulative Layout Shift, Interaction to Next Paint).
• Manage client-side state efficiently using Zustand, Redux Toolkit, or React Query / TanStack Query.
• Write comprehensive automated unit and end-to-end tests using Jest, React Testing Library, and Playwright or Cypress.
• Partner closely with UI/UX designers, backend engineers, and product managers to deliver seamless customer journeys.

Must-Have Technical Requirements:
• 4+ years of professional frontend software engineering experience in production web environments.
• Advanced proficiency in TypeScript, JavaScript (ES6+), semantic HTML5, and CSS3 / modern layout techniques.
• Deep expertise in React hooks, component composition, server components, and Next.js framework architectures.
• Proven track record of auditing and optimizing page load speeds, asset bundling (Vite, Webpack, Turbopack), and caching strategies.
• Strong familiarity with RESTful APIs, GraphQL integrations, and client-side error boundaries.
• Commitment to Web Accessibility Standards (WCAG 2.1 AA compliance) and cross-browser compatibility.

Nice to Have / Bonus:
• Experience with Micro-Frontends or Monorepo architectures (Turborepo, Nx).
• Experience with web animation libraries (Framer Motion / Motion, CSS animations).
• Contributions to open-source UI libraries or design systems.`
  },

  // 2. Backend Developer
  {
    id: 'backend-developer',
    title: 'Backend Developer',
    roleHint: 'Senior Backend Developer (Distributed Systems & APIs)',
    category: 'Backend & Cloud',
    experienceLevel: '5+ Years',
    companyName: 'Nexus Cloud Infrastructure',
    jobTitle: 'Senior Backend Developer - Distributed Core Platform',
    keySkills: ['Node.js', 'Go / Golang', 'RESTful APIs', 'gRPC', 'PostgreSQL', 'Redis', 'Kafka', 'Docker', 'Kubernetes', 'AWS'],
    jobDescriptionText: `Job Title: Senior Backend Developer - Distributed Core Platform
Company: Nexus Cloud Infrastructure
Location: Seattle, WA (Hybrid / Remote)

About the Role:
Nexus provides distributed cloud orchestration tools handling hundreds of thousands of concurrent API requests per second. We are seeking a Senior Backend Developer to design, build, and maintain our high-throughput backend services and data storage pipelines.

Key Responsibilities:
• Design, implement, and maintain resilient backend microservices in Go (Golang) and Node.js / TypeScript.
• Architect low-latency REST and gRPC API endpoints with robust rate limiting, authentication, and validation.
• Design schema migrations, relational database structures, and query optimizations in PostgreSQL and Redis.
• Build scalable event-driven messaging pipelines using Apache Kafka or RabbitMQ.
• Instrument services with comprehensive distributed tracing, metrics, and structured logging (OpenTelemetry, Prometheus, Datadog).
• Deploy and maintain containerized applications using Docker and Kubernetes on AWS or GCP.

Must-Have Qualifications:
• 5+ years of dedicated backend engineering experience building distributed systems in production.
• Proficient software development skills in Go, Node.js (TypeScript), or Python with a strong grasp of concurrency and network protocols.
• Deep hands-on database experience with PostgreSQL (indexing, partitioning, connection pooling) and distributed caching (Redis).
• Experience designing event-driven architectures with message brokers such as Kafka, SQS, or RabbitMQ.
• Practical familiarity with containerization (Docker), Kubernetes workloads, and CI/CD automation pipelines.
• Strong grasp of microservice patterns, distributed transactions, idempotency, and disaster recovery.

Nice to Have / Bonus:
• Experience with cloud infrastructure as code using Terraform.
• Experience managing high-throughput Cassandra or DynamoDB datastores.
• Knowledge of Zero-Trust security and OAuth2 / mTLS authentication.`
  },

  // 3. Python Developer
  {
    id: 'python-developer',
    title: 'Python Developer',
    roleHint: 'Senior Python Developer (FastAPI, Django & Asynchronous Services)',
    category: 'Backend & Cloud',
    experienceLevel: '4+ Years',
    companyName: 'Helios Data Platforms',
    jobTitle: 'Senior Python Software Engineer - Platform & API Services',
    keySkills: ['Python 3.11+', 'FastAPI', 'Django', 'AsyncIO', 'Celery', 'PostgreSQL', 'Redis', 'Docker', 'PyTest', 'SQLAlchemy'],
    jobDescriptionText: `Job Title: Senior Python Software Engineer - Platform & API Services
Company: Helios Data Platforms
Location: Austin, TX (Remote)

About Helios:
Helios builds high-throughput data processing platforms and business intelligence APIs for multinational enterprises.

Position Overview:
We are looking for a Senior Python Developer with 4+ years of professional experience writing clean, scalable, asynchronous Python code to architect our next-generation API layer and asynchronous worker pipelines.

Key Responsibilities:
• Architect, implement, and maintain high-performance RESTful APIs using Python, FastAPI, and Django REST Framework.
• Build and optimize asynchronous task queues, background workers, and scheduling pipelines using Celery and Redis.
• Write robust data access layers with SQLAlchemy or Django ORM against PostgreSQL and ClickHouse databases.
• Enforce strict code quality through automated testing with pytest, type hinting (mypy), and linting (ruff, black).
• Package microservices into optimized Docker containers and integrate them into automated CI/CD deployment pipelines.
• Identify and eliminate latency bottlenecks in I/O-bound and CPU-bound Python workloads using AsyncIO and multiprocessing.

Requirements & Core Qualifications:
• 4+ years of professional backend software development using modern Python (3.10+).
• Strong production experience with modern Python web frameworks: FastAPI, Django, or Flask.
• Mastery of asynchronous programming in Python (async/await, asyncio event loops, concurrency).
• Solid understanding of relational database design, complex SQL joins, indexing, and SQLAlchemy ORM optimization.
• Proven track record with distributed queues (Celery, RabbitMQ, Redis) for background asynchronous workloads.
• Strong testing discipline with pytest, fixtures, mocking, and coverage tooling.

Nice to Have:
• Experience with Apache Airflow or Prefect for workflow orchestration.
• Familiarity with Pandas / Polars for lightweight data transformations.
• Experience deploying Python services to AWS ECS or GCP Cloud Run.`
  },

  // 4. Java Developer
  {
    id: 'java-developer',
    title: 'Java Developer',
    roleHint: 'Senior Java Software Engineer (Spring Boot, Microservices & Kafka)',
    category: 'Backend & Cloud',
    experienceLevel: '5+ Years',
    companyName: 'Apex Enterprise Solutions',
    jobTitle: 'Senior Java Software Engineer - Enterprise Core Platforms',
    keySkills: ['Java 17/21', 'Spring Boot 3', 'Spring Cloud', 'Hibernate / JPA', 'Apache Kafka', 'PostgreSQL', 'Microservices', 'JUnit / Mockito', 'Docker', 'Maven/Gradle'],
    jobDescriptionText: `Job Title: Senior Java Software Engineer - Enterprise Core Platforms
Company: Apex Enterprise Solutions
Location: Chicago, IL (Hybrid / Remote)

About Apex:
Apex provides enterprise-grade transaction processing systems and ERP integrations for Fortune 500 corporations.

Role Summary:
We are seeking a Senior Java Developer with 5+ years of experience in enterprise Java architectures and Spring Boot microservices to lead core platform engineering and transactional messaging systems.

Key Responsibilities:
• Architect, develop, and maintain secure, high-throughput microservices using Java 17/21, Spring Boot 3, and Spring Cloud.
• Design data persistence layers using Spring Data JPA, Hibernate, and relational databases (PostgreSQL, Oracle, or MySQL).
• Build scalable, decoupled event streaming pipelines using Apache Kafka topics, producers, and consumer groups.
• Implement automated unit, integration, and contract tests using JUnit 5, Mockito, Testcontainers, and AssertJ.
• Maintain build pipelines and dependency management with Maven or Gradle, containerizing services with Docker.
• Collaborate on system design, code reviews, API contracts (OpenAPI/Swagger), and agile sprint deliverables.

Required Experience & Skills:
• 5+ years of hands-on professional software engineering in Java in enterprise production environments.
• In-depth mastery of the Spring framework ecosystem (Spring Boot, Spring MVC, Spring Data JPA, Spring Security).
• Strong expertise in relational database modeling, query tuning, ACID transaction management, and connection pooling (HikariCP).
• Production experience with message-driven architectures using Apache Kafka, RabbitMQ, or JMS.
• Deep understanding of Object-Oriented Design patterns, SOLID principles, and clean code architecture.
• Experience writing automated test suites with JUnit 5 and Mockito with high code coverage standards.

Bonus Qualifications:
• Experience with cloud-native deployment on Kubernetes and OpenShift.
• Experience with reactive programming (Project Reactor, WebFlux).
• Familiarity with distributed tracing tools like Zipkin, Jaeger, or Datadog.`
  },

  // 5. Software Engineer
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    roleHint: 'Software Engineer (General Software Engineering, Core Algorithms & Systems)',
    category: 'General',
    experienceLevel: '3+ Years',
    companyName: 'Meridian Global Systems',
    jobTitle: 'Software Engineer - Core Product & Platforms',
    keySkills: ['Data Structures & Algorithms', 'System Design', 'TypeScript / Java / Python', 'RESTful APIs', 'SQL Databases', 'Git', 'Unit Testing', 'CI/CD', 'Agile/Scrum'],
    jobDescriptionText: `Job Title: Software Engineer - Core Product & Platforms
Company: Meridian Global Systems
Location: New York, NY (Hybrid)

Role Overview:
Meridian is looking for a versatile Software Engineer with 3+ years of experience who possesses strong computer science fundamentals, solid problem-solving abilities, and a collaborative mindset to build scalable customer-facing software.

Key Responsibilities:
• Write clean, maintainable, and well-tested code across backend and frontend service components.
• Design and document clean REST APIs and database schemas to support core business functionality.
• Participate in engineering design reviews, code reviews, and pair programming sessions to maintain high code standards.
• Debug complex application issues, investigate production incidents, and implement permanent systemic resolutions.
• Collaborate within a cross-functional agile squad comprising product managers, designers, and QA engineers.

Minimum Requirements:
• 3+ years of professional software engineering experience shipping production features.
• Strong foundation in Computer Science fundamentals: data structures, algorithmic complexity, memory management, and OOP / functional paradigms.
• Proficiency in at least one modern programming language: TypeScript/JavaScript, Python, Java, or C++.
• Hands-on experience working with relational databases (SQL, PostgreSQL, MySQL) and writing optimized queries.
• Proficiency with Git version control, branch workflows, and modern CI/CD automation systems.
• Track record of writing unit and integration tests and adhering to defensive programming principles.

Preferred Qualifications:
• Exposure to cloud platforms (AWS, GCP, or Azure).
• Familiarity with containerization using Docker.
• Prior experience working in high-growth SaaS or consumer software organizations.`
  },

  // 6. AI/ML Engineer
  {
    id: 'ai-ml-engineer',
    title: 'AI/ML Engineer',
    roleHint: 'AI / Machine Learning Engineer (LLMs, GenAI, PyTorch & MLOps)',
    category: 'Data & AI',
    experienceLevel: '3+ Years',
    companyName: 'Cognition AI Labs',
    jobTitle: 'AI / Machine Learning Engineer - Generative Systems & MLOps',
    keySkills: ['Python', 'PyTorch', 'TensorFlow', 'LLMs & GenAI', 'LangChain / LlamaIndex', 'Hugging Face', 'Vector DBs (Pinecone, Chroma)', 'MLflow', 'Docker', 'CUDA'],
    jobDescriptionText: `Job Title: AI / Machine Learning Engineer - Generative Systems & MLOps
Company: Cognition AI Labs
Location: San Francisco, CA (Hybrid / Remote)

About the Role:
Cognition AI Labs builds next-generation intelligence tools and autonomous agents powered by modern foundation models. We are seeking an AI/ML Engineer to train, fine-tune, evaluate, and deploy production ML systems and Generative AI applications.

Responsibilities:
• Design and deploy production Retrieval-Augmented Generation (RAG) pipelines, semantic search engines, and multi-agent workflows.
• Fine-tune open-weight Large Language Models (LLMs) and transformer architectures using PyTorch and Hugging Face.
• Build, evaluate, and benchmark vector indexing pipelines using Pinecone, Qdrant, Chroma, or pgvector.
• Implement continuous ML pipelines for model tracking, experiment registry, and data versioning using MLflow, DVC, or Weights & Biases.
• Optimize model inference latency, throughput, and GPU utilization using quantization (vLLM, TensorRT-LLM, ONNX).
• Collaborate with software engineers to serve models reliably via high-throughput FastAPI microservices.

Requirements & Must-Haves:
• 3+ years of professional engineering experience applying Machine Learning and Deep Learning in production.
• Deep proficiency in Python and modern ML libraries: PyTorch or TensorFlow, NumPy, and Scikit-Learn.
• Hands-on experience building production Generative AI applications utilizing LLM APIs, LangChain, LlamaIndex, or native SDKs.
• Experience managing vector embeddings, similarity search, and hybrid keyword-vector retrieval algorithms.
• Familiarity with MLOps concepts: model registry, evaluation metrics (BLEU, ROUGE, perplexity, hallucination detection), and containerized deployment with Docker.
• Strong mathematical foundation in linear algebra, probability, statistics, and gradient optimization.

Bonus Qualifications:
• Experience with distributed training across multi-GPU clusters (DeepSpeed, FSDP, Ray).
• Published research in ML/NLP venues (NeurIPS, ICML, ACL) or top-ranking Kaggle solutions.
• Hands-on experience with cloud AI infrastructure on AWS SageMaker or GCP Vertex AI.`
  },

  // 7. Data Scientist
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    roleHint: 'Senior Data Scientist (Predictive Modeling, Statistics & A/B Testing)',
    category: 'Data & AI',
    experienceLevel: '4+ Years',
    companyName: 'Quantix Analytics Group',
    jobTitle: 'Senior Data Scientist - Product & Predictive Analytics',
    keySkills: ['Python', 'R', 'Pandas & NumPy', 'Scikit-Learn', 'SQL (Advanced)', 'A/B Testing', 'Statistical Inference', 'XGBoost / LightGBM', 'BigQuery / Snowflake', 'Tableau'],
    jobDescriptionText: `Job Title: Senior Data Scientist - Product & Predictive Analytics
Company: Quantix Analytics Group
Location: Chicago, IL (Hybrid)

Role Overview:
Quantix Analytics is looking for an experienced Senior Data Scientist (4+ years) to lead predictive modeling initiatives, design rigorous statistical experiments, and generate high-impact business insights from multi-terabyte datasets.

Key Responsibilities:
• Formulate business problems into quantitative machine learning models (churn prediction, lifetime value, recommendation systems, demand forecasting).
• Perform exploratory data analysis, data cleaning, and automated feature engineering on massive data warehouses (Snowflake, Google BigQuery).
• Design, execute, and analyze randomized controlled trials (A/B testing), establishing sample size calculations and statistical power.
• Train, cross-validate, and evaluate predictive algorithms using Scikit-Learn, XGBoost, LightGBM, and statsmodels.
• Translate quantitative modeling findings into intuitive data visualizations and actionable executive presentations using Tableau or Streamlit.
• Partner with Data Engineering to productionize feature stores and batch scoring pipelines.

Required Qualifications:
• 4+ years of industry experience working as a Data Scientist or Quantitative Researcher.
• Advanced proficiency in Python (Pandas, NumPy, Scikit-Learn, SciPy) and/or R for statistical data analysis.
• Expert-level SQL skills for data extraction, window functions, and complex multi-table aggregations.
• Strong foundation in applied statistics: hypothesis testing, regression analysis, ANOVA, bootstrap estimation, and Bayesian inference.
• Proven track record designing, running, and interpreting statistical A/B tests with strict significance criteria.
• Excellent business acumen and ability to clearly articulate technical findings to non-technical stakeholders.

Nice to Have / Bonus:
• M.S. or Ph.D. in Statistics, Data Science, Economics, Mathematics, or Computer Science.
• Experience with causal inference techniques (propensity score matching, difference-in-differences).
• Familiarity with modern data stack tools such as dbt, Airflow, and Databricks.`
  },

  // 8. QA Engineer
  {
    id: 'qa-engineer',
    title: 'QA Engineer',
    roleHint: 'Senior QA Automation Engineer (Playwright, Cypress, Selenium & APIs)',
    category: 'Security & QA',
    experienceLevel: '4+ Years',
    companyName: 'QualityForge Systems',
    jobTitle: 'Senior QA Automation Engineer - Test Automation & Quality Assurance',
    keySkills: ['Test Automation', 'Playwright', 'Cypress', 'Selenium', 'Postman / Newman', 'Jest', 'TypeScript / Python', 'CI/CD Integration', 'API Testing', 'Jira / TestRail'],
    jobDescriptionText: `Job Title: Senior QA Automation Engineer - Test Automation & Quality Assurance
Company: QualityForge Systems
Location: Denver, CO (Remote)

About QualityForge:
QualityForge provides mission-critical enterprise software where zero-downtime and high reliability are non-negotiable.

Role Summary:
We are seeking a detail-oriented Senior QA Engineer with 4+ years of test automation experience to build and maintain end-to-end automated testing frameworks across our web, mobile, and API layers.

Responsibilities:
• Architect, build, and maintain scalable automated testing frameworks using Playwright, Cypress, or Selenium with TypeScript or Python.
• Design, automate, and execute comprehensive API test suites using Postman, Newman, or REST-assured.
• Integrate automated test suites into CI/CD pipelines (GitHub Actions, GitLab CI, Jenkins) to act as automated deployment quality gates.
• Author detailed test plans, test cases, and bug reports, managing defect lifecycles in Jira and TestRail.
• Perform cross-browser, responsive design, and regression testing across staging and production environments.
• Conduct performance, load, and stress testing using tools like k6, Locust, or JMeter to verify system throughput.

Required Skills & Experience:
• 4+ years of dedicated professional experience in Quality Assurance and Software Testing.
• Proven experience building and maintaining UI automation test suites using Playwright, Cypress, or Selenium.
• Strong hands-on experience with API automation testing (REST, JSON, status codes, payload validations).
• Proficiency in programming for test automation using TypeScript, JavaScript, or Python.
• Experience integrating automated tests into continuous integration (CI) workflows.
• Deep understanding of software testing methodologies (smoke, sanity, regression, exploratory, boundary testing).

Nice to Have / Bonus:
• Experience with mobile app automation (Appium, Espresso, XCUITest).
• Knowledge of security testing basics (OWASP Top 10 vulnerabilities).
• ISTQB Certified Tester certification.`
  },

  // 9. Android Developer
  {
    id: 'android-developer',
    title: 'Android Developer',
    roleHint: 'Senior Android Developer (Kotlin, Jetpack Compose & Clean Architecture)',
    category: 'Frontend & Mobile',
    experienceLevel: '4+ Years',
    companyName: 'MobileVibe Interactive Studio',
    jobTitle: 'Senior Android Developer - Mobile Platform Engineering',
    keySkills: ['Kotlin', 'Jetpack Compose', 'Android SDK', 'Coroutines & Flow', 'Dagger Hilt', 'Retrofit', 'Room DB', 'MVVM / MVI', 'Material Design 3', 'Gradle'],
    jobDescriptionText: `Job Title: Senior Android Developer - Mobile Platform Engineering
Company: MobileVibe Interactive Studio
Location: Los Angeles, CA (Hybrid / Remote)

About MobileVibe:
MobileVibe engineers consumer Android applications enjoyed by over 10 million active users worldwide.

Position Overview:
We are seeking a passionate Senior Android Developer (4+ years) to architect and deliver modern native Android applications using Kotlin, Jetpack Compose, and clean reactive architecture.

Key Responsibilities:
• Build engaging, high-performance Android user interfaces using Kotlin and Jetpack Compose (declarative UI).
• Architect scalable, modular Android apps following MVVM / MVI architecture and Clean Architecture principles.
• Implement asynchronous programming and state management using Kotlin Coroutines, StateFlow, and SharedFlow.
• Implement robust local data persistence and offline-first capabilities using Room Database and SQLite.
• Integrate backend RESTful and WebSocket services with Retrofit, OkHttp, and Kotlinx Serialization.
• Write unit tests with JUnit 5, Mockk, and UI instrumentation tests with Compose Testing and Espresso.
• Manage Google Play Console releases, App Bundles, ProGuard/R8 obfuscation, and CI/CD pipelines.

Required Technical Qualifications:
• 4+ years of professional native Android app development experience with apps published on Google Play.
• Expert proficiency in Kotlin and modern Android SDK APIs.
• Strong hands-on production experience building user interfaces with Jetpack Compose.
• Deep understanding of asynchronous programming using Kotlin Coroutines and reactive Flows.
• Experience with dependency injection using Dagger Hilt or Koin.
• Solid grasp of mobile design patterns, memory leak prevention (LeakCanary), and offline-first caching architectures.

Preferred Qualifications:
• Experience with Kotlin Multiplatform (KMP).
• Familiarity with Android NDK and C++ integrations.
• Strong eye for mobile UI/UX and Material Design 3 guidelines.`
  },

  // 10. Cybersecurity Analyst
  {
    id: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    roleHint: 'Senior Cybersecurity Analyst (SOC, Threat Hunting & Incident Response)',
    category: 'Security & QA',
    experienceLevel: '4+ Years',
    companyName: 'Guardian Cyber Defense',
    jobTitle: 'Senior Cybersecurity Analyst - SOC & Incident Response',
    keySkills: ['SIEM (Splunk, Sentinel)', 'EDR (CrowdStrike)', 'Incident Response', 'Threat Hunting', 'Vulnerability Assessment (Nessus)', 'Wireshark', 'MITRE ATT&CK', 'Network Security', 'Python / Bash', 'NIST / ISO 27001'],
    jobDescriptionText: `Job Title: Senior Cybersecurity Analyst - SOC & Incident Response
Company: Guardian Cyber Defense
Location: Washington, DC / Remote

About Guardian Cyber:
Guardian Cyber delivers mission-critical cyber defense, threat intelligence, and security operations center (SOC) monitoring for enterprise and federal clients.

Role Summary:
We are looking for a skilled Cybersecurity Analyst (4+ years) to monitor, triage, investigate, and remediate cybersecurity threats, lead incident response workflows, and conduct proactive threat hunting operations.

Core Responsibilities:
• Monitor, analyze, and investigate security alerts and telemetry across enterprise networks, endpoints, and cloud environments using SIEM (Splunk, Microsoft Sentinel).
• Execute rapid incident response procedures for confirmed security incidents (containment, eradication, post-incident root cause analysis).
• Perform threat hunting exercises utilizing the MITRE ATT&CK framework to detect sophisticated adversary techniques.
• Deploy and tune Endpoint Detection and Response (EDR) solutions (CrowdStrike Falcon, SentinelOne, Defender for Endpoint).
• Conduct routine vulnerability scans using Nessus or Qualys, prioritize patching, and track remediation with IT teams.
• Analyze malicious artifacts, phishing campaigns, and network traffic captures using Wireshark and sandbox tools.
• Automate repetitive SOC analysis and alert triage workflows using Python and Bash scripting.

Required Qualifications & Skills:
• 4+ years of professional experience in Cybersecurity, Security Operations Center (SOC Tier 2/3), or Incident Response.
• Strong practical experience querying and analyzing security logs within SIEM platforms (Splunk SPL, Microsoft Sentinel KQL).
• Hands-on proficiency with EDR platforms (CrowdStrike, SentinelOne) and endpoint forensic triage.
• Deep understanding of TCP/IP networking, packet analysis (Wireshark), firewalls, IDS/IPS, and DNS security.
• Practical understanding of cyber threat tactics, techniques, and procedures (TTPs) using the MITRE ATT&CK matrix.
• Security certifications such as CompTIA Security+, CySA+, CEH, GIAC (GCIH/GCFA), or CISSP.

Nice to Have / Bonus:
• Experience with Cloud Security Posture Management (AWS GuardDuty, GCP Security Command Center).
• Experience with SOAR automation tools (Cortex XSOAR, Splunk Phantom).`
  },

  // 11. Existing Full Stack Role (Preserved)
  {
    id: 'fullstack-fintech',
    title: 'Full Stack Software Engineer',
    roleHint: 'Senior Full Stack Engineer (FinTech, React & Node.js)',
    category: 'Backend & Cloud',
    experienceLevel: '5+ Years',
    companyName: 'NovaPay Financial Technologies',
    jobTitle: 'Senior Full Stack Engineer - Payment Infrastructure',
    keySkills: ['TypeScript', 'React 18+', 'Node.js', 'PostgreSQL', 'AWS (ECS, S3, RDS)', 'Kafka / SQS', 'Docker', 'REST / GraphQL', 'FinTech / PCI-DSS'],
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

  // 12. Existing DevOps / SRE Role (Preserved)
  {
    id: 'devops-cloud',
    title: 'Cloud DevOps / SRE Engineer',
    roleHint: 'Staff Site Reliability Engineer (Global Distributed Systems)',
    category: 'Backend & Cloud',
    experienceLevel: '8+ Years',
    companyName: 'Orbit Global Networks',
    jobTitle: 'Staff Site Reliability Engineer - Global Edge Infrastructure',
    keySkills: ['Kubernetes (EKS)', 'Terraform', 'AWS / GCP', 'ArgoCD / GitOps', 'Prometheus & Grafana', 'OpenTelemetry', 'Go / Python', 'Linux Tuning', 'Incident Management'],
    jobDescriptionText: `Job Title: Staff Site Reliability Engineer - Global Edge Infrastructure
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

  // 13. Existing Data Analyst Role (Preserved)
  {
    id: 'data-analyst',
    title: 'Data Analyst & Analytics Engineer',
    roleHint: 'Senior Analytics Engineer & Data Modeler (dbt & Modern Data Stack)',
    category: 'Data & AI',
    experienceLevel: '4+ Years',
    companyName: 'Elevate Commerce',
    jobTitle: 'Senior Analytics Engineer & Dimensional Data Modeler',
    keySkills: ['SQL (Advanced)', 'dbt (Core / Cloud)', 'Snowflake / BigQuery', 'Python', 'Airflow / Dagster', 'Dimensional Modeling (Kimball)', 'Tableau / BI', 'Data Contracts'],
    jobDescriptionText: `Job Title: Senior Analytics Engineer & Dimensional Data Modeler
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
