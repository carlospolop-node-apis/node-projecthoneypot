const dns = require('dns');

var apiKey = "";

function checkIP(ip){
    var promise = new Promise(function(resolve, reject) {
        if (apiKey == "") reject(Error("Please set the api key using the function setApiKey(KEY)"));
        var ip_splitted = ip.split(".")
        var reverseDomain = apiKey + "." + ip_splitted[3] + "." + ip_splitted[2] + "." +ip_splitted[1] + "." +ip_splitted[0] + ".dnsbl.httpbl.org"

        dns.resolve4(reverseDomain, (error, addresses) => {
            if (error) reject(Error("Error using projecthoneypot: "+error));
            if (addresses && addresses.length > 0) {
                var data_spl = addresses[0].split(".");
                if (data_spl.length < 4 || data_spl[0] != "127") resolve({error: "Something happened, not '127' of not an IP in the resopnse"})
                var obj = {malicious: true, days_since_last: data_spl[1], threat_score: data_spl[2], types: []}
                var bits = parseInt(data_spl[3]).toString(2);
                obj.types.push((bits[0] == '1') ? "Search Engine":"Suspicious");
                if (bits[1] == '1') obj.types.push("Harvester");
                if (bits[2] == '1') obj.types.push("Comment Spammer");
                //if (bits[3] == '1') obj.push("");
                //if (bits[4] == '1') obj.push("");
                //if (bits[5] == '1') obj.push("");
                //if (bits[5] == '1') obj.push("");
                //if (bits[5] == '1') obj.push("");
                //if (bits[5] == '1') obj.push("");
                resolve(obj);
            }
            resolve({malicious: false});
        });
    });
    return promise;
}


exports.setApiKey = function(key){ apiKey = key; }
exports.checkIP = checkIP;

/*
Output example
{ malicious: true,
  days_since_last: '1',
  threat_score: '1',
  types: [ 'Search Engine' ] }
*/
