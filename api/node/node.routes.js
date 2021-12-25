const express = require('express')
    // const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getNodes, getNodeById, addNode, updateNode, removeNode } = require('./node.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/:pageIdx', log, getNodes)
router.get('/id/:id', getNodeById)
router.post('/', addNode)
router.put('/:id', updateNode)
router.delete('/:id', removeNode)
    // router.post('/', requireAuth, requireAdmin, addNode)
    // router.put('/:id', requireAuth, requireAdmin, updateNode)
    // router.delete('/:id', requireAuth, requireAdmin, removeNode)

module.exports = router