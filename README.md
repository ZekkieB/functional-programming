# Functional Programming 2020 - 2021

## How to install

## Live demo

[url](https://zekkieb.github.io/functional-programming/)

## Concept

[See wiki](https://github.com/ZekkieB/functional-programming/wiki/The-concept)


## API

To achieve this, I'm going to make use of the RWD open data api. Specifically the set that is called: GEO VERKOOPPUNT.

```
https://opendata.rdw.nl/resource/cgqw-pfbp.json
```

#### The format of a datum 

```json
{
	"areamanagerid": "299",
	"location":{
		"latitude": "51.930899297",
		"longitude": "6.076162452"
	},
	"sellingpointdesc": "Parkeerterrein Haspelstraat",
	"sellingpointid": "8704",
	"startdatesellingpoint": "20180604"
}
```

#### Desired format

In the datum above, the startdatesellingpoint is fromatted in an akward way. The years, months and days are glued together. And I wish to have the lat/lon in floats instead of strings. So I would be working on having the data cleaned in something like this.

```json
{
	"startDateSellingPoint": "Tue Apr 01 2014 00:00:00 GMT+0200 (Central European Summer Time)",
	"location": [51.930899297,6.076162452]
}
```


## Dependencies

```
{
  "name": "functiona-programming",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "rollup --config"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/ZekkieB/functional-programming.git"
  },
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/ZekkieB/functional-programming/issues"
  },
  "homepage": "https://github.com/ZekkieB/functional-programming#readme",
  "dependencies": {
    "cors": "^2.8.5",
    "d3": "^6.2.0",
    "express": "^4.17.1"
  },
  "devDependencies": {
    "@rollup/plugin-node-resolve": "^10.0.0",
    "rollup": "^2.33.1",
    "rollup-plugin-node-resolve": "^5.2.0",
    "rollup-plugin-uglify": "^6.0.4",
    "uglify": "^0.1.5",
    "uglify-es": "^3.3.9",
    "uglifyjs": "^2.4.11"
  }
}

```