---
title: "The Curious Case of the 404"
date: 2025-02-05
draft: false
categories: ["Digital"]
tags: ["web", "debugging", "mystery"]
summary: "A website that only goes down at midnight. Every night. Like clockwork. The client was convinced it was sabotage. The real culprit was far more ordinary—and far more embarrassing."
---

*Page Not Found.* Three words that have launched a thousand support tickets. But this was different. The site worked perfectly during business hours. Come midnight—*poof*. Gone. Until 6 AM, when it mysteriously reappeared.

The client had theories. A disgruntled former employee. A competitor. *Hackers.* They'd already changed their passwords twice and hired a "security consultant" who'd found nothing.

I found the problem in under an hour. A scheduled backup script. Running at 11:59 PM. Eating all the server memory. Crashing the site. Restarting at 6 AM when the cron job ran its daily cleanup.

No conspiracy. No malice. Just a script someone wrote at 2 AM five years ago and never looked at again. The case file is one paragraph. The lesson: *before you assume sabotage, check the cron jobs.*
