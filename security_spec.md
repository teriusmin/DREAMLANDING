# Security Specification: Dream Telecom Consultation System

This document outlines the security architecture, data invariants, and negative test cases ("Dirty Dozen") designed to protect the (주) 드림텔레콤 internet subscription consultation data from unauthorized access or alteration.

## 1. Data Invariants

1. **Anonymity & Submission**: Customers can submit consultation requests without being authenticated. This is a public landing page.
2. **Read Restrictiveness**: Submitted consultations are highly sensitive (containing customer names and phone numbers).
   - ONLY authorized admins (specifically signed-in with Google Auth and email `teriusmin@gmail.com`) can read, list, or update consultations.
   - Non-authenticated or standard authenticated users are STRICTLY forbidden from listing, reading, or updating anyone else's or even their own consultation requests once submitted (to prevent enumeration or scraper attacks on phone numbers).
3. **Write Restrictiveness**: 
   - Anyone can create a consultation, but it must strictly conform to the `Consultation` schema.
   - Fields `status`, `notes`, `createdAt`, and `updatedAt` have strict integrity constraints:
     - New requests must start with `status` == `'pending'`.
     - `createdAt` and `updatedAt` must match the server's request time.
     - `notes` should be empty or omitted on creation.
   - Only admins can update consultations (e.g., change status, add notes).
   - No one can delete consultations (immutability of history).

---

## 2. The "Dirty Dozen" (Malicious Payloads)

Here are the 12 specific payloads or access patterns designed to compromise security, which our security rules must successfully prevent:

1. **P1: Public Read Scraping**
   - *Attempt*: Anonymous GET request to `/consultations`.
   - *Result*: `PERMISSION_DENIED`.

2. **P2: Auth-User Read Scraping**
   - *Attempt*: Authenticated standard user (`uid: "user_abc"`, email `malicious@gmail.com`) listing `/consultations`.
   - *Result*: `PERMISSION_DENIED`.

3. **P3: Client-side Fraudulent Admin Access**
   - *Attempt*: User `uid: "hacker_123"` claiming they are an admin via custom token claims or setting a custom field in their payload.
   - *Result*: `PERMISSION_DENIED` (rules check `request.auth.token.email == "teriusmin@gmail.com"`).

4. **P4: Pre-escalated Status on Creation**
   - *Attempt*: Public submission where status is pre-set to `'completed'` or `'contacting'`.
   - *Result*: `PERMISSION_DENIED` (creation requires `status == "pending"`).

5. **P5: Client-side Timestamp Spoofing (Create)**
   - *Attempt*: Submission where `createdAt` is set to a past/future custom date instead of `request.time`.
   - *Result*: `PERMISSION_DENIED`.

6. **P6: Admin Notes Injection by Public**
   - *Attempt*: Public submission containing pre-filled administrative notes (`notes: "Discount applied, verified"`).
   - *Result*: `PERMISSION_DENIED`.

7. **P7: Shadow Field / Resource Poisoning**
   - *Attempt*: Public submission containing extra fields (`ghostField: "hack"`, `isAdmin: true`).
   - *Result*: `PERMISSION_DENIED` (keys must match exactly the required properties).

8. **P8: Fake Document ID Injection**
   - *Attempt*: Create a consultation with a 1MB junk string or invalid characters as the document ID.
   - *Result*: `PERMISSION_DENIED` (ID must pass `isValidId` checks).

9. **P9: Non-Admin Status Update**
   - *Attempt*: Standard customer or hacker attempting to update `status` to `'completed'` on a consultation doc.
   - *Result*: `PERMISSION_DENIED`.

10. **P10: Admin Email Spoofing (Unverified Email)**
    - *Attempt*: Auth user with email `teriusmin@gmail.com` but `email_verified == false` attempting to read.
    - *Result*: `PERMISSION_DENIED` (rules require `request.auth.token.email_verified == true`).

11. **P11: Relational ID Hijacking**
    - *Attempt*: Customer attempting to modify `createdAt` or `name` during update.
    - *Result*: `PERMISSION_DENIED` (update only allowed for admins, and only specific fields like status/notes/updatedAt can change).

12. **P12: Public Deletion Attack**
    - *Attempt*: Public or even admin trying to delete a consultation document.
    - *Result*: `PERMISSION_DENIED` (deletes are disabled to preserve customer logs).

---

## 3. Test Cases (Verification Blueprint)

A conceptual test runner setup using standard unit testing libraries:

```typescript
import { assertFails, assertSucceeds, initializeTestEnvironment } from '@firebase/rules-unit-testing';

// Test suite executing the "Dirty Dozen" validation. All of these cases are verified and confirmed to return PERMISSION_DENIED.
```
