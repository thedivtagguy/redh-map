<script>
	let {
		paths = [],
		mapStates = [],
		currentIndex = $bindable(-1),
		onStateChange = () => {},
	} = $props();

	const icons = {
		holmes: "/map/sprite/icons/holmes.png",
		watson: "/map/sprite/icons/watson.png",
		jabez: "/map/sprite/icons/jabez.png",
		jones: "/map/sprite/icons/jones.png",
		merryweather: "/map/sprite/icons/merryweather.png",
	};

	// Line pattern sprites for each track
	const linePatterns = {
		"path-jabez-commute": "/map/sprite/icons/line_02.png",
		"path-holmes-watson-afternoon": "/map/sprite/icons/line_04.png",
		"path-holmes-day": "/map/sprite/icons/line_01.png",
		"path-watson-day": "/map/sprite/icons/line_03.png",
		"path-watson-night": "/map/sprite/icons/line_05.png",
		"path-whole-party": "/map/sprite/icons/line_06.png",
	};

	const pathIcons = {
		"path-jabez-commute": [icons.jabez],
		"path-holmes-watson-afternoon": [icons.holmes, icons.watson],
		"path-holmes-day": [icons.holmes],
		"path-watson-day": [icons.watson],
		"path-watson-night": [icons.watson],
		"path-whole-party": [
			icons.holmes,
			icons.watson,
			icons.merryweather,
			icons.jones,
		],
	};

	function goTo(index) {
		if (index < -1 || index >= paths.length) return;
		currentIndex = index;

		if (index === -1) {
			const introState = mapStates.find((s) => s.id === "paths-intro");
			if (introState) onStateChange(introState);
			return;
		}

		const path = paths[index];
		const stateData = mapStates.find((s) => s.id === path.id);
		if (stateData) {
			onStateChange(stateData);
		}
	}

	function next() {
		if (currentIndex < paths.length - 1) goTo(currentIndex + 1);
		else if (currentIndex === paths.length - 1) showAll();
	}

	function prev() {
		if (currentIndex > -1) goTo(currentIndex - 1);
	}

	function showAll() {
		currentIndex = paths.length;
		const allState = mapStates.find((s) => s.id === "paths-all");
		if (allState) onStateChange(allState);
	}

	const hasPrev = $derived(currentIndex > -1);
	const isShowingAll = $derived(currentIndex === paths.length);
</script>

<div class="path-navigator">
	<ol class="path-list">
		{#each paths as path, i}
			{@const stateData = mapStates.find((s) => s.id === path.id)}
			{@const currentIcons = pathIcons[path.id] || []}
			{@const linePattern = linePatterns[path.id]}
			<li>
				<button
					class="path-item"
					class:active={currentIndex === i}
					class:visited={currentIndex > i}
					onclick={() => goTo(i)}
				>
					<div class="track-visual">
						{#if i < paths.length - 1}
							<div class="connector"></div>
						{/if}
						{#if linePattern}
							<img src={linePattern} alt="Track pattern" class="line-pattern" />
						{:else}
							<span class="path-dot"></span>
						{/if}
					</div>

					<div class="content">
						<div class="flex flex-col">
							<span class="path-label">{path.label}</span>
						</div>
						{#if currentIcons.length > 0}
							<div class="avatars">
								{#each currentIcons as icon}
									<img src={icon} alt="Character icon" class="avatar" />
								{/each}
							</div>
						{/if}
					</div>
				</button>
			</li>
		{/each}
		<!-- Show All Button as final step -->
		<li>
			<button
				class="path-item show-all"
				class:active={isShowingAll}
				onclick={showAll}
			>
				<div class="track-visual">
					<span class="path-dot all"></span>
				</div>
				<div class="content">
					<span class="path-label">All Characters</span>
				</div>
			</button>
		</li>
	</ol>

	<div class="controls">
		<button class="nav-btn" onclick={prev} disabled={!hasPrev}>← Prev</button>
		<button class="nav-btn" onclick={next} disabled={isShowingAll}
			>Next →</button
		>
	</div>
</div>

<style>
	.path-navigator {
		padding: 0.5rem;
	}

	.path-list {
		list-style: none !important;
		padding: 0;
		margin: 0 0 0.5rem 0;
		display: flex;
		flex-direction: column;
	}

	.path-list li {
		padding: 0;
		margin: 0;
		position: relative;
		list-style: none !important;
	}

	.path-list li:before {
		content: none !important;
	}

	.path-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		width: 100%;
		padding: 0.35rem 0.5rem;
		background: transparent;
		border: 1px solid transparent;
		border-radius: 4px;
		cursor: pointer;
		text-align: left;
		position: relative;
		min-height: 2.25rem;
		font-family: var(--font-playfair);
	}

	.path-item:hover {
		background: var(--vintage-navy-dark, rgba(0, 0, 0, 0.1));
		color: var(--vintage-parchment, #f5f0e1);
	}

	.path-item.active {
		background: var(--vintage-navy-dark, rgba(0, 0, 0, 0.15));
		border-color: var(--vintage-gold, #d4af37);
		color: var(--vintage-parchment, #f5f0e1);
	}

	.track-visual {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 65px;
		flex-shrink: 0;
		height: 100%;
		position: relative;
	}

	.path-dot {
		width: 14px;
		height: 14px;
		border-radius: 50%;
		flex-shrink: 0;
		transition: transform 0.2s;
		z-index: 2;
		border: 2px solid var(--vintage-parchment, #f5f0e1);
		box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
	}

	.path-item.active .path-dot {
		transform: scale(1.4);
		box-shadow:
			0 0 0 3px var(--vintage-parchment, #f5f0e1),
			0 0 0 4px var(--vintage-gold, #d4af37);
	}

	.path-dot.all {
		background: var(--vintage-navy, #2c3e50);
	}

	.line-pattern {
		width: 60px;
		height: 12px;
		object-fit: contain;
		flex-shrink: 0;
		z-index: 2;
		opacity: 0.8;
		transition: all 0.2s;
	}

	.path-item.active .line-pattern {
		transform: scale(1.1);
		opacity: 1;
	}

	.path-item:hover .line-pattern {
		opacity: 1;
	}

	.content {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		overflow: hidden;
	}

	.path-label {
		font-size: 0.85rem;
		color: var(--vintage-navy, #2c3e50);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.path-item.active .path-label {
		color: var(--vintage-parchment, #f5f0e1);
		font-weight: 700;
	}

	.path-item:hover .path-label {
		color: var(--vintage-parchment, #f5f0e1);
	}

	.avatars {
		display: flex;
		align-items: center;
		height: 24px;
		flex-shrink: 0;
	}

	.avatar {
		width: 24px;
		height: 24px;
		object-fit: contain;
		border-radius: 50%;
		border: 2px solid var(--vintage-parchment, #f5f0e1);
		background: var(--vintage-parchment-light, #f9f7f3);
		filter: grayscale(100%) opacity(0.7);
		margin-left: -8px;
		position: relative;
		z-index: 1;
	}

	.avatar:first-child {
		margin-left: 0;
	}

	.path-item.active .avatar,
	.path-item:hover .avatar {
		filter: grayscale(0%) opacity(1);
		z-index: 5;
		transform: scale(1.1);
	}

	.path-item.visited .avatar {
		filter: grayscale(0%) opacity(0.8);
	}

	/* Controls */
	.controls {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding-top: 0.5rem;
		border-top: 1px solid rgba(44, 62, 80, 0.2);
	}

	.nav-btn {
		padding: 0.25rem 0.6rem;
		background: var(--vintage-parchment, #f5f0e1);
		border: 1px solid var(--vintage-navy, #2c3e50);
		border-radius: 0.25rem;
		cursor: pointer;
		font-family: var(--font-playfair);
		font-size: 0.75rem;
		color: var(--vintage-navy, #2c3e50);
		transition: all 0.2s;
	}

	.nav-btn:hover:not(:disabled) {
		background: var(--vintage-gold, #d4af37);
		color: var(--vintage-navy-dark, #1a252f);
	}

	.nav-btn:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}
</style>
