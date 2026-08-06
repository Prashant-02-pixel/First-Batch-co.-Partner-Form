# Partner Connect Flow

Create a high-fidelity prototype for the First Batch partner onboarding experience.

REFERENCE WEBSITE:
https://www.firstbatch.in/partners

DETAILED FORM REFERENCE:
https://www.firstbatch.in/join-network

IMPORTANT:
This is NOT a redesign of the First Batch website.

The purpose of this prototype is only to improve and merge the existing partner onboarding forms into one seamless 2-step experience.

The prototype should visually match the existing First Batch website as closely as possible.

DESIGN SYSTEM

Study the existing First Batch website carefully and recreate its visual language.

Match the existing:

• Typography and font hierarchy
• Font sizes and weights
• Text colors
• Background colors
• Brand/accent colors
• Buttons
• Border radius
• Input fields
• Dropdowns
• Form styling
• Section spacing
• Page width
• Navigation/header
• Footer
• Cards
• Labels
• Icons
• Hover states
• Mobile responsiveness

Do NOT introduce a completely new visual style.

The final prototype should feel like this feature already exists inside the current First Batch website.

CORE UX IDEA

Currently, First Batch has two separate partner forms.

I want to combine them into ONE PAGE with a seamless 2-step onboarding experience.

The user should NOT be redirected to another webpage.

Flow:

Partner Landing Page
↓
Step 1 — Basic Details
↓
Save data
↓
Smooth same-page transition
↓
Step 2 — Partner Profile
↓
Submit
↓
Success State

The form container should remain in approximately the same position when transitioning between steps.

Use subtle smooth transitions rather than page reloads.

PROGRESS INDICATOR

At the top of the form show a simple progress indicator.

Initially:

STEP 1 OF 2
Basic Details

[Active Step 1] ━━━━━━━━━ [Step 2]

After continuing:

STEP 2 OF 2
Partner Profile

[Completed ✓] ━━━━━━━━━ [Active Step 2]

Keep this minimal and consistent with First Batch's design.

STEP 1 — BASIC DETAILS

Headline:

“Let's start with the basics.”

Supporting text:

“Tell us a little about yourself so we can understand how you could be part of the First Batch network.”

Keep Step 1 intentionally short.

Fields:

Partner Type *
Dropdown / selection cards.

Options should include:

• Food Technologist
• Food Scientist
• R&D / Product Development
• NPD Specialist
• Food Consultant
• Contract Manufacturer
• Ingredient Supplier
• Testing / Research Lab
• Packaging Partner
• Other

Full Name *

Company / Independent *

Options:
• Independent Professional
• Company / Organization

If Company / Organization is selected, show:

Company Name *

WhatsApp / Contact Number *

Include India country code (+91) by default but allow other country codes.

Email Address *

LinkedIn Profile

City *

State *

Do NOT ask these details again in Step 2.

STEP 1 CTA

Do NOT use a generic “Submit” button.

Primary CTA:

“Save & Continue →”

Under the button show subtle reassurance text:

“Your basic details will be saved before moving to the next step.”

IMPORTANT FUNCTIONAL BEHAVIOR:

When the user clicks “Save & Continue”:

Validate required fields.

Save Step 1 data.

Create a unique Partner ID.

Mark status as:

“Basic Details Completed”

Transition to Step 2 WITHOUT leaving the page.

Even if the user closes the website during Step 2, Step 1 data should remain captured.

For the prototype, simulate this behavior even if no production backend is connected yet.

TRANSITION STATE

After Step 1 is successfully saved, briefly show:

✓ Basic details saved

Then smoothly transition to Step 2.

Avoid loading a completely new page.

STEP 2 — PARTNER PROFILE

Headline:

“Tell us more about your work.”

Supporting copy:

“This helps us understand where your expertise fits within the First Batch network.”

Do NOT repeat:

• Name
• Phone
• Email
• LinkedIn
• Company
• City
• State

Those were already collected in Step 1.

DYNAMIC / CONDITIONAL FORM

Step 2 should dynamically change according to the Partner Type selected in Step 1.

This is important.

Do NOT show irrelevant questions to every partner.

===================================
A. FOOD TECHNOLOGIST / FOOD SCIENTIST / R&D / NPD / FOOD CONSULTANT

Show:

Current Designation

Years of Experience

Primary Expertise

Allow multiple selection where relevant.

Examples:

• Product Formulation
• New Product Development
• Recipe Development
• Ingredient Selection
• Sensory Evaluation
• Shelf-Life Improvement
• Process Optimization
• Scale-Up
• Cost Optimization
• Regulatory / FSSAI
• Quality
• Packaging Development

Food Categories You Have Worked With

Examples:

• Nutrition Bars
• Protein Bars
• Fiber Bars
• Energy Bars
• Chocolate
• Bakery
• Snacks
• Beverages
• Dairy
• Plant-Based Foods
• Functional Foods
• Nutraceutical Foods
• Other

Formulation Experience

Question:

“Have you independently developed or significantly contributed to a food formulation?”

Options:

• Yes
• No

If YES, show:

“Tell us briefly about one product you worked on.”

Use a textarea.

Scale-Up Experience

Options:

• Lab formulation only
• Pilot scale
• Commercial production
• All of the above

Availability / Engagement Type

• Freelance
• Part-time
• Project-based
• Consulting
• Open to long-term collaboration

Portfolio / Previous Work

Allow URL.

LinkedIn should NOT be asked again.

Website — Optional

Additional Information — Optional

===================================
B. CONTRACT MANUFACTURER

Show:

What products can you manufacture?

Multi-select categories:

• Fiber Bars
• Protein Bars
• Energy Bars
• Nutrition Bars
• Granola Bars
• Date Bars
• Nut Bars
• Chocolate Bars
• Chocolate-Coated Bars
• Functional Foods
• Other

Manufacturing Location

Certifications

Examples:

• FSSAI
• ISO
• HACCP
• GMP
• BRC
• Organic
• Other

Minimum Order Quantity (MOQ)

Allow:

[number] + [unit]

Units:

• Pieces
• Bars
• Boxes
• Kg
• Other

Monthly Production Capacity

Pilot / Small Batch Available?

• Yes
• No
• Depends on product

R&D / Formulation Support Available?

• Yes
• No

Can you source ingredients?

• Yes
• No
• Partially

Packaging Support

• Primary packaging
• Secondary packaging
• Custom packaging
• No packaging support

Private Label / Contract Manufacturing Available?

• Yes
• No

Website

Additional Information

===================================
C. INGREDIENT SUPPLIER

Show:

Ingredient Categories

Products / Ingredients Supplied

MOQ

Location

Regions Served

Certifications

Sample Availability

• Yes
• No

Typical Lead Time

Website

Additional Information

===================================
D. TESTING / RESEARCH LAB

Show:

Testing Capabilities

Accreditations / Certifications

Location

Food Categories Supported

Typical Turnaround Time

Sample Requirements

Shelf-Life Testing Available?

• Yes
• No

Nutritional Testing Available?

• Yes
• No

Microbiological Testing Available?

• Yes
• No

Website

Additional Information

===================================
E. PACKAGING PARTNER

Show:

Packaging Types

Materials Supported

Food Categories Served

MOQ

Custom Printing Available?

• Yes
• No

Prototype / Sample Available?

• Yes
• No

Typical Lead Time

Location

Website

Additional Information

STEP 2 CTA

Primary CTA:

“Submit Partner Profile →”

Secondary action:

“← Back to Basic Details”

If the user goes back to Step 1, previously entered information should remain populated.

Do NOT lose their Step 2 progress unnecessarily.

OPTIONAL COMPLETE-LATER FEATURE

Add a subtle secondary option:

“Complete this later”

Step 1 data has already been saved, so the partner should not feel forced to complete a long form immediately.

If selected, show:

“No worries — we've saved your basic details. Our team can follow up with you.”

SUCCESS STATE

After Step 2 submission, do NOT simply show “Form submitted.”

Create a polished confirmation state consistent with First Batch branding.

Show:

✓

“You're in!”

“Thanks for joining the First Batch network.”

Supporting copy:

“We've received your profile. Our team will review your details and reach out if there's a relevant opportunity to collaborate.”

Optional:

“Join the First Batch WhatsApp community”

This should NOT be a mandatory field in the onboarding form.

DATA / PROTOTYPE LOGIC

Structure the prototype as if each partner has one record.

Example data model:

Partner ID
Name
Partner Type
Phone
Email
LinkedIn
Company
City
State
Basic Form Completed
Detailed Form Started
Detailed Form Completed
Partner Status
Created At
Updated At

Step 1 should CREATE the partner record.

Step 2 should UPDATE the same partner record.

Do NOT create duplicate partner records.

RESPONSIVENESS

Make the prototype fully responsive.

Desktop:
Maintain the spacious First Batch website layout.

Tablet:
Reduce margins while maintaining hierarchy.

Mobile:
Use single-column fields.
Keep buttons large and easy to tap.
Ensure dropdowns and multi-select options work properly.

The mobile experience is especially important because many partners may open the link directly from LinkedIn on their phones.

PROTOTYPE INTERACTIONS

Make the prototype fully clickable.

I should be able to demonstrate:

Opening the Partner page.

Selecting “Food Technologist”.

Completing Step 1.

Clicking “Save & Continue”.

Seeing “Basic details saved”.

Transitioning to Step 2.

Seeing Food Technologist-specific questions.

Going back without losing information.

Completing Step 2.

Clicking “Submit Partner Profile”.

Seeing the success state.

Also demonstrate:

Selecting “Contract Manufacturer” in Step 1 should produce a DIFFERENT Step 2 containing manufacturing questions such as MOQ, capacity, certifications and pilot runs.

MOST IMPORTANT DESIGN REQUIREMENT

DO NOT redesign First Batch.

This prototype should answer one question:

“How would the existing First Batch website look and feel if its two separate partner forms were converted into one seamless, intelligent 2-step onboarding journey?”

Preserve the existing brand identity.

Focus the design effort on:

• Reduced friction
• Clear progress
• No repeated questions
• Immediate Step 1 data capture
• Conditional questions
• Smooth transitions
• Mobile-friendly onboarding
• Higher completion rate
• Professional but friendly partner experience

Build the first high-fidelity prototype accordingly.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c3b1b305-71cb-425a-b0ab-f30e1804843f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
