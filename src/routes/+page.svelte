<script lang="ts">
	import SvelteSeo from "svelte-seo";
	import MapView from "$lib/components/MapView.svelte";
	import StoryPanel from "$lib/components/StoryPanel.svelte";
	import MapDetails from "$lib/components/MapDetails.svelte";
	import * as Tabs from "$lib/components/ui/tabs/index.js";
	import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Avatar from "$lib/components/ui/avatar/index.js";
	import { mapStates, pathEntries } from "$lib/config/mapStates.js";
	import mapStyleJson from "./map-style.json";
	import holmesIcon from "/map/sprite/icons/holmes.png";
	import watsonIcon from "/map/sprite/icons/watson.png";
	import jabezIcon from "/map/sprite/icons/jabez.png";
	import jonesIcon from "/map/sprite/icons/jones.png";
	import merryweatherIcon from "/map/sprite/icons/merryweather.png";

	const icons: Record<string, string[]> = {
		"path-jabez-commute": [jabezIcon],
		"path-holmes-watson-afternoon": [holmesIcon, watsonIcon],
		"path-holmes-day": [holmesIcon],
		"path-watson-day": [watsonIcon],
		"path-watson-night": [watsonIcon],
		"path-whole-party": [holmesIcon, watsonIcon, merryweatherIcon, jonesIcon],
		"paths-all": [holmesIcon, watsonIcon, jabezIcon],
	};

	let currentState = $state(mapStates[0]);
	let activePathId = $state<string | null>(null);

	let currentTab = $state("map");
	let showOSLayer = $state(false);

	const mapConfig = {
		center: [-0.1276, 51.5074],
		zoom: 12,
		maxBounds: [
			[-0.27895, 51.459033],
			[0.017681, 51.559356],
		],
		animation: { duration: 4000 },
		rasterLayers: [
			{
				id: "oslondon1893-layer",
				source: {
					type: "raster",
					tiles: [
						"https://api.maptiler.com/tiles/uk-oslondon1k1893/{z}/{x}/{y}.jpg?key=jUQogJjdUL7dRp2zZIgV",
					],
					tileSize: 256,
				},
			},
		],
	};

	function handleStateChange(newState: (typeof mapStates)[number]) {
		currentState = newState;
	}

	function handlePathChange(pathId: string) {
		activePathId = pathId;
	}

	function switchToMapTab() {
		currentTab = "map";
	}

	function toggleOSLayer() {
		showOSLayer = !showOSLayer;
	}
</script>

<SvelteSeo
	title="Mapping The Red-Headed League | A Cartographic Record of Sherlock Holmes"
	description="A map visualization of the movements and locations from 'The Red-Headed League'"
	canonical="https://aman.bh/projects/red-headed-league"
	keywords="Sherlock Holmes, Red-Headed League, Victorian London, interactive map, 1890s London, literary cartography, Arthur Conan Doyle, historical maps, Baker Street"
	openGraph={{
		title: "Mapping The Red-Headed League",
		description:
			"A map visualization of the movements and locations from 'The Red-Headed League'",
		url: "https://aman.bh/projects/red-headed-league",
		type: "website",
		images: [
			{
				url: "https://redh-map.netlify.app/og-image.jpg",
				width: 1200,
				height: 630,
				alt: "Mapping The Red-Headed League - Interactive Map",
			},
		],
		site_name: "Mapping The Red-Headed League",
	}}
	twitter={{
		card: "summary_large_image",
		title: "Mapping The Red-Headed League",
		description:
			"A map visualization of the movements and locations from 'The Red-Headed League'",
		image: "https://redh-map.netlify.app/og-image.jpg",
		imageAlt:
			"Interactive map showing the paths of characters from The Red-Headed League",
	}}
	jsonLd={{
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: "Mapping The Red-Headed League",
		description:
			"A map visualization of the movements and locations from 'The Red-Headed League'",
		url: "https://aman.bh/projects/red-headed-league",
		author: {
			"@type": "Person",
			name: "Aman Bhargava",
			url: "https://aman.bh",
		},
		about: {
			"@type": "CreativeWork",
			name: "The Red-Headed League",
			author: {
				"@type": "Person",
				name: "Arthur Conan Doyle",
			},
			datePublished: "1891",
		},
	}}
/>

{#snippet routeButtonsBar()}
	<div class="shrink-0 bg-transparent border-t border-vintage-gold/30 px-2 min-w-0">
		<ScrollArea class="w-full whitespace-nowrap py-2" orientation="horizontal">
			<div class="flex md:justify-center md:items-center gap-2 min-w-max">
				{#each pathEntries as path}
					{@const pathIcons = icons[path.id] || []}
					{@const isActive = activePathId === path.id}
					<Button
						variant="outline"
						size="sm"
						class="shrink-0 rounded-xs text-[0.65rem] gap-1.5 {isActive
							? 'bg-vintage-gold border-vintage-gold text-vintage-navy-dark '
							: 'bg-vintage-navy border-vintage-parchment/30 text-vintage-parchment hover:bg-vintage-gold hover:text-vintage-navy-dark hover:border-vintage-gold'}"
						onclick={() => {
							const state = mapStates.find((s) => s.id === path.id);
							if (state) {
								handleStateChange(state);
								handlePathChange(path.id);
							}
						}}
					>
						{#if pathIcons.length > 0}
							<div class="flex -space-x-1.5">
								{#each pathIcons as icon}
									<Avatar.Root
										class="size-5 border border-vintage-parchment/50"
									>
										<Avatar.Image src={icon} alt="Character icon" />
									</Avatar.Root>
								{/each}
							</div>
						{/if}
						<span>{path.label}</span>
					</Button>
				{/each}
				<Button
					variant="outline"
					size="sm"
					class="shrink-0 rounded-xs hover:border-vintage-navy text-[0.65rem] gap-1.5 font-semibold {activePathId ===
					'paths-all'
						? 'bg-vintage-gold border-vintage-gold text-vintage-navy-dark '
						: 'bg-vintage-navy border-vintage-parchment/30 text-vintage-parchment hover:bg-vintage-gold hover:text-vintage-navy-dark hover:border-vintage-gold'}"
					onclick={() => {
						const state = mapStates.find((s) => s.id === "paths-all");
						if (state) {
							handleStateChange(state);
							handlePathChange("paths-all");
						}
					}}
				>
					<div class="flex -space-x-1.5">
						{#each icons["paths-all"] as icon}
							<Avatar.Root class="size-5 border border-vintage-navy-dark/50">
								<Avatar.Image src={icon} alt="Character icon" />
							</Avatar.Root>
						{/each}
					</div>
					<span>All</span>
				</Button>
			</div>
		</ScrollArea>
	</div>
{/snippet}

<svelte:head>
	<link
		href="https://unpkg.com/maplibre-gl@4.1.2/dist/maplibre-gl.css"
		rel="stylesheet"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div
	class="flex flex-col h-screen w-screen overflow-hidden bg-vintage-parchment text-vintage-navy p-[var(--frame-border-width)]"
>
	<div class="border-frame">
		<div class="corner corner-nw"></div>
		<div class="corner corner-ne"></div>
		<div class="corner corner-sw"></div>
		<div class="corner corner-se"></div>
		<div class="edge edge-n"></div>
		<div class="edge edge-e"></div>
		<div class="edge edge-s"></div>
		<div class="edge edge-w"></div>
	</div>

	<div class="hidden md:grid grid-cols-[minmax(240px,280px)_minmax(0,1fr)_minmax(200px,220px)] flex-1 min-h-0 gap-0">
		<aside
			class="flex flex-col overflow-hidden border-r border-vintage-navy/30 bg-vintage-parchment"
		>
			<div class="shrink-0 bg-vintage-navy-dark text-vintage-parchment p-4">
				<p class="text-[0.55rem] tracking-[0.15em] opacity-70 mb-1">
					A CARTOGRAPHIC RECORD OF
				</p>
				<h1 class="text-lg font-bold leading-tight mb-1">
					The Red-Headed League
				</h1>

				<div class="pt-2 border-t border-vintage-parchment/20">
					<p class="text-[0.5rem] tracking-[0.1em] opacity-70">ANNO DOMINI</p>
					<p class="text-2xl font-bold text-vintage-gold">1890</p>
				</div>
			</div>

			<div class="flex-1 overflow-y-auto">
				<StoryPanel
					onStateChange={handleStateChange}
					onPathChange={handlePathChange}
					onSwitchToMap={switchToMapTab}
				/>
			</div>
		</aside>

		<main class="relative min-h-0 flex flex-col">
			<div class="flex-1 min-h-0 relative">
				<MapView
					mapStyle={mapStyleJson}
					{mapConfig}
					{currentState}
					{showOSLayer}
				/>
				<div class="absolute top-4 left-4 z-10">
					<Button
						variant="outline"
						size="lg"
						class="backdrop-blur-sm border-vintage-navy/30  hover:bg-vintage-parchment  rounded-sm shadow-md"
						onclick={toggleOSLayer}
					>
						<span class="text-xs font-semibold">
							{showOSLayer ? "Hide" : "Show"} 1893 Map
						</span>
					</Button>
				</div>
			</div>
			{@render routeButtonsBar()}
		</main>

		<aside
			class="flex flex-col overflow-hidden border-l border-vintage-navy/30 bg-vintage-parchment-light"
		>
			<div class="flex-1 overflow-y-auto">
				<MapDetails />
			</div>
		</aside>
	</div>

	<div class="flex md:hidden flex-col flex-1 overflow-hidden">
		<Tabs.Root
			bind:value={currentTab}
			class="flex flex-col flex-1 overflow-hidden"
		>
			<Tabs.List
				class="w-full grid grid-cols-3 bg-vintage-navy-dark rounded-none h-auto p-0"
			>
				<Tabs.Trigger
					value="story"
					class="py-3 px-4 text-sm font-semibold text-vintage-parchment/70 bg-transparent border-b-2 border-transparent rounded-none data-[state=active]:text-vintage-navy data-[state=active]:bg-vintage-parchment  data-[state=active]:border-x-vintage-navy data-[state=active]:shadow-none"
				>
					Story
				</Tabs.Trigger>
				<Tabs.Trigger
					value="map"
					class="py-3 px-4 text-sm font-semibold text-vintage-parchment/70 bg-transparent border-b-2 border-transparent rounded-none data-[state=active]:text-vintage-navy data-[state=active]:bg-vintage-parchment  data-[state=active]:border-x-vintage-navy data-[state=active]:shadow-none"
				>
					Map
				</Tabs.Trigger>
				<Tabs.Trigger
					value="info"
					class="py-3 px-4 text-sm font-semibold text-vintage-parchment/70 bg-transparent border-b-2 border-transparent rounded-none data-[state=active]:text-vintage-navy data-[state=active]:bg-vintage-parchment  data-[state=active]:border-x-vintage-navy data-[state=active]:shadow-none"
				>
					Info
				</Tabs.Trigger>
			</Tabs.List>

			<Tabs.Content
				value="story"
				class="flex-1 overflow-y-auto bg-vintage-parchment"
			>
				<div
					class="bg-vintage-navy-dark text-vintage-parchment p-4 text-center"
				>
					<p class="text-[0.5rem] tracking-[0.15em] opacity-70">
						A CARTOGRAPHIC RECORD OF
					</p>
					<h1 class="text-xl font-bold">The Red-Headed League</h1>
					<p class="text-lg font-bold text-vintage-gold mt-2">1890</p>
				</div>
				<StoryPanel
					onStateChange={handleStateChange}
					onPathChange={handlePathChange}
					onSwitchToMap={switchToMapTab}
				/>
			</Tabs.Content>

			<Tabs.Content
				value="map"
				class="flex-1 flex flex-col overflow-hidden bg-vintage-parchment"
			>
				<div class="flex-1 min-h-0 relative">
					<MapView
						mapStyle={mapStyleJson}
						{mapConfig}
						{currentState}
						{showOSLayer}
					/>
					<div class="absolute top-4 left-4 z-10">
						<Button
							variant="outline"
							size="sm"
							class="bg-vintage-parchment/90 backdrop-blur-sm border-vintage-navy/30 text-vintage-navy hover:bg-vintage-parchment shadow-md"
							onclick={toggleOSLayer}
						>
							<span class="text-xs font-semibold">
								{showOSLayer ? "Hide" : "Show"} 1893 Map
							</span>
						</Button>
					</div>
				</div>
				{@render routeButtonsBar()}
			</Tabs.Content>

			<Tabs.Content
				value="info"
				class="flex-1 overflow-y-auto bg-vintage-parchment"
			>
				<MapDetails />
			</Tabs.Content>
		</Tabs.Root>
	</div>

	<footer
		class="shrink-0 md:hidden flex items-center justify-between md:flex-row flex-col gap-1 py-2 px-3 border-t border-vintage-navy/30 bg-vintage-parchment text-[0.55rem] text-vintage-brown"
	>
		<span class="font-bold text-vintage-navy">
			MDCCCXC · <em>Mapping The Red-Headed League</em> by Dr. John Watson &
			<a href="https://aman.bh" class="text-vintage-crimson hover:underline"
				>Aman Bhargava</a
			>
		</span>
		<a
			href="https://aman.bh/blog/2026/mapping-the-red-headed-league"
			class="text-vintage-crimson hover:underline"
		>
			Read the full article →
		</a>
	</footer>
</div>
