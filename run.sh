#!/usr/bin/env bash
cd $(dirname $(/usr/local/bin/realpath "${BASH_SOURCE[0]}"))

{ [ -d node_modules ] || npm install; } &&
./index.js "$@"
