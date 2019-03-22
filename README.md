[![npm version](https://img.shields.io/npm/v/node-scoreg.svg?style=flat-square)](https://www.npmjs.org/package/node-scoreg)
[![build status](https://img.shields.io/travis/skiffek/node-scoreg.svg?style=flat-square)](https://travis-ci.org/skiffek/node-scoreg)


node-scoreg
===========

A simple client to the [scoreg.at](https://scoreg.at/) webservices, now with TypeScript support.


## Install

```sh
$ npm install node-scoreg --save
```


## Usage

```javascript
const { MemberV2 } = require("node-scoreg");
const memberV2service = new MemberV2("myUsername", "myPassword", "myAccessKey");

memberV2service.findScoutIdsForOrganization().then(scoutIds => console.log(scoutIds));
memberV2service.findMemberByScoutId("anyScoutId").then(member => console.log(member));
memberV2service.findMemberCompleteByScoutId("anyScoutId").then(memberComplete => console.log(memberComplete));
```

As of ECMAScript 2017 (ES8), you can also use [async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await):

```javascript
const scoutIds = await memberV2service.findScoutIdsForOrganization();
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
 * @param {object} options
 * @param {string} options.username
 * @param {string} options.password
 * @param {string} options.accessKey
 * @param {object} [options.agent={ keepAlive: true }] - An instance of {@link https://nodejs.org/dist/latest-v8.x/docs/api/http.html#http_class_http_agent https.Agent}, or options to create one
 */
constructor({ username, password, accessKey, agent = { keepAlive: true } }) {}
```

### findScoutIdsForOrganization()

```javascript
/**
 * @return {Promise<string[]>}
 */
findScoutIdsForOrganization() {}
```

### findMemberByScoutId(scoutId)

```javascript
/**
 * @param {string} scoutId
 * @return {Promise<object>}
 */
findMemberByScoutId(scoutId) {}
```

### findMemberCompleteByScoutId(scoutId)

```javascript
/**
 * @param {string} scoutId
 * @return {Promise<object>}
 */
 findMemberCompleteByScoutId(scoutId) {}
```


## License

[The Unlicense](http://unlicense.org/)
