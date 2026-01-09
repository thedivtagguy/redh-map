<script>
	import { onMount, onDestroy } from 'svelte';
	import maplibregl from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import { browser } from '$app/environment';
	import { Protocol } from 'pmtiles';
	import { base } from '$app/paths';

	let { mapStyle, mapConfig = {}, currentState = null, showOSLayer = true } = $props();

	const center = $derived(currentState?.center || mapConfig.center || [-0.1276, 51.5074]);
	const zoom = $derived(currentState?.zoom || mapConfig.zoom || 12);
	const bearing = $derived(currentState?.bearing || 0);
	const pitch = $derived(currentState?.pitch || 0);
	const layers = $derived(currentState?.layers || {});
	const animatedPath = $derived(currentState?.animatedPath || null);
	const showAllPaths = $derived(currentState?.showAllPaths || false);
	const paths = $derived(currentState?.paths || []);
	const showStations = $derived(currentState?.showStations || false);
	const hideLabels = $derived(currentState?.hideLabels || false);
	const bounds = $derived(currentState?.bounds || null);

	const animationDuration = $derived(mapConfig.animation?.duration ?? 2000);

	const stationLayers = $derived(
		mapConfig.interactiveLayers?.stations || [
			'underground-stations-fill',
			'underground-stations-outline',
			'underground-stations-label',
			'stations-marker'
		]
	);

	const trackLayers = $derived(
		mapConfig.interactiveLayers?.tracks || [
			'track-jabez-commute',
			'track-watson-day',
			'track-holmes-day',
			'track-holmes-and-watson',
			'track-watson-night',
			'track-whole-party'
		]
	);

	const arrowLayers = $derived(
		mapConfig.interactiveLayers?.arrows || [
			'track-jabez-commute-arrows',
			'track-watson-day-arrows',
			'track-holmes-day-arrows',
			'track-holmes-and-watson-arrows',
			'track-watson-night-arrows',
			'track-whole-party-arrows'
		]
	);

	const customSourceName = $derived(mapConfig.source || 'london-custom');

	let map = $state(null);
	let mapContainer;
	let mapLoaded = $state(false);

	function getAbsoluteMapStyle(style) {
		if (!style || typeof style !== 'object') return style;
		const origin = window.location.origin;
		const toAbsolute = (url) => (!url?.startsWith('http') ? `${origin}${base}${url}` : url);

		return {
			...style,
			sprite: toAbsolute(style.sprite),
			glyphs: toAbsolute(style.glyphs)
		};
	}

	onMount(() => {
		if (!browser) return;
		if (!mapStyle) {
			console.warn('MapView: No map style provided');
			return;
		}

		const protocol = new Protocol();
		maplibregl.addProtocol('pmtiles', protocol.tile);

		const styleToUse = getAbsoluteMapStyle(mapStyle);

		const mapOptions = {
			container: mapContainer,
			style: styleToUse,
			center,
			zoom,
			bearing,
			pitch,
			attributionControl: false,
			...(mapConfig.maxBounds && { maxBounds: mapConfig.maxBounds })
		};

		map = new maplibregl.Map(mapOptions);

		map.on('load', () => {
			mapLoaded = true;
			map.addControl(new maplibregl.NavigationControl(), 'top-right');

			if (mapConfig.rasterLayers?.length) {
				for (const layer of mapConfig.rasterLayers) {
					if (layer.id && layer.source) {
						const sourceId = layer.id.replace('-layer', '');
						map.addSource(sourceId, layer.source);
						map.addLayer({
							id: layer.id,
							type: 'raster',
							source: sourceId,
							paint: { 'raster-opacity': 0 }
						});
					}
				}
			}
		});
	});

	onDestroy(() => {
		if (map) map.remove();
		maplibregl.removeProtocol('pmtiles');
	});

	$effect(() => {
		if (!map || !mapLoaded) return;

		updateLayers(layers);

		updateStationLayers(showStations);

		updateTracks(animatedPath, showAllPaths, paths);

		updateLabelVisibility(hideLabels);

		updateOSLayerVisibility(showOSLayer);

		const willFitBounds = animatedPath?.layer || showAllPaths;

		if (!willFitBounds) {
			if (
				Array.isArray(center) &&
				center.length === 2 &&
				typeof center[0] === 'number' &&
				typeof center[1] === 'number' &&
				!isNaN(center[0]) &&
				!isNaN(center[1])
			) {
				map.flyTo({
					center,
					zoom,
					bearing,
					pitch,
					duration: animationDuration
				});
			}
		} else {
			if (animatedPath?.layer) {
				if (bounds) {
					map.fitBounds(bounds, {
						padding: { top: 50, bottom: 50, left: 50, right: 50 },
						duration: animationDuration
					});
				} else {
					fitBoundsToPath(animatedPath.layer);
				}
			} else if (showAllPaths) {
				fitBoundsToAllPaths();
			}
		}
	});

	function updateLabelVisibility(hide) {
		if (!map) return;

		const labelLayers = [
			'place-hamlet_small',
			'place_village-std',
			'place_village_small',
			'place_town_big',
			'place_town_std',
			'place-town_small',
			'place_city_big',
			'place_city_of_london',
			'road_name',
			'water_name',
			'ww-river-name',
			'sea-name-low',
			'sea-name-hight'
		];

		const visibility = hide ? 'none' : 'visible';
		for (const layerId of labelLayers) {
			if (map.getLayer(layerId)) {
				map.setLayoutProperty(layerId, 'visibility', visibility);
			}
		}
	}

	function updateOSLayerVisibility(show) {
		if (!map) return;

		const osLayerId = 'oslondon1893-layer';
		if (map.getLayer(osLayerId)) {
			map.setPaintProperty(osLayerId, 'raster-opacity', show ? 1 : 0);
		}
	}

	function updateLayers(currentLayers) {
		if (!map) return;

		const layersToApply = currentLayers || {};

		// Set opacities for layers in current state
		for (const [layerId, opacity] of Object.entries(layersToApply)) {
			if (map.getLayer(layerId)) {
				map.setPaintProperty(layerId, 'raster-opacity', opacity);
			}
		}

		// Reset ALL raster layers not explicitly in current state
		if (mapConfig.rasterLayers?.length) {
			for (const layer of mapConfig.rasterLayers) {
				if (map.getLayer(layer.id) && !(layer.id in layersToApply)) {
					map.setPaintProperty(layer.id, 'raster-opacity', 0);
				}
			}
		}
	}

	function updateStationLayers(show) {
		if (!map) return;

		const visibility = show ? 'visible' : 'none';
		for (const layerId of stationLayers) {
			if (map.getLayer(layerId)) {
				map.setLayoutProperty(layerId, 'visibility', visibility);
			}
		}
	}

	function updateTracks(currentAnimatedPath, currentShowAllPaths, currentPaths) {
		if (!map) return;

		// Reset all tracks and arrows to invisible first
		for (const layerId of trackLayers) {
			if (map.getLayer(layerId)) {
				map.setPaintProperty(layerId, 'line-opacity', 0);
			}
		}
		for (const arrowId of arrowLayers) {
			if (map.getLayer(arrowId)) {
				map.setPaintProperty(arrowId, 'icon-opacity', 0);
			}
		}

		// Show all paths if showAllPaths is true
		if (currentShowAllPaths && currentPaths?.length) {
			for (const pathConfig of currentPaths) {
				const layerId = `track-${pathConfig.layer}`;
				const arrowId = `track-${pathConfig.layer}-arrows`;
				if (map.getLayer(layerId)) {
					map.setPaintProperty(layerId, 'line-opacity', pathConfig.opacity || 0.8);
					if (pathConfig.color) {
						map.setPaintProperty(layerId, 'line-color', pathConfig.color);
					}
				}
				if (map.getLayer(arrowId)) {
					map.setPaintProperty(arrowId, 'icon-opacity', pathConfig.opacity || 0.8);
				}
			}
		}
		// Show single animated path
		else if (currentAnimatedPath?.layer) {
			const layerId = `track-${currentAnimatedPath.layer}`;
			const arrowId = `track-${currentAnimatedPath.layer}-arrows`;

			if (map.getLayer(layerId)) {
				map.setPaintProperty(layerId, 'line-opacity', 0.8);
				if (currentAnimatedPath.color) {
					map.setPaintProperty(layerId, 'line-color', currentAnimatedPath.color);
				}
			}
			if (map.getLayer(arrowId)) {
				map.setPaintProperty(arrowId, 'icon-opacity', 0.8);
			}
		}
	}

	function fitBoundsToPath(layerName) {
		if (!map) return;

		const features = map.querySourceFeatures('tracks-geojson', {
			filter: ['==', ['get', 'layer'], layerName]
		});

		if (features.length > 0) {
			const boundsCalc = new maplibregl.LngLatBounds();

			features.forEach((feature) => {
				if (feature.geometry.type === 'MultiLineString') {
					feature.geometry.coordinates.forEach((line) => {
						line.forEach((coord) => {
							boundsCalc.extend(coord);
						});
					});
				} else if (feature.geometry.type === 'LineString') {
					feature.geometry.coordinates.forEach((coord) => {
						boundsCalc.extend(coord);
					});
				}
			});

			map.fitBounds(boundsCalc, {
				padding: { top: 50, bottom: 50, left: 50, right: 50 },
				duration: animationDuration
			});
		} else {
			setTimeout(() => fitBoundsToPath(layerName), 100);
		}
	}

	function fitBoundsToAllPaths() {
		if (!map) return;

		const features = map.querySourceFeatures('tracks-geojson');

		if (features.length > 0) {
			const boundsCalc = new maplibregl.LngLatBounds();

			features.forEach((feature) => {
				if (feature.geometry.type === 'MultiLineString') {
					feature.geometry.coordinates.forEach((line) => {
						line.forEach((coord) => {
							boundsCalc.extend(coord);
						});
					});
				} else if (feature.geometry.type === 'LineString') {
					feature.geometry.coordinates.forEach((coord) => {
						boundsCalc.extend(coord);
					});
				}
			});

			map.fitBounds(boundsCalc, {
				padding: { top: 50, bottom: 50, left: 50, right: 50 },
				duration: animationDuration
			});
		} else {
			setTimeout(() => fitBoundsToAllPaths(), 100);
		}
	}
</script>

<div class="map-container">
	<div bind:this={mapContainer} class="map-view"></div>
</div>

<style>
	.map-container {
		width: 100%;
		height: 100%;
	}

	.map-view {
		width: 100%;
		height: 100%;
		border-radius: 0;
		overflow: hidden;
	}

	:global(.maplibregl-ctrl-attrib) {
		font-size: 10px;
	}
</style>
