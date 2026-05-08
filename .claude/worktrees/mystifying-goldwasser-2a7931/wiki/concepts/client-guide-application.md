---
title: "Client Guide Application"
type: concept
tags: [concept, client-guide, com, word, access, template]
created: 2026-04-17
updated: 2026-04-17
sources: 2
---

# Client Guide Application

An internal Word-plus-Access application that produces customized client guides by merging plan data into a bookmark-driven Word template.

## Definition

Per `Client%20Guide%20Application.md.txt` and `Client%20Guide%20Application%20Update%20Instructions.md.txt`, the Client Guide Application is the toolchain used by [[com]] to generate a plan-specific Client Guide for each conversion. The Word template contains bookmarks for optional and alternative sections; an Access backend with tables `tbl_Services`, `tbl_Bookmarks`, and `tbl_Contacts` drives which bookmarks are kept or removed per plan.

## How It Works

1. Cover page is populated with plan names, case numbers, and the client logo
2. Bookmarks in the Word template are kept or deleted based on control values in the Access tables
3. Access queries `tbl_Services`, `tbl_Bookmarks`, and `tbl_Contacts` to resolve plan-specific content
4. Output is the final customized Client Guide

## Update Process

Per `Client%20Guide%20Application%20Update%20Instructions.md.txt`:

- **Word template updates** — show bookmarks, edit carefully, add static or dynamic content appropriately
- **Access application updates** — add bookmarks and controls, update backend tables, update forms in design mode

Editing bookmarks is delicate: breaking one propagates to every future guide generation.

## Why It Matters

The Client Guide is a core deliverable from [[com]] to the plan sponsor. It documents plan design and servicing model. A mis-configured bookmark produces a guide missing (or duplicating) critical plan provisions — embarrassing at best, a legal risk at worst.

## Related Concepts

- [[final-funds-and-pricing-reminder]] — adjacent COM communication tool
- [[onboarding-package]] — downstream package the guide may feed

## See Also

- [[com]]
- [[doc-ops]]
