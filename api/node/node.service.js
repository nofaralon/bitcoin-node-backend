const dbService = require("../../services/db.service");
const logger = require("../../services/logger.service");
const ObjectId = require("mongodb").ObjectId;
const axios = require('axios').default;

async function query(pageIdx) {
    try {

        let collection = await dbService.getCollection("node");
        const pageSize = 5
        const MaxPages = Math.ceil(await collection.countDocuments() / pageSize);
        pageIdx = parseInt(pageIdx)
        if (pageIdx >= MaxPages) pageIdx = 0
        const skips = pageSize * ((pageIdx === 0 || pageIdx < 0) ? 0 : pageIdx)
        const nodes = await collection.find().skip(skips).limit(pageSize).sort({ $natural: -1 }).toArray();
        return nodes;
    } catch (err) {
        logger.error("cannot find nodes", err);
        throw err;
    }
}

async function getById(nodeId) {
    try {
        const collection = await dbService.getCollection("node");
        const node = collection.findOne({ _id: ObjectId(nodeId) });
        console.log(node);
        return node;
    } catch (err) {
        logger.error(`while finding node ${nodeId}`, err);
        throw err;
    }
}

async function remove(nodeId) {
    try {
        const collection = await dbService.getCollection("node");
        await collection.deleteOne({ _id: ObjectId(nodeId) });
        return nodeId;
    } catch (err) {
        logger.error(`cannot remove node ${nodeId}`, err);
        throw err;
    }
}

async function add(node) {
    node = await _checkNode(node)
    try {
        const collection = await dbService.getCollection("node");
        const addedNode = await collection.insertOne(node, { $position: -1 });
        const id = addedNode.insertedId.toString();
        node._id = id;
        return node;
    } catch (err) {
        logger.error("cannot insert node", err);
        throw err;
    }
}

async function update(node) {
    node = await _checkNode(node)
    try {
        var id = ObjectId(node._id);
        delete node._id;
        const collection = await dbService.getCollection("node");
        await collection.updateOne({ _id: id }, { $set: {...node } });
        const updateNode = {...node, _id: id };
        return updateNode;
    } catch (err) {
        logger.error(`cannot update node ${nodeId}`, err);
        throw err;
    }
}

async function _checkNode(node) {
    const key = `${node.ip}:${node.port}`
    const bitNodeList = await axios.get('https://bitnodes.io/api/v1/snapshots/latest/#')
    const res = bitNodeList.data.nodes.hasOwnProperty(key)
    node.isBitnodes = res
    return node
}

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
}