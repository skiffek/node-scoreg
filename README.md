node-scoreg
===========

A simple client to the [scoreg.at](https://scoreg.at/) webservices.


## Install

```sh
$ npm install node-scoreg --save
```


## Usage

```javascript
const Scoreg = require("node-scoreg");
const scoreg = new Scoreg("myUsername", "myPassword", "myAccessKey");

scoreg.findScoutIdsForOrganization().then(scoutIds => console.log(scoutIds));
scoreg.findMemberByScoutId("anyScoutId").then(member => console.log(member));
scoreg.findMemberCompleteByScoutId("anyScoutId").then(memberComplete => console.log(memberComplete));
```

As of ECMAScript 2017 (ES8), you can also use [async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await):

```javascript
const scoutIds = await scoreg.findScoutIdsForOrganization();
console.log(scoutIds.length);
```


## How to get your access key

Ask your Gruppen-Administrator! The Gruppen-Administrator will...

1. Log in to SCOREG
2. Open your member details (the page with your "Stammdaten", "Details", "Beschreibung", etc.)
3. Click on tab "Berechtigungen"
4. Add "WebService-Zugriff Mitglieder (Gruppe)" for your organization to you
4. Locate the access key for your organization within the table, and send it to you


## API

### constructor(username, password, accessKey, options = {})

```javascript
/**
 * @constructor
 * @param {String} username
 * @param {String} password
 * @param {String} accessKey
 * @param {Object} [options={}] - Options for {@link https://www.npmjs.com/package/node-fetch node-fetch}
 */
constructor(username, password, accessKey, options = {}) {}
```

### findScoutIdsForOrganization()

```javascript
/**
 * @return {Promise<String[]>}
 */
findScoutIdsForOrganization() {}
```

### findMemberByScoutId(scoutId)

```javascript
/**
 * @param {String} scoutId
 * @return {Promise<Object>}
 */
findMemberByScoutId(scoutId) {}
```

### findMemberCompleteByScoutId(scoutId)

```javascript
/**
 * @param {String} scoutId
 * @return {Promise<Object>}
 */
 findMemberCompleteByScoutId(scoutId) {}
```


## License

[The Unlicense](http://unlicense.org/)
