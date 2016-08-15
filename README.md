# healthview

The purpose of this app is to give mental health practitioners a space to schedule appointments and take notes while retaining data and charting trends related to patient diagnoses, hopefully identifying and helping to eliminate bias in the diagnosis process.

##Technologies used:
I built out a full stack MVC app with Express using Node.js, and used Chart.js for the data representation and Mongo as a database. I also used google fonts (Arimo).

##Gameplan
My MVP will be a basic note taking app where a user (practitioner) would be able to save session notes about their patients. The practitioner would also be able to see and edit a patient's page with their diagnosis, personal information and all session notes for that patient. A practitioner would also be able to see statistics on all of their patients to see possible inherent bias in their assessment.<br> The data would be broken down by gender and race, since there are many studies that find disproportionate diagnoses within these characteristics, even when 2 patients are exhibiting the same symptoms. This product would likely be marketed to hospital administrators hoping to eliminate biases from their employee's work. I'm interested in using Node as the stack, and researching data visualization libraries like Chart.js and D3. Because I want my data to have a flexible structure and be able to be rendered quickly (with less of a concern about absolute accuracy) it seems that mongoDB is the best database to use for my patient database. The user database, which will hold the username and password, will likely be psql since that's what I'm familiar with for user authentication. The patient database will hold the patient's name, practitioner's name, gender, race, phone number and an array containing session notes for that user. I have yet to decide if each practitioner should get their own mongo table or if it could all be stored in one table, and then filtered depending on which user is logged in. 

##User Stories
As a guest I should be able to create an account and login, but have no other access to features<br>
As a user I should be able to schedule appointments with clients<br>
As a user I should be able to check off appointments as clients come in and take notes on the session<br>
As a user I should be able to see visual data showing me trends of diagnosis related to gender and race<br>

##Wire frames
<img src="https://github.com/echerney/healthview/blob/master/Screen%20Shot%202016-08-05%20at%209.10.06%20AM.png?raw=true">
<img src="https://github.com/echerney/healthview/blob/master/Screen%20Shot%202016-08-05%20at%2012.01.01%20PM.png?raw=true">
<img src="https://github.com/echerney/healthview/blob/master/Screen%20Shot%202016-08-05%20at%209.51.54%20AM.png?raw=true">

##Attribution
<a href="https://fonts.google.com/specimen/Arimo?query=ari">Google fonts</a>
<a href="http://www.chartjs.org/">Chart.js</a>
Fizal as a rubber duck
