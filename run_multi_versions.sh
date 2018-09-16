#!/usr/bin/env bash

if [ -z $1 ]
then
  echo "Select a test to be run. Possible tests:"
  dir ../../tests
  exit
fi
cd ../..
while read version; do
  ~/.nvm/versions/node/v$version/bin/node ./tests/$1
done < ./node_versions
