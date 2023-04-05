# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

Assumptions:

- The facilities can set up their own custom ids while onboarding agents. And they have to pass this id to our system by calling a method created by us.
- One agent is assigned to only one facility at a time.
- We don't have to keep the historical data for what id was assigned to which agent by a facility.

## Ticket 1 - Update Database to add a new column to store new custom id provided by facilities

Requirements:

- Add a new column in Agents table to store current custom id assigned to him.

Acceptance Criteria:

- A new column added to Agents table to store current custom id.
- Migrating existing data and adding null to this column for all the existing rows.
- No existing functionality is affected.

Time estimate:

- 1 day

Implementation Details:

- Add a new column "customId" to the Agents table.
- Create a migration file for this change
- Run the migration on the DB

## Ticket 2 - Add support for saving facility's custom id in our system.

Requirement:

- We need to implement a function by which the facilities can update agent's custom id in our system.

Acceptance Criteria:

- A new function which is called with agent id from our internal database and the custom id provided by facilities is saved in our DB.
- Unit tests

Time estimate:

- 1 day

Implementation Details:

- Create a function `addIdForStaff` called with agent id from our internal database and the custom id provided by facilities
- This will update our Agent tabel with the custom id

## Ticket 3 - Update the report with custom id for agents provided by facilities

Requirement:

- We need to update the function `getShiftsByFacility` to also include agent's custom id in the metadata.
- We need to update the function `generateReport` to generate the report custom id of agents instead of the internal id

Acceptance Criteria:

- `getShiftsByFacility` function to also include agent's custom id in the metadata.
- `generateReport` function to include custom id of agents in the generated report.
- Unit tests

Time estimate:

- 2 days

Implementation Details:

- Update the logic to fetch all agent's custom ids from DB and add it in the metadata returned by the function.
- Update the logic of `getShiftsByFacility` such as to include agents custom id instead of intrenal id.
- Write unit tests.
