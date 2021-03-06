const { Worker } = require('worker_threads')
const request = require('request')

function startWorker(path, cb) {
  const worker = new Worker(path, { workerData: null })
  worker.on('message', msg => cb(null, msg))
  
  worker.on('error', cb)
  
  worker.on('exit', code => {
    if (code != 0) console.error(new Error(`Worker finalizado com exit code = ${code}`))
  })
  return worker
}

// Inicia o worker em outra thread
startWorker(`${__dirname}/worker-code.js`, (err, result) => {
  if (err) return console.error(err)

  console.log(`Duração = ${(result.end - result.start) / 1000} segundos`)
  console.log('** THREAD COMPUTAÇÃO PESADA FINALIZADA **')
})

console.log('Thread principal')

// Continua com o a execução na thread principal
request.get('http://www.eugenio.xyz', (err, resp) => {
  if (err) return console.error(err)
  console.log(`Total bytes recebidos = ${resp.body.length}`)
})