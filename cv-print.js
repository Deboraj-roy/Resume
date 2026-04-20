/* ============================================================
   cv-print.js  —  Single source of truth for all CV content.
   Defines window.CV (consumed by index.html renderer) and
   window.generatePrintCV (called by the print FAB button).
============================================================ */

(function () {
  'use strict';

  /* ============================================================
     CV DATA — edit content ONLY here.
     index.html renders the visual portfolio from this object.
     buildPrintDoc() renders the LaTeX-style print CV from it.
  ============================================================ */
  window.CV = {

    name:  'Deboraj Roy',
    title: 'Software Engineer · ASP.NET Core & Enterprise Systems',

    contact: [
      { label: 'deborajroy.in@gmail.com',        href: 'mailto:deborajroy.in@gmail.com' },
      { label: '+880 1708 119559',                href: 'tel:+8801708119559' },
      { label: 'github.com/Deboraj-roy',          href: 'https://github.com/Deboraj-roy' },
      { label: 'linkedin.com/in/deboraj-roy',     href: 'https://linkedin.com/in/deboraj-roy' },
      { label: 'codeforces.com/profile/DEBORAJ',  href: 'https://codeforces.com/profile/DEBORAJ' },
      { label: 'deboraj.me',                      href: 'https://deboraj.me' },
    ],

    summary: 'Software engineer with 2+ years of experience designing and delivering enterprise-grade ERP, distribution, and business systems. Proven track record shipping production software to 10+ clients across manufacturing, sales, inventory, and service domains. Passionate about clean architecture, SQL performance, and scalable multi-tenant systems. Seeking a Senior Software Engineer role where I can drive technical strategy and mentor teams.',

    skills: [
      { label: 'Languages & Frameworks', value: 'C#, .NET 8, ASP.NET Core MVC, ASP.NET Core Web API, Entity Framework Core, LINQ' },
      { label: 'Frontend',               value: 'Angular, TypeScript, HTML5, CSS3, JavaScript, RDLC Reports' },
      { label: 'Databases',              value: 'SQL Server 2019, Stored Procedures, Triggers, Query Optimisation, MySQL, Oracle (basic)' },
      { label: 'Architecture',           value: 'ERP Systems, Microservices, REST APIs, JWT / OAuth2, Multi-tenant Architecture, Clean Architecture, ACID Transactions' },
      { label: 'Cloud & DevOps',         value: 'Docker, AWS (EC2, S3, Solutions Architect), Azure (familiar), cPanel, Linux, CI/CD basics' },
      { label: 'Tools & Testing',        value: 'Visual Studio, SSMS, Git, TortoiseGit, Docker, xUnit, NUnit, Sublime Text' },
    ],

    experience: [
      {
        title:    'Software Engineer',
        org:      'PlayOn 24',
        location: 'Dhaka, Bangladesh',
        dates:    'Oct 2023 – Present',
        stack:    'ASP.NET Core · C# · SQL Server · Angular · RDLC · Docker · REST APIs',
        bullets: [
          'Designed and built enterprise ERP systems covering sales, inventory, manufacturing, distribution, and service operations — delivered to 10+ clients with tailored configurations per business unit.',
          'Developed scalable multi-branch, multi-user architecture with a structured workflow engine: Order Request → Approval → Department Processing → Final Confirmation.',
          'Engineered end-to-end manufacturing lifecycle: Bill of Materials (BOM), raw material import, semi-finished goods (SFG) processing, QC verification, final assembly, packaging, and delivery tracking.',
          'Built multi-level distribution module (Dealer → Retailer → Distributor → ASM → TSO) with IMEI-based product tracking and real-time inventory synchronisation.',
          'Implemented service management: product intake, technician workflow, parts tracking, delivery documentation, customer SMS notifications, and payment processing.',
          'Built RDLC reporting suite (daily/monthly/yearly sales, purchase, invoice, returns, service); interactive dashboards for branch-wise performance, top products, and profit analytics.',
          'Optimised SQL Server performance via stored procedure refactoring, indexing strategies, efficient triggers, and ACID-compliant transaction handling.',
          'Designed modular architecture supporting feature-level customisation per client, role-based access control, and admin-configurable system behaviour.',
        ],
        tags: ['ASP.NET Core','C#','SQL Server','Angular','RDLC','ERP','Multi-tenant','Docker','REST API'],
      },
      {
        title:    'Server Engineer',
        org:      'Bengal Software',
        location: 'Bashundhara, Dhaka',
        dates:    'Aug 2022 – May 2023',
        stack:    'Laravel · MERN · cPanel · AWS S3 · EC2 · Linux',
        bullets: [
          'Deployed and managed Laravel and MERN stack applications across production Linux hosting environments.',
          'Handled mail configuration, cPanel management, database management, website backup, and deployment environment setup.',
          'Integrated AWS S3 storage, managed EC2 instances, configured auto-scaling groups, maintained backup systems, and set up VPN infrastructure.',
        ],
        tags: ['cPanel','Linux','AWS S3','EC2','Laravel','MERN','VPN','Auto-scaling'],
      },
    ],

    /* ----------------------------------------------------------
       ENTERPRISE PROJECTS — shipped client production systems.
       Labelled clearly as professional work (no public repo).
       ATS guidance: keyword-dense bullets, role clarity, tech stack.
    ---------------------------------------------------------- */
    enterpriseProjects: [
      {
        title:    'Deens Mobile — POS & Enterprise ERP',
        context:  'PlayOn 24 · Client Production System · ASP.NET Core, C#, SQL Server, Angular, RDLC',
        bullets: [
          'Built a multi-branch POS and ERP system supporting bulk purchase processing, real-time inventory management, and accurate stock synchronisation across branches.',
          'Designed multi-user sales workflow engine: Order → Approval → Checkout → Final Sale, with department-level role assignments and permission controls.',
          'Implemented IMEI-based product tracking, quantity-based sales logic, and admin-controlled system module toggling per client configuration.',
          'Developed RDLC reporting for daily, monthly, and yearly sales, profit analytics, and branch performance dashboards.',
        ],
        tags: ['ASP.NET Core','POS','ERP','IMEI Tracking','RDLC','Multi-branch','SQL Server','Angular'],
      },
      {
        title:    'Mango Mobiles — Sales & Distribution Platform',
        context:  'PlayOn 24 · Client Production System · ASP.NET Core, C#, SQL Server, Angular',
        bullets: [
          'Delivered an enterprise sales and distribution system for mobile and accessories with structured approval-based order workflow and multi-client deployment.',
          'Designed multi-level distribution chain (Dealer → Retailer → Distributor → ASM → TSO) with sales tracking and performance monitoring at each tier.',
          'Built an accounting module with optional Angular-based microservice integration, enabling modular feature rollout per client.',
          'Customised business workflows for multiple client organisations, maintaining a single maintainable codebase through modular architecture.',
        ],
        tags: ['ASP.NET Core','Distribution ERP','Multi-level Sales','Accounting Module','Angular','SQL Server'],
      },
      {
        title:    'ERP Sale Extra — Manufacturing & Warehouse System',
        context:  'PlayOn 24 · Client Production System · ASP.NET Core, C#, SQL Server, Angular, RDLC',
        bullets: [
          'Built an end-to-end ERP for mobile manufacturing covering Bill of Materials (BOM), raw material import, semi-finished goods (SFG), Quality Control (QC), assembly, and packaging.',
          'Designed the full production pipeline: Warehouse → Production → QC → Assembly → Delivery, with complete component and stage traceability.',
          'Implemented warehouse-to-production workflows ensuring full audit trail and stock accuracy across all manufacturing stages.',
          'Built dashboards with real-time sales analytics, profit trend tracking, and branch performance reports using RDLC.',
        ],
        tags: ['ERP','Manufacturing','BOM','WMS','QC','SFG','RDLC','Traceability','SQL Server'],
      },
    ],

    /* ----------------------------------------------------------
       OPEN SOURCE / PERSONAL PROJECTS
    ---------------------------------------------------------- */
    projects: [
      {
        title: 'ASP.NET Core Microservices (.NET 8)',
        links: [
          { label: 'GitHub',    href: 'https://github.com/Deboraj-roy/ASP.NET-Core-Microservices-NET-8' },
          { label: 'Live Demo', href: 'https://orange-cherry-fa56.mrouf7353.workers.dev/' },
        ],
        bullets: [
          'Microservices-style demo with separate API and worker services, deployed via Cloudflare Workers with CI-friendly Docker images. Demonstrates clean service boundaries, container orchestration, and edge deployment.',
        ],
        tags: ['.NET 8','Microservices','Docker','Cloudflare Workers'],
      },
      {
        title: 'Library Management System — SPA',
        links: [
          { label: 'GitHub',    href: 'http://bit.ly/4pXy3ZP' },
          { label: 'Live Demo', href: 'https://bit.ly/48hUFOq' },
        ],
        bullets: [
          'Full-stack SPA with ASP.NET Core Web API backend and Angular frontend. Implements JWT authentication and dynamic role-based access control (RBAC) with full database modelling.',
        ],
        tags: ['ASP.NET Core','Angular','JWT','RBAC','SQL Server'],
      },
      {
        title: 'eTicket — eCommerce Platform',
        links: [
          { label: 'GitHub',    href: 'https://github.com/Deboraj-roy/Complete-ecommerce-ASP.NET-MVC-eTicket-Application' },
          { label: 'Live Demo', href: 'http://eticket.runasp.net/' },
        ],
        bullets: [
          'Full eCommerce web app with product catalog, cart, checkout, and payment flow using ASP.NET Core MVC (.NET 7). Includes backend features, payment integration, and cloud deployment.',
        ],
        tags: ['ASP.NET Core MVC','.NET 7','Entity Framework','eCommerce'],
      },
    ],

    education: [
      {
        degree: 'BSc in Computer Science & Engineering',
        school: 'American International University-Bangladesh (AIUB)',
        dates:  'Jan 2019 – Dec 2022',
        detail: 'CGPA: 3.65 / 4.00',
      },
      {
        degree: 'Higher Secondary Certificate (HSC)',
        school: 'Sunflower School & College, Saidpur, Nilphamari',
        dates:  'Mar 2015 – Dec 2016',
        detail: 'GPA: 4.67 / 5.00',
      },
    ],

    certifications: [
      { name: 'Full Stack ASP.NET Core MVC Web Development',      issuer: 'DevSkill', dates: 'Sep 2023 – Apr 2024', href: '' },
      { name: 'Professional Programming with C#',                  issuer: 'DevSkill', dates: 'Jan – Apr 2023',      href: 'https://devskill.com/Certificate/567/wgijyqmbpvb' },
      { name: 'ASP.NET Core MVC — Build a Complete eCommerce App', issuer: 'Udemy',    dates: 'Jan 2024',            href: 'https://www.udemy.com/certificate/UC-0bf7939d-d0a8-4b9f-b6aa-670b692b9cc8/' },
      { name: 'AWS Services for Solutions Architect Associate',     issuer: 'Udemy',    dates: 'Nov 2022',            href: 'https://www.udemy.com/certificate/UC-2809698b-6731-4a23-a920-4c19bfb1c4e8/' },
    ],

    additional: {
      languages:   'English — Full Professional Proficiency\nBengali — Native',
      interests:   'Photography · Travelling · Chess · Competitive Programming',
      achievement: "Duke of Edinburgh's International Award — Gold Standard",
    },
  };


  /* ============================================================
     PRINT ENGINE
     Builds a standalone A4 HTML document for the print window.
     Reads exclusively from window.CV above.
     Optimized for PDF printing with professional typography.
  ============================================================ */

  function h(tag, attrs, ...children) {
    const el = document.createElement(tag);
    if (attrs) {
      Object.entries(attrs).forEach(([k, v]) => {
        if (v !== null && v !== undefined && v !== false) {
          el.setAttribute(k, v);
        }
      });
    }
    children.forEach(c => {
      if (c == null) return;
      el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return el;
  }

  function secTitle(text) {
    return h('h2', { class: 'p-section-title' }, text);
  }

  /* Renders a standard entry block (experience, enterprise project, open-source project) */
  function renderEntry(body, opts) {
    const entry = h('article', { class: 'p-entry' });

    /* Title row with optional date on the right */
    const row = h('div', { class: 'p-entry-row' });
    const titleEl = h('h3', { class: 'p-entry-title' }, opts.title);
    row.appendChild(titleEl);
    if (opts.date) {
      const dateEl = h('span', { class: 'p-entry-date' }, opts.date);
      row.appendChild(dateEl);
    }
    entry.appendChild(row);

    /* Sub-line: org / context / links */
    if (opts.sub) {
      const sub = h('p', { class: 'p-entry-org' }, opts.sub);
      entry.appendChild(sub);
    }

    /* Tech stack line */
    if (opts.stack) {
      entry.appendChild(h('p', { class: 'p-entry-stack' }, 'Tech: ' + opts.stack));
    }

    /* Link line for open-source projects */
    if (opts.links && opts.links.length) {
      const linkLine = h('div', { class: 'p-proj-link' });
      opts.links.forEach((l, i) => {
        if (i > 0) linkLine.appendChild(document.createTextNode(' · '));
        const link = h('a', { href: l.href, target: '_blank', rel: 'noopener noreferrer' }, l.label + ': ' + l.href);
        linkLine.appendChild(link);
      });
      entry.appendChild(linkLine);
    }

    /* Bullets */
    if (opts.bullets && opts.bullets.length) {
      const ul = h('ul');
      opts.bullets.forEach(b => ul.appendChild(h('li', {}, b)));
      entry.appendChild(ul);
    }

    body.appendChild(entry);
  }

  function buildPrintDoc(cv) {
    const doc = document.implementation.createHTMLDocument('CV');

    const scriptSrc = document.currentScript
      ? document.currentScript.src
      : (document.querySelector('script[src*="cv-print"]') || {}).src || '';
    const base = scriptSrc.substring(0, scriptSrc.lastIndexOf('/') + 1);

    /* Meta tags */
    doc.head.appendChild(h('meta', { charset: 'UTF-8' }));
    doc.head.appendChild(h('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }));
    doc.head.appendChild(h('title', {}, cv.name + ' — Professional CV'));

    /* Professional fonts */
    doc.head.appendChild(h('link', {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    }));
    doc.head.appendChild(h('link', {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossorigin: 'anonymous'
    }));
    doc.head.appendChild(h('link', {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600&family=Roboto+Mono:wght@400;600&display=swap',
    }));

    /* Print CSS */
    doc.head.appendChild(h('link', { rel: 'stylesheet', href: base + 'print.css' }));

    /* Inline print optimization styles */
    const printStyles = doc.createElement('style');
    printStyles.textContent = `
      @media print {
        body { orphans: 4; widows: 4; }
        .p-entry, .p-edu, .p-cert, .p-section-note, .p-two-col { page-break-inside: avoid; }
      }
      @page {
        size: A4;
        margin: 1.8cm 2cm 1.8cm 2cm;
        orphans: 4;
        widows: 4;
      }
    `;
    doc.head.appendChild(printStyles);

    const body = doc.body;

    /* ---- HEADER ---- */
    const hdr = h('header', { class: 'p-header' });
    hdr.appendChild(h('h1', { class: 'p-name' }, cv.name));
    hdr.appendChild(h('p', { class: 'p-title' }, cv.title));
    
    const contactLine = h('div', { class: 'p-contact', role: 'contentinfo' });
    cv.contact.forEach((c, i) => {
      const sp = h('span');
      const link = h('a', { href: c.href, title: c.label }, c.label);
      sp.appendChild(link);
      contactLine.appendChild(sp);
    });
    hdr.appendChild(contactLine);
    body.appendChild(hdr);

    /* ---- SUMMARY ---- */
    body.appendChild(secTitle('Summary'));
    body.appendChild(h('p', { class: 'p-summary' }, cv.summary));

    /* ---- SKILLS ---- */
    body.appendChild(secTitle('Technical Skills'));
    const tbl = h('table', { class: 'p-skills-table' });
    cv.skills.forEach(s => {
      const tr = h('tr');
      tr.appendChild(h('td', {}, s.label));
      tr.appendChild(h('td', {}, s.value));
      tbl.appendChild(tr);
    });
    body.appendChild(tbl);

    /* ---- EXPERIENCE ---- */
    body.appendChild(secTitle('Professional Experience'));
    cv.experience.forEach(exp => {
      renderEntry(body, {
        title:   exp.title,
        date:    exp.dates,
        sub:     exp.org + ' · ' + exp.location,
        stack:   exp.stack,
        bullets: exp.bullets,
      });
    });

    /* ---- ENTERPRISE PROJECTS ---- */
    body.appendChild(secTitle('Selected Enterprise Projects'));

    /* Section note — ATS-safe plain text, explains NDA context professionally */
    const note = h('p', { class: 'p-section-note' },
      'The following systems were designed, developed, and delivered as part of professional employment at PlayOn 24. Source code is proprietary and under client NDA.'
    );
    body.appendChild(note);

    cv.enterpriseProjects.forEach(proj => {
      renderEntry(body, {
        title:   proj.title,
        sub:     proj.context,
        bullets: proj.bullets,
      });
    });

    /* ---- OPEN SOURCE PROJECTS ---- */
    body.appendChild(secTitle('Open Source & Personal Projects'));
    cv.projects.forEach(proj => {
      renderEntry(body, {
        title:   proj.title,
        links:   proj.links,
        bullets: proj.bullets,
      });
    });

    /* ---- EDUCATION ---- */
    body.appendChild(secTitle('Education'));
    cv.education.forEach(edu => {
      const entry = h('article', { class: 'p-edu' });
      const row = h('div', { class: 'p-entry-row' });
      row.appendChild(h('h3', { class: 'p-entry-title' }, edu.degree));
      row.appendChild(h('span', { class: 'p-entry-date' }, edu.dates));
      entry.appendChild(row);
      entry.appendChild(h('p', { class: 'p-entry-org' },
        edu.school + (edu.detail ? ' · ' + edu.detail : '')
      ));
      body.appendChild(entry);
    });

    /* ---- CERTIFICATIONS ---- */
    body.appendChild(secTitle('Certifications'));
    cv.certifications.forEach(cert => {
      const row = h('div', { class: 'p-cert' });
      const left = h('div');
      const nameEl = cert.href
        ? h('a', { href: cert.href, target: '_blank', rel: 'noopener noreferrer', class: 'p-cert-name' }, cert.name)
        : h('span', { class: 'p-cert-name' }, cert.name);
      left.appendChild(nameEl);
      left.appendChild(h('span', { class: 'p-cert-issuer' }, ' — ' + cert.issuer));
      row.appendChild(left);
      row.appendChild(h('span', { class: 'p-cert-date' }, cert.dates));
      body.appendChild(row);
    });

    /* ---- ADDITIONAL ---- */
    body.appendChild(secTitle('Additional'));
    const twoCol = h('div', { class: 'p-two-col' });

    const langDiv = h('div');
    langDiv.appendChild(h('div', { class: 'p-mini-label' }, 'Languages'));
    const langVal = h('div', { class: 'p-mini-value' });
    langVal.innerHTML = cv.additional.languages.replace(/\n/g, '<br>');
    langDiv.appendChild(langVal);
    twoCol.appendChild(langDiv);

    const intDiv = h('div');
    intDiv.appendChild(h('div', { class: 'p-mini-label' }, 'Interests & Achievements'));
    const intVal = h('div', { class: 'p-mini-value' });
    intVal.innerHTML = cv.additional.interests + '<br><strong>' + cv.additional.achievement + '</strong>';
    intDiv.appendChild(intVal);
    twoCol.appendChild(intDiv);

    body.appendChild(twoCol);

    return doc;
  }

  /* ============================================================
     PUBLIC API
     Generates and opens a professional print preview window
  ============================================================ */
  window.generatePrintCV = function () {
    const printDoc = buildPrintDoc(window.CV);
    const printWindow = window.open('', '_blank', 'width=1000,height=800');
    if (!printWindow) {
      alert('Pop-ups are blocked. Please allow pop-ups for this site to open the print preview.');
      return;
    }

    printWindow.document.open();
    printWindow.document.write(
      '<!DOCTYPE html>\n' +
      printDoc.documentElement.outerHTML
    );
    printWindow.document.close();

    /* Trigger print dialog after content loads */
    printWindow.addEventListener('load', function() {
      setTimeout(function() {
        printWindow.focus();
        printWindow.print();
      }, 500);
    });
  };

})();
