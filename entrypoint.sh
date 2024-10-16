#!/bin/sh

npx prisma generate

node dist/main.js
