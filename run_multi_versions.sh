#!/usr/bin/env bash

if [ -z $1 ]
then
  echo "Select a test to be run. Possible tests:"
  dir ../../tests
  exit
fi
while read version; do
  echo
  echo Running Benchmark with Node version $version
  ~/.nvm/versions/node/v$version/bin/node ../../tests/$1
done < ../../node_versions
