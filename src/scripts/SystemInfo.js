import {Router} from 'express'
const routerSystemInfo = Router()
import os from 'os'
import logger from '../utils/logger.js'

const ejecutable = process.execPath.split('/').pop()
const pid = process.pid
const platform = process.platform
const version = process.version
const proyecto = process.cwd()
const memory = (process.memoryUsage.rss() / 1024 /1024).toFixed(2) + ' Mb'
const CPUs = os.cpus().length

export const datos = {
    ejecutable,
    pid, 
    platform,
    version,
    proyecto,
    memory,
    CPUs
}

routerSystemInfo.get('/', (req,res) => {
    logger.info(`Se muestra la informacion del sistema`)
    res.status(202).render('systemInfo', {datos})
})

export default routerSystemInfo
