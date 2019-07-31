const express = require('express');
const RedisCluster = require('./redis/redisCli')

const router = express.Router();

/* get a list of all running redis instances */
router.get('/instance', function(req, res, next) {
  res.json(RedisCluster.getInstancesDescriptions());
});

module.exports = router;
