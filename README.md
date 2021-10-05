# Peace of Mind
![](./assets/LogoVariations.jpg)

## Description

Are you highly skilled in the art of forgetfulness? I know I am! We're here to offer you some Peace of Mind.

Peace of Mind is a task management app that won't let you forget. Get an indefinite number of alerts via SMS, email, and
voice, so you can't ignore the task at hand.

## Motivation

Time management has gotten tricky since the start of the pandemic. People are experiencing difficulty perceiving the
passage of time, and often feeling "brain fog".

Some tasks are too important to be delayed or forgotten, like taking medications, caring for others, or caring for
yourself.

## Design Elements

![](./assets/1.jpg)
![](./assets/2.jpg)

## Tech

Peace of Mind was created with an ExpressJS backend and a ReactJS frontend. The data is stored in a hosted Postgres
database. All alerts (text messages, phone calls, and emails) are sent via Twilio APIs.

Interested in contributing? View our [Contribution Guide](CONTRIBUTING.md)!

## FAQ

### How is this different from a calendar?

Calendars will only alert you _before_ the event time, and it is difficult to stop the remaining alerts.

To create similar functionality using calendars, if I wanted to take my medication at 6:00 PM I'd need to create an event that begins _after_ 6:00 PM. 
- Event time: 7:00 PM
- Alert: at time of event
- Alert: 15 minutes before event
- Alert: 30 minutes before event
- Alert: 45 minutes before event
- Alert: 60 minutes before event

What if I take my medication right at 6:00 PM? Now I need to manually disable the remaining alerts, or delete the event entirely.
What if I was out for dinner between 6:00 PM and 7:00 PM, and there are no remaining alerts to remind me?

### How is this different from alarms?

Alarms more closely match the functionality of Peace of Mind, in that you can snooze the alarm indefinitely.

Let's say I need to take my medication at 6:00 PM, but I'm out to dinner at that time. The alarm is so disruptive, it would be extremely frustrating having it go off every 9 minutes. (Personally) I am likely to convince myself that I'll be able to remember later on my own, and just turn off the alarm altogether.

Text messages are a gentler reminder, so you are less likely to stop the alerts out of pure frustration.

Eventually, Peace of Mind will accept snooze requests where you can respond to the text/call/email with "snooze 60 minutes" and it will pause the alerts until then.

### Why texting, calling, and emails?

In the future, Peace of Mind will have the ability to create tasks and alerts via texting, calling, and emails eliminating need for a smartphone/internet access.

## Future features

- Indefinite alerts
- Recurring tasks
- Suggest reminders for users to set
  - General
    - Go for a walk
    - Meditate
  - Learning
    - Based on the user's previous reminders
- API is exposed/public so alerts can be created from third party apps like:
  - Trello
  - Jira
  - Google Calendar
  - Google Mail
  - Siri / Alexa
- Symptom tracking
- Mood tracking
  - Possibly alert caregivers or close contacts if mood has been in decline for a long period of time
- Feelings chart with definitions of emotions to help users name their feelings
- Blogging
  - Ability to share blog with caregiver/close contact
- Day planning
  - integrate with google calendar
- Educate users
  - benefits of sleep, exercise, etc.
  - anxiety, depression information
- Provide stats on how quickly users responded to their alerts
- Reward system/gamification for accomplishing tasks
- Create a triggered/crisis button that will immediately alert caregiver/close contact
- Motivational messages on the app
