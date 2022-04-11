import path from 'path'
const __dirname = path.resolve()

import {fork}  from 'child_process'
import { Router } from 'express'
import logger from '../utils/logger.js'

const routerCalculoRandom = Router()

    function frecuenciaNumeros(arr) {
        const map = arr.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map())
        return [...map.entries()]
    }

    function calculo(reps) {
        let arraysum = []
        for (let i = 0; i < reps; i++) {
            const sum = getRandomInt(1,1000)
            arraysum.push(sum)
        }
        return arraysum
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    process.emit('listo')

    process.on('message', (resultado) => {
        logger.info(`mensaje del padre: ${resultado}`)
        logger.info(`worker #${process.pid} iniciando su tarea`)
        let arr = calculo(resultado)
        const result = frecuenciaNumeros(arr)
        process.send(result.sort())
        logger.info(`worker #${process.pid} finalizó su trabajo`)
        process.exit()
    })


    if (typeof process.send === 'function') { 
        process.send('listo');
    }

    routerCalculoRandom.get('/', (req, res) => {
        let rands = ''
        const uuidv1 = req.query.uuidv1
        if (req.query.cant == undefined || req.query.cant == '') {
            logger.info('App Calculo sin cantidad definida, se toma por default 1e6 ') 
            rands = 100000000
        } else {
            logger.info('App Calculo se hace el calculo para: ' + req.query.cant)
            rands = req.query.cant
        }

        const computo = fork(__dirname + '/src/scripts/calculo.js')
        computo.on('message', (msg, uuidv1) => {
            if (msg == 'listo') {
                computo.send(rands, uuidv1)
            } else {
                logger.info('Mensaje del hijo: OK')
                res.json({ msg })
            }
        })
        
    })
    
export default routerCalculoRandom