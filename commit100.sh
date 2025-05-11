#!/bin/bash
for i in {1..100}
do
  echo "<!-- Commit $i -->" >> fakeform.html
  git add fakeform.html
  git commit -m "Commit number $i"
done