#!/bin/bash

pids=$(pgrep 'redis-server')

echo "Stopping PIDs:"
echo $pids
echo $pids | xargs kill

echo "Deleting nodes.conf, dump.rdb and aof files"
rm -f nodes*.conf
rm -f dump*.rdb
rm -f aof*.aof