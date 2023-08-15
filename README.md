# Mecho Credit Interview Challenge
At Mecho, we are eager to find talented, resourceful, and passionate engineers to help us build the future of automotive commerce and financial services. In light of this, we created a series of steps for us to know each other. One of these is a take home challenge, which will take a few hours to complete.

### Why a take-home challenge?
In-person coding interviews can be stressful and may hide your full potential. A take-home gives you a chance to work in a less stressful environment and showcase your talent.

### Our tech stack
As outlined in our job description, you will come across technologies which include a frontend framework (Angular) and a backend web framework (Serverless framework with Typescript and mongoose).

### Challenge Background
Mecho credit is born! .. (fictional). Mecho, a leading auto-commerce firm, planned a credit product for vehicle services. But a hiccup surfaced – the tech team hadn't built it yet! In a race against time, the tech marvel is lacking hands. Can you, the tech maestro, turn the tide? Help us implement an application (requirements below) for the data which is in the following format:

### Data Model
#### Customer
* `userEmail` (Customer email, unique)
* `balance` (The customers' remaining credit, >= 0)
* `createdAt` (Customer creation date)
* `updatedAt` (Customer update date)
#### Request
* `userEmail` (Customer Email)
* `amount` (Cost of service requested)
* `method` (Payment method. Possible values: ['cash', 'credit'])
* `type` (Possible values: ['inspection', 'servicing', 'repairs', 'maintenance'])
* `createdAt` (Request creation date)

Requests represent a customer requesting either an `inspection`, `servicing`, `repairs` or `maintenance` on their vehicle - a customer can make a request either with `cash` or `credit` but requests with `credit` method removes credits from the customer balance.

Cost of services (credits)
  * `inspection` => 2500
  * `servicing` => 4000
  * `repairs` => 10000
  * `maintenance` => 6000

Seed data files are provided:
  * [`customer.json`](./customer.json).
  * [`requests.json`](./requests.json).

### Requirements
At a high level, you need to create a web app for the customer to make requests as well as manage their customer details and requests, as well as create new requests.

The current balance of a customer is the amount remaining from all their `credit` requests for any type of service e.g `inspection`, `servicing`, `repairs` or `maintenance`. Customers can make `cash` requests while they still have credit but after the `credit` runs out, they would only make `cash` requests.

Please use the data files provided to seed the your datastore. No customer in the seed data has a negative balance. \
<b> 
We are mostly interested in the domain source code architecture, user interface design, clean typescript code, angular framework optimizations and tests - please use a minimal design of your choice, session storage as your datastore. Do not worry about including infrastructure as code, containerization and networking, ci/cd, SSR etc. \
No authentication or authorization functionality is expected in the submission. \
</b>

#### Web App Requirements

  1. Display customer details and their current balance.
  2. Create `inspection`, `servicing`, `repairs` or `maintenance` requests for a customer using either `cash` or `credit`.
     1. No customer should have a negative balance.
     2. The `balance` field should always reflect the deductions of all `credit` requests.
  3. List all customer requests.
  4. Unit and integration tests.

Use Angular framework with Typescript and session storage to accomplish the requirements. Include your own tests cases. Try to use fewer libraries and implement your own utilities and functionality.

### Time Estimate
Estimated effort to complete this challenge is 4-5 hours.

### Submission
1. Please host your repository on github and make it private.
2. Please include this README file in your repo.
3. Invite mechoautotech to your project once it is ready.
4. Email us to confirm that mechoautotech has been added as a contributor and your project is ready for review.

### Following Steps
Upon submission of the challenge, we will review your code and reach out to you with comments. If your submission passes our criteria, a following interview will be scheduled to discuss your implementation in further detail. We feel this is another great way to assess your understanding rather than on the spot coding exercises!

We want you to succeed as much as you do, so we wish you the best of luck! Looking forward to your submission!