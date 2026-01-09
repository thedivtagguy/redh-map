<script>
	let { entries = [], mapStates = [], onStateChange = () => {} } = $props();

	let activeEntry = $state(null);

	// Overview state - just zooms out to show all POIs from the tile layer
	const overviewState = {
		id: 'timeline-overview',
		center: [-0.1276, 51.5074],
		zoom: 12
	};

	function highlightEntry(entry) {
		activeEntry = entry.id;
		const state = mapStates.find((s) => s.id === entry.id);
		if (state) {
			onStateChange(state);
		}
	}

	function clearHighlight() {
		activeEntry = null;
		onStateChange(overviewState);
	}
</script>

<div class="timeline">
	{#each entries as entry, index}
		<div
			class="entry"
			class:alternate={index % 2 === 1}
			class:active={activeEntry === entry.id}
			class:opacity-50={entry.id === ''}
			onmouseenter={() => highlightEntry(entry)}
			onmouseleave={clearHighlight}
			onclick={() => highlightEntry(entry)}
			role="button"
			tabindex="0"
		>
			<div class="marker" class:big={entry.big}></div>
			<div class="content">
				<div class="title">{entry.title}</div>
				<div class="body">{entry.description}</div>
			</div>
		</div>
	{/each}
</div>

<style>
	.timeline {
		position: relative;
		max-width: 100%;
		padding: 0.5rem 0;
		font-size: 0.75rem;
	}

	/* Center line */
	.timeline::before {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0.5rem;
		width: 1px;
		background-color: var(--vintage-navy, #2c3e50);
		opacity: 0.5;
	}

	.entry {
		position: relative;
		width: calc(100% - 1.5rem);
		padding: 0 0 0 1.25rem;
		text-align: left;
		margin-bottom: 0.4rem;
		cursor: pointer;
		transition: opacity 0.2s;
		opacity: 0.7;
	}

	.entry:hover,
	.entry.active {
		opacity: 1;
	}

	.marker {
		position: absolute;
		width: 6px;
		height: 6px;
		background-color: var(--vintage-crimson, #8b0000);
		border-radius: 100%;
		top: 0.15rem;
		left: 0.25rem;
		z-index: 10;
	}

	.marker.big {
		width: 10px;
		height: 10px;
		left: 0.15rem;
	}

	.title {
		font-family: var(--font-playfair);
		font-size: 0.8rem;
		font-weight: bold;
		color: var(--vintage-navy, #2c3e50);
		margin-bottom: 0.1rem;
		line-height: 1.2;
	}

	.body {
		font-size: 0.7rem;
		line-height: 1.3;
		color: var(--vintage-brown, #5a4a3a);
	}
</style>
