# Train Crowdedness Visualizer
Visualize the crowd in a train, so people can enter and leave more quickly.

## CLI Commands

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# test the production build locally
npm run serve
```

For detailed explanation on how things work, checkout the [CLI Readme](https://github.com/developit/preact-cli/blob/master/README.md).

## API

url: http://trainemulator.azurewebsites.net/
endpoints:

GET /
Get all trains

GET /{id}
Get train by id

POST /random
{ "enabled": "true" | "false" }
Toggle the randomize interval on or off

POST /{id}/edit
{ "destination": "string", "startingPoint": "string" }
Edit train details

POST /{id}/{compartment}/edit
{ "peopleCount": "number" }
Edit compartment detail
