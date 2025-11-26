const daoCommon = require('./common/daoCommon')

const programDao = {
    ...daoCommon,
    ...require('./api/programDao')
}

const actorDao = {
    ...daoCommon,
    ...require('./api/actorDao')
}

const producerDao = {
    ...daoCommon,
    ...require('./api/producerDao')
}

const directorDao = {
    ...daoCommon,
    ...require('./api/directorDao')
}

const streamingDao = {
    ...daoCommon,
    ...require('./api/streamingDao')
}

module.exports = {
    programDao,
    actorDao,
    producerDao,
    directorDao,
    streamingDao
}