# Proof of work / Linked Line Service ( API )

Rest Api to allow users to write on a shared log file such that each entry (line) is linked to the previous one using 
itʼs hash and a proof of work.


## Requirements
Node 17 or higher.

## Install
> Install the dependencies with:

```sh
npm install
```

## Usage
> After installing and running the application you can test it using the following call:

### Writing a Linked Line
write on a shared log line linked to the previous one using itʼs hash and a proof of work.


#### Request

> `POST /api/linked-line`

##### Body

```json
{
	"message": "dummy-message"
}
```
> example
```sh
curl --location --request POST 'http://localhost:3000/api/linked-line' \
--header 'Content-Type: application/json' \
--data-raw '{
    "message": "dummy-message"
}'
```

#### Response
> example

> `201 Created`
```json
{
    "message": "dummy-message",
    "hash": "00811e5920353a3c48df523cf135a3a1eaa164b6d64754aaaed1ff180ec889fa",
    "previousHash": "00f2222c89dfe3a18bf20237a97a4b8a996896e54b3925e71de17b3a5639659b",
    "nonce": 244
}
```

##### Errors
> `400 BadRequest` - empty or non message

> `500 InternalServerError` - couldn't writing a linked line

## Run the app
```sh
npm run start-dev
```

## Run the tests
> For both unit tests and integration just by running.
```sh
npm run test
```


## Run the load test
> by using artillery inside
```sh
npm run test:load
```
> After the load test is finished, the validity of the linked lines could be checked by running the following script.

```sh
npm run check:log
```

>an example report artillery

```
All VUs finished. Total time: 1 minute, 2 seconds

--------------------------------
Summary report @ 02:30:30(-0300)
--------------------------------

http.codes.201: ................................................................ 2400
http.request_rate: ............................................................. 34/sec
http.requests: ................................................................. 2400
http.response_time:
  min: ......................................................................... 1
  max: ......................................................................... 606
  median: ...................................................................... 10.9
  p95: ......................................................................... 92.8
  p99: ......................................................................... 391.6
http.responses: ................................................................ 2400
vusers.completed: .............................................................. 2400
vusers.created: ................................................................ 2400
vusers.created_by_name.Linked Line Write: ...................................... 2400
vusers.failed: ................................................................. 0
vusers.session_length:
  min: ......................................................................... 2.6
  max: ......................................................................... 608.2
  median: ...................................................................... 13.3
  p95: ......................................................................... 100.5
  p99: ......................................................................... 399.5

```

