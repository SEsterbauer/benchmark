#!/usr/bin/env bash

if [ -z $1 ]
then
  echo "Select a test to be run. Possible tests:"
  dir ../../tests
  exit
fi
while read version; do
  . ~/.nvm/nvm.sh
  nvm use $version
  node ../../tests/$1
done < ../../node_versions
