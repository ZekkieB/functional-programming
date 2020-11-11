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
	"amountIncrease": 10,
  "amountDecrease": 4,
  "total:" : 6
}
```


## Dependencies

```
d3: Used for visualizing and updating charts
rollup: used for bundling the JS modules
```