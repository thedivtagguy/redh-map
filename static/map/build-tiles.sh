#!/bin/bash
set -euo pipefail

BBOX="51.483600,-0.209169,51.533762,-0.060854"
PMTILES_OUT="features.pmtiles"
TIMEOUT=300
LAYERS=("buildings" "parks" "paths" "stations" "trees" "construction" "platforms")
# POIs and tracks are loaded directly as GeoJSON sources in the map style
STATIC_LAYERS=("railways")

get_query() {
    case "$1" in
        buildings)     echo "way[\"amenity\"~\"place_of_worship|town_hall|courthouse\"]($BBOX); relation[\"amenity\"~\"place_of_worship|town_hall|courthouse\"]($BBOX); way[\"railway\"=\"station\"]($BBOX);" ;;
        parks)         echo "way[\"leisure\"~\"park|garden\"]($BBOX); relation[\"leisure\"~\"park|garden\"]($BBOX);" ;;
        paths)         echo "way[\"highway\"~\"footway|path|track\"]($BBOX);" ;;
        stations)      echo "node[\"railway\"=\"station\"][\"station\"=\"subway\"]($BBOX); way[\"railway\"=\"station\"][\"station\"=\"subway\"]($BBOX);" ;;
        trees)         echo "node[\"natural\"=\"tree\"]($BBOX);" ;;
        construction)  echo "way[\"landuse\"=\"construction\"]($BBOX); relation[\"landuse\"=\"construction\"]($BBOX); way[\"construction\"]($BBOX); relation[\"construction\"]($BBOX);" ;;
        railways)      echo "way[\"railway\"=\"subway\"]($BBOX); relation[\"railway\"=\"subway\"]($BBOX); way[\"railway\"=\"rail\"][\"usage\"=\"main\"]($BBOX); relation[\"railway\"=\"rail\"][\"usage\"=\"main\"]($BBOX);" ;;
        platforms)     echo "way[\"railway\"=\"platform\"]($BBOX); relation[\"railway\"=\"platform\"]($BBOX); way[\"public_transport\"=\"platform\"]($BBOX); relation[\"public_transport\"=\"platform\"]($BBOX);" ;;
    esac
}

process_paths() {
    if [ -f "parks.geojson" ] && command -v ogr2ogr &>/dev/null; then
        echo "  - Clipping paths..."
        ogr2ogr -f GeoJSON "paths_tmp.geojson" "paths.geojson" -clipsrc "parks.geojson" -skipfailures && mv "paths_tmp.geojson" "paths.geojson"
    fi
}

process_trees() {
    if [ -f "parks.geojson" ] && command -v ogr2ogr &>/dev/null; then
        echo "  - Clipping trees..."
        ogr2ogr -f GeoJSON "trees_tmp.geojson" "trees.geojson" -clipsrc "parks.geojson" -skipfailures && mv "trees_tmp.geojson" "trees.geojson"
    fi
}

process_platforms() {
    local railways_file="data/london-railways-1890.json"
    if [ -f "$railways_file" ] && [ -f "platforms.geojson" ] && command -v ogr2ogr &>/dev/null; then
        echo "  - Filtering platforms to railway overlaps..."
        # First, create a buffered version of the railways (buffer by ~50 meters in degrees)
        ogr2ogr -f GeoJSON -dialect sqlite \
            -sql "SELECT ST_Buffer(geometry, 0.0005) as geometry FROM railways" \
            railways_buffered.geojson "$railways_file" -skipfailures 2>/dev/null

        if [ -f "railways_buffered.geojson" ]; then
            ogr2ogr -f GeoJSON "platforms_tmp.geojson" "platforms.geojson" \
                -clipsrc "railways_buffered.geojson" -skipfailures 2>/dev/null && \
                mv "platforms_tmp.geojson" "platforms.geojson"
            rm -f railways_buffered.geojson
        else
            echo "  - Warning: Could not buffer railways, keeping all platforms"
        fi
    fi
}

process_stations() {
    if command -v jq &>/dev/null; then
        echo "  - Filtering stations..."
        jq 'del(.features[] | select(.properties.name | test("Baker Street|Aldgate|Farringdon|Barbican|King.*Cross|Euston"; "i") | not))' "stations.geojson" > "stations_tmp.geojson" && mv "stations_tmp.geojson" "stations.geojson"
        echo "  - Renaming stations to 1890s names..."
        jq '(.features[] | select(.properties.name | test("Barbican"; "i")) | .properties.name) |= "Aldersgate Street"' "stations.geojson" > "stations_tmp.geojson" && mv "stations_tmp.geojson" "stations.geojson"
    fi
}

fetch_data() {
    local name=$1
    local q_body=$(get_query "$name")
    local query="[out:json][timeout:$TIMEOUT];(${q_body});(._;>;);out body;"
    local file="${name}.geojson"
    local raw="raw_${name}.json"

    echo ">> Processing layer: $name"

    local servers=("https://overpass-api.de/api/interpreter" "https://overpass.kumi.systems/api/interpreter")
    for url in "${servers[@]}"; do
        curl -s -g -X POST -d "$query" "$url" -o "$raw" --retry 2 --connect-timeout 10 --max-time 60 || continue
        if [[ -s "$raw" ]] && [[ $(head -c 1 "$raw") != "<" ]]; then
            osmtogeojson "$raw" > "$file"
            rm "$raw"
            if type "process_$name" &>/dev/null; then "process_$name"; fi
            return 0
        fi
    done
    echo "!! Failed to fetch $name"
    return 1
}

CMD_ARGS=""

# Fetch all layers in parallel
for layer in "${LAYERS[@]}"; do
    fetch_data "$layer" &
done

wait

# Build command args from successfully fetched layers
for layer in "${LAYERS[@]}"; do
    if [ -f "${layer}.geojson" ]; then
        CMD_ARGS="$CMD_ARGS -L ${layer}:${layer}.geojson"
    fi
done

# Add static layers from data directory (railways only - pois and tracks are GeoJSON sources)
for layer in "${STATIC_LAYERS[@]}"; do
    static_file="data/london-${layer}-1890.json"
    if [ -f "$static_file" ]; then
        CMD_ARGS="$CMD_ARGS -L ${layer}:${static_file}"
    fi
done

if [ -n "$CMD_ARGS" ]; then
    echo ">> Building $PMTILES_OUT..."
    tippecanoe -o "$PMTILES_OUT" $CMD_ARGS \
        -z13 \
        -Z10 \
        --drop-fraction-as-needed \
        --force \
        --generate-ids
else
    echo "!! No data found."
    exit 1
fi

rm -f *.geojson
echo "✅ Done."
