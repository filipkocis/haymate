#!/bin/bash

npm run build-only
rm -rf ./server/dist/
cp -r ./dist/ ./server/dist/
