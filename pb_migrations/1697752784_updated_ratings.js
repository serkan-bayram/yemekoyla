/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("s8w15kcdpl49jzl")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "elnvapic",
    "name": "user",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("s8w15kcdpl49jzl")

  // remove
  collection.schema.removeField("elnvapic")

  return dao.saveCollection(collection)
})
