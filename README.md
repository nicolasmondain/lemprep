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

* https://guide.meteor.com/data-loading.html#publishing-relations
* https://stackoverflow.com/questions/20871496/meteor-reactive-join-with-publish-with-relations-package

## Cron

* https://stackoverflow.com/questions/40687237/cron-jobs-in-meteor
* https://forums.meteor.com/t/how-to-bind-meteor-for-cron-job/47120/2

## Imports dynamiques

* https://medium.com/@vincent.bocquet/dynamic-import-in-javascript-a-simple-guide-a808cff86458
* https://dmitripavlutin.com/ecmascript-modules-dynamic-import/
* https://flaviocopes.com/javascript-dynamic-import/

## Trackers.autorun()

* https://docs.meteor.com/api/tracker.html


- l'usage des Trackers.autorun() (à quoi ça sert, pourquoi il faut pas les sur-utiliser)





- quand NE PAS faire de la réactivité

- c'est quoi une low level collection et comment tu la déclares, comment tu accèdes à la db sans passer par la surcouche Meteor

- comment faire une agrégation

- comment marche le driver Mongo

- comment marche la réactivité : différence entre les oplogs et les polls

- comment désactiver les oplogs (soit passer par des polls soit les low collections)

- impacts des oplogs sur les perfs réseau quand tu as 2K concurrent connexions

- usage des low coll pour l'usage des updateMany et améliorations de perfs

- comment placer des hooks sur les opérations CRUD

- tests unitaires avec Meteor

- tests fonctionnels avec Playwright

- solutions pour le déploiement d'app Meteor (mup)

## Application structure

- https://guide.meteor.com/structure.html
