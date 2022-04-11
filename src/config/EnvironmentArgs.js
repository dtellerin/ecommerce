
import parseArgs from 'minimist'
const options = {
    alias: {
        m: 'modo',
        p: 'puerto',
        d: 'debug',
        t: 'tipo',
        d: 'duracion_sesion'
    },
    default: {
        modo: 'prod',
        puerto: 8080,
        debug: false,
        tipo: 'FORK',
        duracion_sesion: 60
    }
}

const commandLineArgs = process.argv.slice(2)

export const {puerto} = parseArgs(commandLineArgs, options) //|| process.argv[2]
export const {modo} = parseArgs(commandLineArgs, options)
export const {debug} = parseArgs(commandLineArgs, options)
export const {tipo} = parseArgs(commandLineArgs, options)
export const {duracion_sesion} = parseArgs(commandLineArgs, options)