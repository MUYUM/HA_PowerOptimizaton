#!/bin/sh

export HA_TOKEN="$(jq -r .ha_token /data/options.json)"
node /app/index.js


