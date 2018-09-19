# center-pivot-irrigation-monitor

* Link: [Hackathon home](https://devpost.com/software/stl-secret-project)
* Link to moving pivot map: http://bit.ly/c-pim
* Video: https://www.youtube.com/watch?v=uuClir8T-K4


## Steps to setup GeoEvent:
1. Get code from https://github.com/cmosnick/center-pivot-irrigation-monitor
    * Run koop as a service (nssm?) on the server
    * Run the "fake API" as a service (nssm?) on the server
    * In "koop/model.js" update the URL to the "fake API"
    * Give the Feature Service GEOJSON URL to the AGS GEP endpoint to be configured:
2. Install AGS and GEP
    * Install favorite version of ArcGIS Server and license
    * Install matching GeoEvent Server version
    * Apply Service Packs and Patches
3. Configure GEP
    * ArcGIS Server Manager URL: https://localhost:6443/arcgis/manager/
    * GeoEvent Manager URL: https://localhost:6143/geoevent/manager/
        * Create GeoFence:
            * Site > GeoEvent > GeoFences
                * Import "pivot access roads" as a GeoFence
                    * If the roads are going to be edited/modified then also setup Synchronization Rules
        * Create Input
            * Poll an External Website for GeoJSON
                * URL from koop: http://<hostname>.esri.com:8080/CPIMKoop/FeatureServer/0/query?f=geojson
                * Create new GeoEvent Definition
                * Test input and view definition. If everything looks good then proceed to Output
        * Create Output
            * Update a Feature
                * Register ArcGIS Server
                * Select folder (Created "cpi")
                * Pick service you want to write to (CPI-Hackathon)
                * Pick layer (intersect_point)
                * Set unique feature identifier field (intersect_point(0))
                * Advanced
                    * Delete Old Features: Yes
                    * Maximum Feature Age: 1
                    * Frequency of Deleting Old Features: 5       
                    * Time Field in Feature Class: CreationDate
                    * Maximum Geatures Per Transaction : 50
                    * Update Only: No
        * Create Service
            * Add Input
            * Add Processor
                * Processor: intersector
                * Geometry Field: geometry
                * Replace Geometry: Yes
                * GeoFence: .*/.* (this will use all of the GeoFences)
                * Output Geometry Type: Point
            * Add Output 
            * Connect and Publish
4. Setup web map and apps
    * Map Layers:
        * Koop
        * Roads
        * Center Pivots
