# احترف ببساطة مع دكتورة شيماء — SmartTech Learning Platform
Comprehensive Arabic RTL Educational SaaS, Interactive Excel Lab, Corporate B2B & LMS Platform

> **Vision**: Deliver a unified Arabic-first educational SaaS platform powered by SmartTech Training Center and Dr. Shaymaa Agamy. Seamlessly connects individual learners, corporate clients, HR managers, and platform administrators with hands-on practice, real photographic proof, and enterprise-grade course delivery.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural and UX choices have been aligned based on user clarification:
> - **Top Bar Interactive Role Switcher**: A professional preview switcher in the header enables instant seamless switching between **Guest / Visitor**, **Individual Student**, **Corporate HR Manager**, and **Platform Admin** with real isolated state across each view.
> - **Interactive Excel Lab Engine**: Prioritized full hands-on spreadsheet grid with cell coordinates, dynamic formula bar, real formula execution (`SUM`, `AVERAGE`, `MIN`, `MAX`, `COUNT`, `IF`, `AND`, `OR`, `COUNTIF`, `SUMIF`, `SUMIFS`, `VLOOKUP`, `XLOOKUP`), automated challenge grading, hints, and instant XP awards.
> - **Authentic Photography & Privacy**: All verified ceremony and classroom photographs uploaded by SmartTech will be published in the Student Success gallery, Hero section, and About pages with contextual Arabic captions and certification metadata.

---

## 1. Overview & Core Concept

- **What It Does**: A complete LMS and educational SaaS web application with a high-conversion Arabic RTL public portal, personalized student learning dashboard, embedded course player, live browser-based Excel Lab, corporate HR employee & seat management system, and comprehensive administrative back-office.
- **Target Personas**:
  1. *Individual Students*: Aspiring digital workers and data analysts progressing from fundamental computer literacy to advanced Excel, SQL, Python, and Data Science.
  2. *Corporate Learners & HR Admins*: Organizations upskilling their workforce with trackable seats, employee rosters, deadlines, and corporate certificates.
  3. *SmartTech Administrators & Instructors*: Central management of curriculums, video metadata, student enrollments, corporate contracts, XP rules, and ERP/payment connectors.
- **Brand Palette & Identity**:
  - Primary SmartTech Red: `#C62828` / Dark Crimson `#991B1B`
  - Onyx Black: `#171717` / Deep Charcoal `#1F2937`
  - Crisp Canvas: `#FFFFFF` / Soft Neutral Light Slate `#F8FAFC`
  - Arabic Typography: Clean Arabic sans hierarchy (`IBM Plex Sans Arabic` / `Cairo`) with correct RTL layout, preserving LTR for spreadsheet formulas, SQL code, and tabular numerals.

---

## 2. Photographic Asset Inventory & Mapping

| Asset ID | File Path | Content & Aspect Ratio | Placement & Role |
| :--- | :--- | :--- | :--- |
| **P-1 (Hero Portrait)** | `/public/assets/aistudio/IMG_7351_f456e96d.jpg` | Close high-res portrait of Dr. Shaymaa (white blazer, black hijab) in front of white flowers (3:4) | **Homepage Hero Section & Instructor Profile Card** |
| **P-2 (Full-Length)** | `/public/assets/aistudio/IMG_7355_e4d86075.jpg` | Full-length elegant portrait of Dr. Shaymaa with carved backdrop (3:4) | **About Dr. Shaymaa Page & Teaching Philosophy Section** |
| **P-3 (Center Banner)** | `/public/assets/aistudio/507969552_1133338408840702_2352352951463986138_n_31c3f353.jpg` | Dr. Shaymaa beside official SmartTech banner (Certiport, Microsoft, Adobe, MOS, ICDL) (3:4) | **About SmartTech Center & Accreditation Credibility Section** |
| **P-4 (Graduation Hall)** | `/public/assets/aistudio/486411051_1066762998831577_1593271358001561193_n_8b48cc45.jpg` | Wide graduation celebration hall with students holding certificates (16:9) | **Student Success Banner & Achievement Gallery Primary Showcase** |
| **P-5 (Python Certificate)**| `/public/assets/aistudio/507869423_1133338172174059_8814530029949084288_n_f9081bce.jpg` | Dr. Shaymaa presenting SmartTech Certificate (Python & C++) to graduate student (3:4) | **Course Completion & Certification Trust Proof** |
| **P-6 (Adobe Certificate)** | `/public/assets/aistudio/507861957_1133338248840718_7586737275453393193_n_00c21119.jpg` | Dr. Shaymaa presenting Adobe Certified Professional certificate to student (3:4) | **Professional Tracks & Career Outcomes Section** |
| **P-7 (Kids Diploma)** | `/public/assets/aistudio/507748658_1133338292174047_64313610964866830_n_234da75b.jpg` | Dr. Shaymaa celebrating with young student holding Smart Kids diploma (3:4) | **Community Impact & Foundations Gallery** |
| **P-8 (PC Lab Session)** | `/public/assets/aistudio/484815185_9391856467602007_8810742352411664420_n_b044141b.jpg` | Interactive computer lab selfie with trainees smiling at workstations (4:3) | **Interactive Learning & Hands-On Methodology Section** |
| **P-9 (Trainees Group)** | `/public/assets/aistudio/484809532_9391855087602145_7686767102119376524_n_22d0a726.jpg` | Trainees and instructors together at SmartTech Center (4:3) | **Corporate & Adult Professional Training Showcase** |

---

## 3. System Architecture & Component Hierarchy

```
┌────────────────────────────────────────────────────────────────────────┐
│                   Top Navigation & Role Switcher Bar                   │
│   [SmartTech Brand]   [المسارات] [الدورات] [معمل إكسل] [للشركات]   [ابدأ التعلم]   │
│   [ Role Switcher: 👤 طالب فردي | 🏢 مسؤول موارد بشرية | ⚙️ مدير المنصة ]  │
└────────────────────────────────────────────────────────────────────────┘
                                    │
       ┌────────────────────────────┼────────────────────────────┐
       ▼                            ▼                            ▼
┌──────────────────────┐   ┌──────────────────────┐   ┌──────────────────────┐
│    Public Portal     │   │   Student Portal     │   │  Corporate B2B SaaS  │
│  • Homepage Hero     │   │  • My Courses / LMS  │   │  • HR Dashboard      │
│  • Learning Paths    │   │  • Video Player      │   │  • Employees Roster  │
│  • Course Catalog    │   │  • Excel Lab Engine  │   │  • Seat Allocations  │
│  • Student Success   │   │  • Quizzes & Scoring │   │  • Contracts & Terms │
│  • About Dr. Shaymaa │   │  • XP & Badges       │   │  • Invoices & Status │
│  • SmartTech Center  │   │  • Reward Redemptions│   │  • Progress Reports  │
└──────────────────────┘   └──────────────────────┘   └──────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                     Platform Admin Management                          │
│  • Courses & Modules  • Users & RBAC  • Contracts & Orders             │
│  • XP Rules & Rewards • Certificates  • ERP / Payment / Video Adapters │
└────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   State, Storage & Integration Layer                   │
│  • LocalStorage / In-Memory Mock Store with Seed Database               │
│  • Formula Evaluator & Safe AST Calculator                             │
│  • Payment Gateway Adapter (Paymob / Fawry / Demo Mode)                │
│  • SmartTech ERP Sync Adapter (REST / Webhook / Audit Log)             │
│  • Video Delivery Adapter (Bunny Stream / Signed URLs / Demo Player)   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Key Interactive Features & Implementation Details

### A. Public Website & Learning Journey
- **5 Progressive Career Tracks**:
  1. *الموظف الرقمي (Digital Employee)*: Windows, Word, Excel fundamentals, PowerPoint, typing speed, Google Workspace, and AI productivity.
  2. *محترف إكسل (Excel Professional)*: Basic to Master levels, nested logic, `XLOOKUP`, `SUMIFS`, dynamic arrays, PivotTables, and automated reporting.
  3. *تحليل البيانات (Data Analysis)*: Power Query, data cleansing, transformation, DAX, Power BI dashboards.
  4. *قواعد البيانات والبرمجة (SQL & Python)*: Relational modeling, advanced queries, Pandas, data wrangling.
  5. *علم البيانات (Data Science)*: Applied statistics, predictive modeling, machine learning workflows.
- **Authentic Student Gallery**: Filtering by event type (Certiport, Adobe, ICDL, Smart Kids, Corporate cohorts).
- **Checkout & Enrollment**: Individual course enrollments with coupon application, loyalty points redemption, and instant course access.

### B. Interactive Excel Lab Engine
- **Full Spreadsheet Grid**: 12 columns $\times$ 25 rows with column headers (A–L), row numbers (1–25), active cell selection, and coordinate indicator (e.g. `B4`).
- **Interactive Formula Bar**: Live bidirectional editing between cell and formula bar with syntax indicator.
- **Safe Calculation Engine**: Real computation for arithmetic (`+`, `-`, `*`, `/`, `^`), ranges (`A1:A5`), and standard functions (`SUM`, `AVERAGE`, `COUNT`, `COUNTA`, `MIN`, `MAX`, `IF`, `AND`, `OR`, `COUNTIF`, `SUMIF`, `SUMIFS`, `VLOOKUP`, `XLOOKUP`).
- **Automated Grading & Hints**: Built-in practical exercises (e.g., calculate sales totals, apply conditional discounts, lookup employee data), step-by-step hints, verification button, and instant award of 50–150 XP.

### C. Gamification & Loyalty Ledgers
- **Auditable XP Ledger**: Tracks verified completions (lessons, exercises, quizzes). Prevents duplicate awards via event keys.
- **Reward Points & Discounts**: Points can be redeemed for genuine order discounts during checkout (e.g., 500 points = 100 EGP discount).
- **Interactive Badges**: "مبتدئ إكسل", "سيد الصيغ والوظائف", "محلل بيانات معتمد", "متحدي المشروعات".
- **Dynamic Leaderboard**: Monthly rankings with student rankings and XP stats.

### D. Corporate B2B Training SaaS
- **Multi-Tenant HR Dashboard**: Overview of purchased seats, active learners, completed modules, and upcoming deadlines.
- **Seat Allocation & Employee Management**: Add individual employees or batch import via CSV format, assign courses, track progress per department.
- **Contracts & Plans**: Manage Annual/Monthly corporate subscriptions with clear seat quotas, extra seat order requests, contract status (`active`, `pending_renewal`), and downloadable corporate training reports.

### E. Integration Adapters & Safe Configuration
- **Payment Provider Adapter**: Clean abstraction supporting Egypt-supported gateways (Paymob / Fawry) with server-side validation workflow, signed webhook verification, and an active sandbox demo mode.
- **SmartTech ERP Sync Adapter**: Ready interface for student synchronization, external ID mappings, conflict detection, and audit logs with explicit DEMO MODE indicator.
- **Video Delivery Adapter**: Player abstraction for Bunny Stream and Cloudflare Stream with signed URL token generation architecture and responsive video player.

---

## 5. Verification & Testing Strategy

- **RTL & Typography Testing**: Verify Arabic text flow, alignment, and readable LTR code/formula rendering.
- **Excel Lab Math Accuracy**: Unit tests for formula parser across simple sums, multi-criteria conditionals (`SUMIFS`), and exact lookups (`XLOOKUP`).
- **Role Isolation**: Verify student cannot see admin panels, corporate HR only sees their own company's employees and seats.
- **End-to-End User Journey**: From course discovery $\to$ enrollment $\to$ video lesson $\to$ spreadsheet practice $\to$ quiz $\to$ certificate generation and verification.
- **Compilation & Linting**: Zero syntax errors, proper TypeScript types across all models, and responsive mobile/desktop layout.
