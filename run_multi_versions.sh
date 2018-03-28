#!/usr/bin/env bash

while read p; do
  if [ -z $1 ]
  then
    echo "Select a test to be run. Possible tests:"
    dir ../../tests
    exit
  fi
  . ~/.nvm/nvm.sh
  nvm use $p
  node ../../tests/$1
done < ../../node_versions
