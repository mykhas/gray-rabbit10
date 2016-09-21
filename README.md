## gray-rabbit-10
##### Follow the gray rabbit

#### How to run
* run `npm start` to start from this folder
* also you can use already builded app in `dist` and any server you want

#### Details
I've used implementation of Dijkstra's algorythm to find the shortest way in the graph of Kyiv metro. Points data were founded in OS repo.
Leaflet.JS used to draw map, markers, polygons
RxJS used in one tiny case, just to became a bit more familiar with it.

#### Addresses
* `localhost:8080` is our client (port could be changed without problems)
* `localhost:8081` is our server (https://github.com/mykhas/gray-rabbit10-api)

#### Isses
* my algorythm doesn't provide worst way
* graph building and Dijkstra using are bin sophisticated, I thought
* we're calculating edges weights on our client and don't cache them on server


Have fun! :-)