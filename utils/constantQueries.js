const Redis = require('ioredis');

const redisNodes = [
  {
    port: 7000,
    host: '127.0.0.1'
  },
  {
    port: 7001,
    host: '127.0.0.1'
  },
  {
    port: 7002,
    host: '127.0.0.1'
  },
  {
    port: 7003,
    host: '127.0.0.1'
  }];

function retry(fn, retriesLeft = 5, interval = 1000) {
  return new Promise((resolve, reject) => {
    fn()
      .then(resolve)
      .catch(err => {
        console.log(`Error running function: ${err}`);
        console.log(`Will retry ${retriesLeft} more times`);
        if (retriesLeft === 1) {
          reject(err);
          return;
        }
        setTimeout(() => {
          retry(fn, retriesLeft -1, interval)
            .then(resolve, reject)
        }, interval)
      });
  });
}

function checkForLast() {
  return new Promise((resolve, reject) => {
    cluster.get("__stop__")
      .then(res => {
        if (res) {
          return resolve(res);
        }
        return resolve(checkForLast(cluster));
      })
      .catch(err => {
        console.log(`Error querying redis: ${err}`);
      });
  }); 
}

function start(cluster) {
  let last = 0;
  retry(checkForLast).then(res => {
    console.log("Stop was set!");
    cluster.disconnect()
  });
}

const cluster = new Redis.Cluster(redisNodes, {enableReadyCheck:true});
cluster.on("ready", evt => start(cluster));
cluster.on("error", err => console.log(`CLUSTER ERROR ${err}`));
cluster.on("connect", () => console.log("CONNECTED"));
console.log("Waiting for connection ...");

