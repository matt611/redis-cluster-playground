# Redis Cluster Playground

## Intro
This is a collection of applications and scripts to get familiar with administering a Redis Cluster.

The code and documentation in this repo are geared toward Mac OS. Your milage may very.

## Start a Redis Cluster locally
The easiest way to install Redis is to use brew:

```$ brew install redis```  

For a more detailed introduction to redis cluster see this: https://redis.io/topics/cluster-tutorial

You can simulate a Redis cluster locally by starting serveral instances of Redis, each listening on a different port. There are 6 Redis configurations in the 7000 - 7005 directories.  To start your a cluster open 6 tabs in terminal.  In each tab cd into one of the 700X directories and start a Redis instance like this:

```$ redis-server ./redis.conf ```

You should now have 6 individual instances of redis server running.  To verify this open a new terminal and run the following for each port:

```$ redis-cli -p 7000 -c cluster nodes ```

The result for each run should look like this:

```06157637242f62d81dc9e6b77845ae0cea8c7d9e :7000@17000 myself,master - 0 0 0 connected``

Now you can create a cluster using these instances:

```$ redis-cli --cluster create 127.0.0.1:7000 127.0.0.1:7001 127.0.0.1:7002 127.0.0.1:7003 127.0.0.1:7004 127.0.0.1:7005 --cluster-replicas 1```

This will create a plan for your new cluster and ask you to verify that it is correct. Type 'yes' when prompted. This should be the final result:

```[OK] All 16384 slots covered.```

Now verify that you cluster is up and healthy by running the cluster nodes command from the cli again:

```$ redis-cli -p 7000 -c cluster nodes ``

Now the result should look like this:

```
d1bd1c64224957ea839554d53007cd54c61ec6d9 127.0.0.1:7001@17001 master - 0 1564358787000 2 connected 5461-10922
06157637242f62d81dc9e6b77845ae0cea8c7d9e 127.0.0.1:7000@17000 myself,master - 0 1564358787000 1 connected 0-5460
8dde930c589eaea4b4dedaaa435b619e6faf3fd0 127.0.0.1:7002@17002 master - 0 1564358788022 3 connected 10923-16383
3a96e68b73084ebd60b4d38f89954a97bb035a70 127.0.0.1:7003@17003 slave 8dde930c589eaea4b4dedaaa435b619e6faf3fd0 0 1564358787000 4 connected
1e151b50dd7da4003514f745a3d5f3c3352fa06d 127.0.0.1:7004@17004 slave 06157637242f62d81dc9e6b77845ae0cea8c7d9e 0 1564358787502 5 connected
83eaba11ff872a064990dbf2970d07db4af82192 127.0.0.1:7005@17005 slave d1bd1c64224957ea839554d53007cd54c61ec6d9 0 1564358786991 6 connected
```
