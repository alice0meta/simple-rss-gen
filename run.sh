#!/usr/bin/env bash
# cd $(dirname $(/usr/local/bin/realpath "${BASH_SOURCE[0]}")) # no realpath on osx
cd "$(t="${BASH_SOURCE[0]}"; while [ -h "$t" ]; do d="$(cd -P "$(dirname "$t")" && pwd)"; t="$(readlink "$t")"; [[ $t != /* ]] && t="$d/$t"; done; cd -P "$(dirname "$t")" && pwd)"

{ [ -d node_modules ] || npm install; } &&
./index.js "$@"
