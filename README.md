# Node Projecthoneypot

Use Node to check for malicious IPs in [projecthoneypot](https://www.projecthoneypot.org)

## Install
`npm install nodejs-projecthoneypot`

## How to use

```javascript
const projecthoneypot = require('nodejs-projecthoneypot');

projecthoneypot.setApiKey("<YOUR API KEY>")

// Use checkIP(<IP>) to check that IP against projecthoneypot.org
// A promise will be returned
ip = "127.1.1.1";
projecthoneypot.checkIP(ip).then(function(result){ 
        console.log(result);
    }, function(err) {
        console.log(err);
});


/*
Output example
{ malicious: true,
  days_since_last: '1',
  threat_score: '1',
  types: [ 'Search Engine' ] }
*/
```
