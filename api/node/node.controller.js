const nodeService = require('./node.service.js');
const logger = require('../../services/logger.service')

// GET LIST
async function getNodes(req, res) {
    try {
        var pageIdx = req.params.pageIdx;
        const nodes = await nodeService.query(pageIdx)
        res.json(nodes);
    } catch (err) {
        logger.error('Failed to get nodes', err)
        res.status(500).send({ err: 'Failed to get nodes' })
    }
}


// GET BY ID 
async function getNodeById(req, res) {
    try {
        const nodeId = req.params.id;
        const node = await nodeService.getById(nodeId)
        res.json(node)
    } catch (err) {
        logger.error('Failed to get node', err)
        res.status(500).send({ err: 'Failed to get node' })
    }
}

// POST (add node)
async function addNode(req, res) {
    try {
        const node = req.body;
        const addedNode = await nodeService.add(node)
        res.json(addedNode)
    } catch (err) {
        logger.error('Failed to add node', err)
        res.status(500).send({ err: 'Failed to add node' })
    }
}

// PUT (Update node)
async function updateNode(req, res) {
    try {
        const node = req.body;
        const updatedNode = await nodeService.update(node)
        res.json(updatedNode)
    } catch (err) {
        logger.error('Failed to update node', err)
        res.status(500).send({ err: 'Failed to update node' })
    }
}

// DELETE (Remove node)
async function removeNode(req, res) {
    try {
        const nodeId = req.params.id;
        const removedId = await nodeService.remove(nodeId)
        res.send(removedId)
    } catch (err) {
        logger.error('Failed to remove node', err)
        res.status(500).send({ err: 'Failed to remove node' })
    }
}

module.exports = {
    getNodes,
    getNodeById,
    addNode,
    updateNode,
    removeNode
}