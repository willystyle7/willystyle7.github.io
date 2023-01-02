var mapSettings = {
    bounderybox: [22.104492, 41.071069, 28.806152, 44.402392],
    center: {
        lat: 42.757096,
        lng: 25.458069,
    },
    minZoom: 8,
    tileServer: "https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
    nominatimServer: "https://nominatim.openstreetmap.org/search.php"
};

var app = new Vue({
    el: '#app',
    template: '#main-template',
    data: {
        map: null,
        olSource: null,
        olLayer: null,
        message: 'Hello Vue!',
    },
    computed: {},
    mounted() {
        this.initMap();
    },
    methods: {
        initMap() {
            // TODO
            console.log('in');
            let options = {
                target: document.getElementById('area-map')
            };
            this.map = new ol.Map(options);

            defaultOptions = {
                view: new ol.View({
                    resolution: 1,
                    center: ol.proj.fromLonLat([mapSettings.center.lng, mapSettings.center.lat]),
                    extent: [
                        ...ol.proj.transform(
                            [mapSettings.bounderybox[0], mapSettings.bounderybox[1]],
                            'EPSG:4326',
                            'EPSG:3857'
                        ),
                        ...ol.proj.transform(
                            [mapSettings.bounderybox[2], mapSettings.bounderybox[3]],
                            'EPSG:4326',
                            'EPSG:3857'
                        ),
                    ],
                }),
            }

            this.map.setView(defaultOptions.view);

            this.olSource = new ol.source.OSM({
                url: mapSettings.tileServer,
                crossOrigin: null,
            });

            this.olLayer = new ol.layer.Tile({
                source: this.olSource,
            });
            this.map.addLayer(this.olLayer);

            this.map.getView().calculateExtent(this.map.getSize())
            this.map.getView().setZoom(mapSettings.minZoom)
            this.map.getView().setMinZoom(mapSettings.minZoom)
        }
    }
});
