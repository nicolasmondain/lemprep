# Meteor

## DDP (Distributed Data Protocol)

* https://github.com/meteor/meteor/blob/devel/packages/ddp/DDP.md
* https://dev.to/harryadel/meteor-and-ddp-4kkm
* https://university.meteor.com/path-player?courseid=meteor-101&unit=61ba687a245bd923ec2f60e3Unit

DDP is a protocol between a client and a server that supports two operations :
* remote procedure calls by the client to the server (Methods)
* the client subscribing to a set of documents, and the server keeping the client informed about the contents of thoses documents as they change over time (Publications and Subscriptions)

DDP messages are JSON objects, with some fields specified to be EJSON.
EJSON is an extension of JSON to support more types.

### DDP Messages

#### Server to Client

- connected:
	- session: string (identifier for the DDP session)

- failed:
	- version: string (a suggested protocom version to connect with)

- ready:
	- subs: array of strings(ids passed to 'sub' which have sent their initial batch of data)

- nosub:
	- id: string (the id passed to 'sub')
	- error: optional error

- added:
	- collection: string (collection name)
	- id: string (document id)
	- fields: optional object width EJSON values

- removed:
	- collection: string
	- id: string

- changed:
	- collection: string
	- id: string
	- fields: optional object sith EJSON values
	- cleared: otpional array


#### Client to Server

- connect:
	- session: string (if trying to reconnect to an existing DDP session)
	- version: string
	- support: array of strings

- sub:
	- id: string
	- name: string (the name of the subscription)
	- params: optional array of EJSON items

- unsub:
	- id: string (the id passed to 'sub')
## Publications/Subscriptions

* https://guide.meteor.com/data-loading.html
* https://frenchfullstack.com/lessons/meteor-publications-subscriptions
* https://docs.meteor.com/api/pubsub

## Publications with join (and reactive)

However, we can write publications that are properly reactive to changes across collections. To do this, we use the reywood:publish-composite package.

* https://guide.meteor.com/data-loading.html#publishing-relations
* https://stackoverflow.com/questions/20871496/meteor-reactive-join-with-publish-with-relations-package

## Cron

* https://github.com/percolatestudio/meteor-synced-cron

## Imports dynamiques

* https://medium.com/@vincent.bocquet/dynamic-import-in-javascript-a-simple-guide-a808cff86458
* https://dmitripavlutin.com/ecmascript-modules-dynamic-import/
* https://flaviocopes.com/javascript-dynamic-import/

## Trackers.autorun()

* https://docs.meteor.com/api/tracker.html
* https://forums.meteor.com/t/when-and-how-to-use-this-autorun/26075/2
* https://forums.meteor.com/t/allow-autorun-update-infinite-loop/3677

## Quand ne pas faire de la réactivité

* load data once (eg. article content)
* editing mongoDB collection (form)
* subscriptions without parameters
* https://docs.meteor.com/api/tracker.html#Tracker-nonreactive
* https://github.com/meteor/meteor-feature-requests/issues/137

## low level collection

* https://richsilv.github.io/meteor/meteor-low-level-publications/
* c'est quoi une low level collection et comment tu la déclares, comment tu accèdes à la db sans passer par la surcouche Meteor
* comment faire une agrégation
* comment marche le driver Mongo
* comment marche la réactivité : différence entre les oplogs et les polls
* comment désactiver les oplogs (soit passer par des polls soit les low collections)
* impacts des oplogs sur les perfs réseau quand tu as 2K concurrent connexions
* usage des low coll pour l'usage des updateMany et améliorations de perfs
* comment placer des hooks sur les opérations CRUD

## Testing

Unit test: If you are testing one small module of your application, you are writing a unit test. You’ll need to stub and mock other modules that your module usually leverages in order to isolate each test. You’ll typically also need to spy on actions that the module takes to verify that they occur.

Integration test: If you are testing that multiple modules behave properly in concert, you are writing an integration test. Such tests are much more complex and may require running code both on the client and on the server to verify that communication across that divide is working as expected. Typically an integration test will still isolate a part of the entire application and directly verify results in code.

Acceptance test: If you want to write a test that can be run against any running version of your app and verifies at the browser level that the right things happen when you push the right buttons, then you are writing an acceptance test (sometimes called “end to end test”). Such tests typically try to hook into the application as little as possible, beyond perhaps setting up the right data to run a test against.

Load test: Finally you may wish to test that your application works under typical load or see how much load it can handle before it falls over. This is called a load test or stress test. Such tests can be challenging to set up and typically aren’t run often but are very important for confidence before a big production launch.

### Unit tests

```bash
meteor test
```


* https://guide.meteor.com/testing
* tests unitaires avec Meteor


* tests fonctionnels avec Playwright
* solutions pour le déploiement d'app Meteor (mup)

## Application structure

- https://guide.meteor.com/structure.html

# mongodb

This is the repository (pluralsight-mongodb-queries) containing the examples/demos present in the "Querying Data MongoDB" course on Pluralsight

# notes

local
```shell
mongosh
```

remote
```shell
mongosh --host localhost --port 27017
```

remote (shorthand)
```shell
mongosh "localhost:27017"
```

## Viewing and selecting databases

current database
```shell
db
```

list databases
```shell
show dbs
# admin   40.00 KiB
# config  72.00 KiB
# local   40.00 KiB
```

change database
```shell
use config
# switched to db config
```
### mongo import command

https://www.mongodb.com/docs/database-tools/mongoimport/
https://www.mongodb.com/try/download/database-tools

```shell
mongoimport --file C:\Users\nicol\Documents\repositories\experiences\mongodb\pluralsight-mongodb-queries\sampledb\flights.json --db test --collection flights --drop
# 2023-09-18T21:00:17.818+0200    connected to: mongodb://localhost/
# 2023-09-18T21:00:17.850+0200    dropping: test.flights
# 2023-09-18T21:00:17.895+0200    10 document(s) imported successfully. 0 document(s) failed to import.
```

### Create, read, update, delete

create collection
```shell
db.createCollection('aircraft');
# { ok: 1 }
```

show collections
```shell
show collections
# aircraft
# crew
# flights
```

insert documents into collection
```shell
db.aircraft.insertMany([{"code": "1b7ad0de-58...."}]);
# {
#   acknowledged: true,
#   insertedIds: {
#     '0': ObjectId("650846146ac658a06e35e01c"),
#     '1': ObjectId("650846146ac658a06e35e01d"),
#     '2': ObjectId("650846146ac658a06e35e01e"),
#     '3': ObjectId("650846146ac658a06e35e01f"),
#     '4': ObjectId("650846146ac658a06e35e020"),
#     '5': ObjectId("650846146ac658a06e35e021"),
#     '6': ObjectId("650846146ac658a06e35e022"),
#     '7': ObjectId("650846146ac658a06e35e023"),
#     '8': ObjectId("650846146ac658a06e35e024")
#   }
# }
```

count
```shell
db.aircraft.count();
# 9
```

find all

By default the mongo shell is going to split the output in batches of 20.
(type it for more)

```javascript
// anatomy of the find method
// query : optional Filtering using query operators
// projection : optional Specify which fields to display (limit then amount of data sent from the database by eliminating or including specific fields)

find(query, projection): cursor

// output : cursor to the document that match query criteria
```
Cursor : virtual object where mongodb stores the documents returned buy the find method. You can also call methods on the cursor :
* limit
* pretty
* sort
* skip
* count


```shell
db.aircraft.find();
db.aircraft.find().pretty();
# [
#   {
#     _id: ObjectId("650846146ac658a06e35e01c"),
#     code: '1b7ad0de-5836-489b-9791-5a81a51cdb81',
#     model: 'Boeing 737-400',
#     minRunwayLength: 1700,
#     range: 3500,
#     capacity: 189
#   },
#   ...
# ]
```
You cannot include and exclude in the same projection document

```shell
db.aircraft.find({}, {model:1, _id:0});
# [
#   { model: 'Boeing 737-400' },
#   { model: 'Boeing 737-800' },
#   { model: 'Airbus A320' },
#   { model: 'Airbus A319' },
#   { model: 'Boeing 737-900' },
#   { model: 'Embraer E-175' },
#   { model: 'Airbus A350' },
#   { model: 'Boeing 747' },
#   { model: 'ATR 72' }
# ]
```
pagination
```shell
db.aircraft.find().limit(2);
# documents 0, 1
db.aircraft.find().skip(2).limit(2);
# documents 2, 3
```
sorting

```shell
db.aircraft.find({}, {}).sort({field1: val1, field2: val2});
# field : the name of the fields you want to sort by
# 1 for ascending, -1 for descending order
```
mongodb does not guarantee the order of the returned documents unless you use sort()

```shell
db.aircraft.find({}, {model:1, _id:0}).sort({model: 1});
# [
#   { model: 'ATR 72' },
#   { model: 'Airbus A319' },
#   { model: 'Airbus A320' },
#   { model: 'Airbus A350' },
#   { model: 'Boeing 737-400' },
#   { model: 'Boeing 737-800' },
#   { model: 'Boeing 737-900' },
#   { model: 'Boeing 747' },
#   { model: 'Embraer E-175' }
# ]
```

## Understanding query filters and query operators

In MongoDB, we have two methods for finding documents. The first one is find, which is used to select multiple documents from a collection, and the second one is findOne.

* find
* findOne

Obviously, as its name suggests, this is used to select a single document from a collection. If we dig in deeper, we'll see that the find method is a little bit more complex. Find has two optional parameters. The first one is a query object. It's an object in which we can define all the criteria by which you want to fit the data. The second optional parameter is a projection object. Now, we've looked at projections in the previous module, and you know that projections are used to specify what fields you want to show or hide. The find method returns a cursor to the documents that match the query criteria. Now, findOne is pretty similar. It also needs two optional parameters, the query object and a projection object. However, findOne does not return a cursor. Instead, findOne returns an actual document.

### Query filter document

*JSON object which consists of criteria that determine whether a document should be included or excluded from the final result set.*

```javascript
{field: {$operator: value}}
```

#### comparison query operator

* **$eq** : equality
* **$ne** : inequality
* **$in** : in a range of values
* **$nin** : not in a range of values
* **$lt** : less than
* **$lte** : less than or equal
* **$gt** : greater than
* **gte** : greater than or equal
* **$near** : geospatial

equality

```shell
db.aircraft.find({model: 'Boeing 737-900'})
# [
#   {
#     _id: ObjectId("650846146ac658a06e35e020"),
#     code: 'eede6be6-f716-4e2e-bf81-885f0a16a50c',
#     model: 'Boeing 737-900',
#     minRunwayLength: 2975,
#     range: 5600,
#     capacity: 215
#   }
# ]
```
equality with numbers

While this query will also work and will produce the exact same results as the query above, that's because there's an implicit number conversion taking place, and that's handled automatically by MongoDB.

```shell
db.aircraft.find({range: 5600})
db.aircraft.find({range: 5600.00})
```
equality with dates

Dates is also something that you'll encounter pretty often. If you want to filter all the documents that match a particular date, you need to pay attention to the syntax, because in MongoDB, date/time is an object. Notice how we wrap the dates either with ISODate and then we pass in a date/time value as a string, or we can create a new date and pass in the exact same value as a string.
When you're comparing Date objects, don't forget about the time. In this example, you might be tempted to think that you're filtering flights where the departure date is the February 20, 2020, but that would be incorrect. Because we didn't specify the time, an implicit time will be used for us, and that implicit time is 12:00 A.M. So, in fact, you're only going to filter documents that depart on that date at 12:00 A.M.


```shell
db.aircraft.find({departureDate: ISODate("2020-02-20T23:00:00Z")})
db.aircraft.find({departureDate: new Date("2020-02-20T23:00:00Z")})
```

compare id

We can also compare ids, which is a query that you'll write a lot. You can use the special _id field and then wrap your id value using ObjectId.

```shell
db.aircraft.find({_id: ObjectId("xxxxxxxxxxx")})
```

compare arrays

Equality is very versatile in MongoDB. You can use equality to compare whole arrays. Array equality works like this. Your field and the value need to match exactly, meaning they should have the same elements and in the same order. If that's not the case, equality won't return true.

```shell
db.aircraft.find({skills: ["engineering", "planning"]})
```
The same is true for objects. You can compare entire objects for equality, but the same rules apply. The two values need to have the exact keys, the same exact values, and in the same order, but other than that, these are some pretty powerful comparison mechanisms.

Another syntax

```shell
db.aircraft.find({model: {$eq: 'Boeing 737-900'}})
db.aircraft.find({range: {$eq: : 5600}})
db.aircraft.find({departureDate: {$eq: new Date("2020-02-20T23:00:00Z")}})
db.aircraft.find({skills: : {$eq: ["engineering", "planning"]}})
```
Non equality

We have a similar story for non‑equality. The queries will look very similar, but instead of using $eq, we are now using $ne, which stands for not equals.

```shell
db.aircraft.find({range: {$ne: : 5600}})
```

Less than / greater than

These are extremely useful, especially if you want to compare against dates or numbers.

```shell
db.aircraft.find({capacity: {$gt: : 200}})
```

```shell
db.aircraft.find({nextMaintenance: {$gt: ISODate('2020-02-20')}})
db.aircraft.find({nextMaintenance: {$lt: ISODate('2020-02-20')}})
db.aircraft.find({nextMaintenance: {$gt: new Date('2020-02-20')}})
```
In / not in

```shell
db.aircraft.find({model: {$in: ['Airbus A350', 'Boeing 747']}})
# [
#   {
#     _id: ObjectId("650846146ac658a06e35e022"),
#     code: '00126a63-f342-4ccd-ba86-4a7beecf10c0',
#     model: 'Airbus A350',
#     minRunwayLength: 3200,
#     range: 15000,
#     capacity: 300
#   },
#   {
#     _id: ObjectId("650846146ac658a06e35e023"),
#     code: '4f356f56-84dd-484f-a5f7-b960dfba5823',
#     model: 'Boeing 747',
#     minRunwayLength: 3100,
#     range: 14000,
#     capacity: 467
#   }
# ]
```
Things get a little bit complicated when the field that you're using is also an array. If any value from your field matches any value in the provided array, then that document is matched.

Last, but not least, we have a very useful feature where you can use $in or not in, and that is with regular expressions.

```shell
db.aircraft.find({model: {$in: [/^A/]}})
```
#### Geospatial queries

Two geospatial data types that you have available in MongoDB:

* Geo JSON (newer and better format)
* Legacy format

GeoJSON data is usually stored in a subdocument. In our case, that subdocument is the position field. This field needs to contain a property named type and a set of coordinates, which you pass in an array. **Notice that longitude comes before latitude.** This is important because when you're thinking about coordinates, usually start using latitude and then longitude. But that's not the case with GeoJSON.

You also need to create that 2dsphere index for the position field. We're not going to go into details regarding indexes, but do note that you cannot execute geospatial queries without it.

$near

Filters documents where a location filed is between a min and max value in meters from a specified geometry.

```shell
find({field: {

    $near: {

        $geometry: {

            type: 'Point', coordinates: [lon, lat]
        },
        $minDistance: value_meters, # optional
        $maxDistance: value_meters # optional
    }

}}, projection)
```

#### $and / $or

The order of the expressions matters

* {$and : [{expr1}, {expr2}, {expr3}]}
* {$or : [{expr1}, {expr2}, {expr3}]}

```shell
dB.aircraft.find({$and: [{capacity: 124}, {range: {$gt: 6000}}]})
# and short syntax
dB.aircraft.find({$and: [{range: {$lt: 6000}}, {range: {$gt: 3000}}]})
# =>
db.aircraft.find({range: {$lt: 6000, $gt: 3000}})
```

```shell
dB.aircraft.find({$or: [{capacity: 124}, {range: {$gt: 6000}}]})
```

#### Querying null fields, missing fields

Unstructured data (schemaless):
* some fields may be null
* a field may be present ins some documents, but absent in others
* a field with the same name can have multiple types

$exists

```shell
# documents where address does not exist (absent, null)
db.crew.find({address: null});
# $exists : can be use to query documents where a field exists or not regardless of its value
# $exists : whene true, will return the document even the value is null (field exists)
db.crew.find({address: {$exists: false}})

```

$types

BSON types (examples)

| type | number | alias |
|------|--------|-------|
| Double | 1 | "double" |
| String | 2 | "string" |
| Object | 3 | "object" |
| Array | 4 | "array" |
| Boolean | 8 | "bool" |
| Date | 9 | "date" |
| 64-bit integer | 18 | "long" |

```shell
# documents where address field is object
db.crew.find({address: : {$type: 3}})
db.crew.find({address: : {$type: "object"}})

# documents where address field is a string
db.crew.find({address: : {$type: 2}})
db.crew.find({address: : {$type: "string"}})

# documents where address field is nul
# diference : db.crew.find({address: null}); => match documents where address does not exist
db.crew.find({address: : {$type: 10}})
db.crew.find({address: : {$type: "null"}})

```
#### Free text search

* text index :support fast text searched on string and array of strings fields (you cannot perform free text seacrhes withou a text index)
* $text
* $meta

Free text search

you cannot perform free text seacrhes withou a text index.
To create one :

```shell
db.crew.createIndex({name: "text", skills: "text"})
```

Simple text search

```shell
db.crew.find({$text: {$search: {"technical Anna"}}})
```
Sorting by relevance

You can aggregate results by score using the $meta projection operator

```shell
db.crew.find({$text: {$search: {"technical Anna"}}}, {score: {$meta: "textScore"}}).sort({score: {$meta: "textScore"}})

```
