node-scoreg
===========

A simple client to the scoreg.at webservices.


## How to get your access key

Ask your Gruppen-Administrator or...

1. Log in to SCOREG
2. On top left of the screen where it says "Benutzer: Your Name", click your name
3. Click on tab "Berechtigungen"
4. Locate the access key for your organization within the table


## Install

```sh
$ npm install node-scoreg --save
```


## Usage

```javascript
const Scoreg = require("node-scoreg");
const scoreg = new Scoreg("myScoutId", "myPassword", "myAccessKey");

scoreg.findScoutIdsForOrganization().then(scoutIds => console.log(scoutIds));
scoreg.findMembersForOrganization().then(members => console.log(members));

scoreg.findMemberByScoutId("anyScoutId").then(member => console.log(member));
scoreg.findMemberCompleteByScoutId("anyScoutId").then(memberComplete => console.log(memberComplete));
```


## API

### constructor(username, password, accessKey[, options])

* @param String `username`
* @param String `password`
* @param String `accessKey`
* @param Object `options` for node-fetch

### findScoutIdsForOrganization()

* @return Promise&lt;Array&gt;

### findMembersForOrganization()

Convenience method that calls <code>findScoutIdsForOrganization()</code> and then
for each scoutId <code>findMemberByScoutId(scoutId)</code>.

* @return Promise&lt;Array&gt;

### findMemberByScoutId(scoutId)

* @param String `scoutId`
* @return Promise&lt;Object&gt;

### findMemberCompleteByScoutId(scoutId)

* @param String `scoutId`
* @return Promise&lt;Object&gt;


## License

[The Unlicense](http://unlicense.org/)