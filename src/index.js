var redis = require("redis"),
    client = redis.createClient(6379,'10.211.55.15');

client.on("error", function (err) {
    console.log("Error-redis" + err);
});

