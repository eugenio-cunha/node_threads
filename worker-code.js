'use strict';

const { parentPort } = require('worker_threads')

const start = Date.now()

console.log('** THREAD COMPUTAÇÃO PESADA INICIADA **')
// Simulando computação "pesada"
for (let i = 0; i < 1000000; i++) {
  for (let j = 0; j < 10000; j++) {
  }
}

parentPort.postMessage({ start, end: Date.now() })