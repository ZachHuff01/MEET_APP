# User Stories
## 
2. Show/Hide Event Details

  As a user, I should be able to toggle the visibility of event details, so that I can quickly view or hide additional information and customize my view according to my preferences.

3. Specify Number of Events

  As an event organizer, I should be able to define the number of events to be displayed on a page, so that I can efficiently manage and navigate through a specific quantity of events at a time.

4. Use the App When Offline
  
  As a user, I should be able to access and use the app even when offline, so that I can continue to view and interact with previously downloaded information without requiring an active internet connection.

5. Add an App Shortcut to the Home Screen

  As a user, I should be able to create a shortcut for the app on my device's home screen, so that I can easily access the app without navigating through multiple menus, improving overall convenience and accessibility.
  
6.Display Charts Visualizing Event Details

  As a data analyst, I should be able to view visual representations of event details in the form of charts, so that I can quickly analyze and interpret patterns, trends, and insights from the data for better decision-making.

# Gherkin-Style Scenarios
##
Feature: Show/Hide Event Details

Scenario: Toggle visibility of event details
  Given a user is viewing the event page
  When the user toggles the visibility of event details
  Then the event details should be either shown or hidden based on the user's action

Feature: Specify Number of Events

Scenario: Define the number of events to display
  Given an event organizer is managing events
  When the organizer specifies the number of events to display per page
  Then the event page should show the designated quantity of events

Feature: Use the App When Offline

Scenario: Access the app without an internet connection
  Given a user has downloaded the app and data
  When the user opens the app without an internet connection
  Then the user should be able to interact with previously downloaded information

Feature: Add an App Shortcut to the Home Screen

Scenario: Create a shortcut on the home screen
  Given a user has the app installed on their device
  When the user creates a shortcut on the home screen
  Then the app shortcut should be visible and functional on the home screen

Feature: Display Charts Visualizing Event Details

Scenario: View visual representations of event details
  Given a data analyst is analyzing event data
  When the analyst views the event details in chart format
  Then the analyst should be able to interpret patterns and insights from the visual representation


  *create using "npx create-react-app meet --template cra-template-pwa --use-npm"
  
  *use create new repo in github
  
  *add "homepage" URL between "private" and "dependancy" sections
  
  *add "predeploy": "npm run build", "deploy": "gh-pages -d build" to "scripts"
  
  *push changes to repo by using - 
   1. git init
   2. "make the change"
   3. git add .
   4. git commit -m "(number of commit) commit"
   5. git branch -M main
   6. git push -u origin main
  
