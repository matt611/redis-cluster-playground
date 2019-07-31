const Redis = require("ioredis");
const config = require('config');
const redisConfig = config.get('redis');

class RedisCluster {
    constructor () {
        this.availableInstances = redisConfig.nodes.map(node => {
            return new Redis(node.port, node.host);
        })
    }

    getInstancesDescriptions() {
        return this.availableInstances.map(instance => {
            return {
                host: instance.options.host,
                port: instance.options.port
            }
        })
    } 
}

module.exports = new RedisCluster;
