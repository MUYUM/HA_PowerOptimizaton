#!/bin/sh

export HA_TOKEN="$(jq -r .HA_TOKEN /data/options.json)"
node /app/index.js


