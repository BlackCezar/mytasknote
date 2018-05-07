const winstone = require('winston'),
      path = require('path')

function getLogger(module) {
    const path = module.filename.split('/').slice(-2).join('/')

    return new winstone.Logger({
        transports: [
            new winstone.transports.Console({
                colorize: true,
                level: 'debug',
                label: path
            }),
            new (winstone.transports.File)({
                filename: 'node.log',
                label: path,
                colorize: true
            })
        ]
    })
}

module.exports = getLogger