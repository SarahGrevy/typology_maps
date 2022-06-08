mapboxgl.accessToken = 'pk.eyJ1Ijoic2FyYWhncmV2eSIsImEiOiJjbDFwZHg2YzkwMTVqM2lzeTgxa29waDNnIn0.8fJhOwF_qreAF9cEeVNUMw';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/sarahgrevy/cl45rpw2w000k15mpdio87vrt',
    zoom: 3.4,
    maxZoom: 9,
    minZoom: 3,
    center: [-85.5, 37.7]
});






map.on("load", function () {
  map.addLayer({
    id: "us_states_elections_outline",
    type: "line",
    source: {
      type: "geojson",
      data: "data/statesElections.geojson",
    },
    paint: {
      "line-color": "#ffffff",
      "line-width": 0.7,
    },

  },
  "waterway-label" // Here's where we tell Mapbox where to slot this new layer

  );
  map.addLayer({
    id: "us_states_elections",
    type: "fill",
    source: {
      type: "geojson",
      data: "data/typology_map.json",
    },
    paint: {
      "fill-color": [
        "match",
        ["get", "Economic_Type_Label"],
        "Maufacturing", "#FED3DC",
        "Nonspecialized", "#CB7AAA",
        "Farming", "#6D2E6A",
        "Recreation", "#97518E",
        "Federal/State Government", "#86003C",
        "Mining", "#E41F7B",
        "#ffffff",
      ],
      "fill-outline-color": "#ffffff",
    },
  },
 "us_states_elections_outline"// Here's where we tell Mapbox where to slot this new layer
);
});



// Create the popup
map.on('click', 'us_states_elections', function (e) {
  let Economic_Type_Label = e.features[0].properties.Economic_Type_Label;
  let State = e.features[0].properties.State;
  let entries_20 = e.features[0].properties.ENTRIES_20;
  let countyName = e.features[0].properties.County_name;
  new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<h4>' + State + ", " + countyName + '</h4>'
      + Economic_Type_Label
      )
      .addTo(map);
});
// Change the cursor to a pointer when the mouse is over the turnstileData layer.
map.on('mouseenter', 'us_states_elections', function () {
  map.getCanvas().style.cursor = 'pointer';
});
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'us_states_elections', function () {
  map.getCanvas().style.cursor = '';
});



////// MAP 2 //////






var map2 = new mapboxgl.Map({
  container: 'map2',
  style: 'mapbox://styles/sarahgrevy/cl45ugqks000p14poa5awgf6k',
  zoom: 3.4,
  maxZoom: 9,
  minZoom: 3,
  center: [-85.5, 37.7]
});

map2.on('load', function () {
  map2.addLayer({
      'id': 'policeData',
      'type': 'circle',
      'source': {
          'type': 'geojson',
          'data': 'data/police.geojson'
      },
      'paint': {
          'circle-color': '#ff7f50',
          'circle-stroke-color': '#4d4d4d',
          'circle-stroke-width': 0.5,
          'circle-radius': 5
      },

      'paint': {
        'circle-color': '#ff7f50',
        'circle-stroke-color': '#4d4d4d',
        'circle-stroke-width': 0.5,
        'circle-radius': ['interpolate', ['linear'], ['get', 'ENTRIES_DIFF'],
            -1, 10,
            -0.4, 1,
        ]
    }
  });
});
