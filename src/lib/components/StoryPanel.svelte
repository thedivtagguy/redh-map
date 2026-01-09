<script lang="ts">
	import { mapStates, pathEntries } from "$lib/config/mapStates.js";

	let { onStateChange = () => {}, onPathChange = () => {}, onSwitchToMap = () => {} } = $props();

	const icons = {
		holmes: "/map/sprite/icons/holmes.png",
		watson: "/map/sprite/icons/watson.png",
		jabez: "/map/sprite/icons/jabez.png",
		jones: "/map/sprite/icons/jones.png",
		merryweather: "/map/sprite/icons/merryweather.png",
	};

	const pathIcons: Record<string, string[]> = {
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

	function goToLocation(stateId: string) {
		const state = mapStates.find((s) => s.id === stateId);
		if (state) {
			onStateChange(state);
			onSwitchToMap();
		}
	}

	function animateRoute(pathId: string) {
		const state = mapStates.find((s) => s.id === pathId);
		if (state) {
			onStateChange(state);
			onPathChange(pathId);
		}
	}

	function showAllRoutes() {
		const state = mapStates.find((s) => s.id === "paths-all");
		if (state) onStateChange(state);
	}
</script>

<div class="flex flex-col h-full overflow-y-auto font-[var(--font-playfair)]">
	<article
		class="p-3 text-[0.75rem] leading-relaxed text-vintage-navy space-y-3"
	>
		<p class="text-lg font-bold text-vintage-crimson text-center my-4">
			"It is a hobby of mine to have an exact knowledge of London."
		</p>

		<p
			class="text-[0.8rem] first-letter:text-2xl first-letter:font-bold first-letter:float-left first-letter:mr-1"
		>
			I had called upon my friend, Mr. Sherlock Holmes, one day in the autumn of
			last year and found him in deep conversation with a very stout,
			florid-faced, elderly gentleman with fiery red hair.
			<button
				class="inline bg-vintage-parchment-light border border-vintage-brown rounded px-1.5 py-0.5 text-[0.65rem] text-vintage-crimson hover:bg-vintage-crimson hover:text-vintage-parchment hover:border-vintage-crimson transition-colors whitespace-nowrap"
				onclick={() => goToLocation("baker-street")}
			>
				📍 221B Baker Street
			</button>
			With an apology for my intrusion, I was about to withdraw when Holmes pulled
			me abruptly into the room and closed the door behind me.
		</p>

		<p>
			"You could not possibly have come at a better time, my dear Watson," he
			said cordially. "This gentleman, Mr. Wilson, has been my partner and
			helper in many of my most successful cases, and I have no doubt that he
			will be of the utmost use to me in yours also."
		</p>

		<p>
			The stout gentleman half rose from his chair and gave a bob of greeting,
			with a quick little questioning glance from his small fat-encircled eyes.
			I took a good look at the man—our visitor bore every mark of being an
			average commonplace British tradesman, obese, pompous, and slow.
			Altogether, look as I would, there was nothing remarkable about the man
			save his blazing red head.
		</p>

		<p>
			"Beyond the obvious facts that he has at some time done manual labour,
			that he takes snuff, that he is a Freemason, that he has been in China,
			and that he has done a considerable amount of writing lately, I can deduce
			nothing else," said Holmes.
		</p>

		<p>
			Mr. Jabez Wilson started up in his chair. "How, in the name of
			good-fortune, did you know all that, Mr. Holmes?"
		</p>

		<div class="border-l-2 border-vintage-gold pl-3 my-4 italic text-[0.7rem]">
			"To the Red-headed League: On account of the bequest of the late Ezekiah
			Hopkins, of Lebanon, Pennsylvania, U.S.A., there is now another vacancy
			open which entitles a member of the League to a salary of £4 a week for
			purely nominal services. All red-headed men who are sound in body and mind
			and above the age of twenty-one years, are eligible. Apply in person on
			Monday, at eleven o'clock, to Duncan Ross, at the offices of the League, 7
			Pope's Court, Fleet Street."
			<button
				class="inline bg-vintage-parchment-light border border-vintage-brown rounded px-1.5 py-0.5 text-[0.65rem] text-vintage-crimson hover:bg-vintage-crimson hover:text-vintage-parchment hover:border-vintage-crimson transition-colors whitespace-nowrap not-italic ml-1"
				onclick={() => goToLocation("fleet-street")}
			>
				📍 Pope's Court
			</button>
		</div>

		<p>
			"What on earth does this mean?" I ejaculated after I had twice read over
			the extraordinary announcement.
		</p>

		<p>
			"Well, it is just as I have been telling you, Mr. Sherlock Holmes," said
			Jabez Wilson, mopping his forehead; "I have a small pawnbroker's business
			at Coburg Square, near the City.
			<button
				class="inline bg-vintage-parchment-light border border-vintage-brown rounded px-1.5 py-0.5 text-[0.65rem] text-vintage-crimson hover:bg-vintage-crimson hover:text-vintage-parchment hover:border-vintage-crimson transition-colors whitespace-nowrap"
				onclick={() => goToLocation("saxe-coburg-square")}
			>
				📍 Jabez Wilson's House
			</button>
			It's not a very large affair, and of late years it has not done more than just
			give me a living. I used to be able to keep two assistants, but now I only keep
			one; and I would have a job to pay him but that he is willing to come for half
			wages so as to learn the business."
		</p>

		<p>"What is the name of this obliging youth?" asked Sherlock Holmes.</p>

		<p>
			"His name is Vincent Spaulding, and he's not such a youth, either. I
			should not wish a smarter assistant, Mr. Holmes. Oh, he has his faults,
			too—never was such a fellow for photography. Snapping away with a camera
			when he ought to be improving his mind, and then diving down into the
			cellar like a rabbit into its hole to develop his pictures."
		</p>

		<p>
			"I never hope to see such a sight as that again, Mr. Holmes. From north,
			south, east, and west every man who had a shade of red in his hair had
			tramped into the city to answer the advertisement. Fleet Street was choked
			with red-headed folk, and Pope's Court looked like a coster's orange
			barrow."
		</p>

		<p>
			"There was nothing in the office but a couple of wooden chairs and a deal
			table, behind which sat a small man with a head that was even redder than
			mine. He took a step backward, cocked his head on one side, and gazed at
			my hair until I felt quite bashful. Then suddenly he plunged forward,
			wrung my hand, and congratulated me warmly on my success."
		</p>

		<p>
			"'The work is to copy out the Encyclopaedia Britannica. There is the first
			volume of it in that press. You must find your own ink, pens, and
			blotting-paper, but we provide this table and chair. Will you be ready
			to-morrow?'"
		</p>

		<p>
			"This went on day after day, Mr. Holmes, and on Saturday the manager came
			in and planked down four golden sovereigns for my week's work. Eight weeks
			passed away like this, and I had written about Abbots and Archery and
			Armour and Architecture and Attica, and hoped with diligence that I might
			get on to the B's before very long."
		</p>

		<div
			class="border border-vintage-navy bg-vintage-parchment-light p-3 my-4 text-center"
		>
			<p class="font-bold text-sm">THE RED-HEADED LEAGUE</p>
			<p class="text-[0.7rem]">IS</p>
			<p class="font-bold">DISSOLVED</p>
			<p class="text-[0.65rem] text-vintage-brown mt-1">October 9, 1890</p>
		</div>

		<p>
			Sherlock Holmes and I surveyed this curt announcement and the rueful face
			behind it, until the comical side of the affair so completely overtopped
			every other consideration that we both burst out into a roar of laughter.
		</p>

		<p>
			"I went to the landlord, who is an accountant living on the ground-floor,
			and I asked him if he could tell me what had become of the Red-headed
			League. He said the gentleman's name was William Morris, a solicitor using
			the room as a temporary convenience. He moved out yesterday to 17 King
			Edward Street, near St. Paul's."
			<button
				class="inline bg-vintage-parchment-light border border-vintage-brown rounded px-1.5 py-0.5 text-[0.65rem] text-vintage-crimson hover:bg-vintage-crimson hover:text-vintage-parchment hover:border-vintage-crimson transition-colors whitespace-nowrap"
				onclick={() => goToLocation("king-edward-street")}
			>
				📍 King Edward Street
			</button>
		</p>

		<p>
			"I started off, Mr. Holmes, but when I got to that address it was a
			manufactory of artificial knee-caps, and no one in it had ever heard of
			either Mr. William Morris or Mr. Duncan Ross."
		</p>

		<p class="font-semibold text-vintage-navy-dark">
			"Well, Watson, what do you make of it all?"
		</p>

		<p>"I make nothing of it. It is a most mysterious business."</p>

		<p>
			"To smoke," he answered. "It is quite a three pipe problem, and I beg that
			you won't speak to me for fifty minutes."
		</p>

		<p>
			"Sarasate plays at the St. James's Hall this afternoon," he remarked.
			<button
				class="inline bg-vintage-parchment-light border border-vintage-brown rounded px-1.5 py-0.5 text-[0.65rem] text-vintage-crimson hover:bg-vintage-crimson hover:text-vintage-parchment hover:border-vintage-crimson transition-colors whitespace-nowrap"
				onclick={() => goToLocation("st-james-hall")}
			>
				📍 St. James's Hall
			</button>
			"What do you think, Watson? Could your patients spare you for a few hours? Then
			put on your hat and come. I am going through the City first, and we can have
			some lunch on the way."
		</p>

		<p>
			We travelled by the Underground as far as Aldersgate
			<button
				class="inline bg-vintage-parchment-light border border-vintage-brown rounded px-1.5 py-0.5 text-[0.65rem] text-vintage-crimson hover:bg-vintage-crimson hover:text-vintage-parchment hover:border-vintage-crimson transition-colors whitespace-nowrap"
				onclick={() => goToLocation("aldersgate")}
			>
				📍 Aldersgate Station
			</button>
			; and a short walk took us to Saxe-Coburg Square, the scene of the singular
			story which we had listened to in the morning. It was a poky, little, shabby-genteel
			place, where four lines of dingy two-storied brick houses looked out into a
			small railed-in enclosure.
		</p>

		<p>
			Sherlock Holmes stopped in front of it with his head on one side and
			looked it all over, with his eyes shining brightly between puckered lids.
			Then he walked slowly up the street, and then down again to the corner,
			still looking keenly at the houses. Finally he returned to the
			pawnbroker's, and, having thumped vigorously upon the pavement with his
			stick two or three times, he went up to the door and knocked.
		</p>

		<p>
			"Thank you," said Holmes, "I only wished to ask you how you would go from
			here to the Strand."
		</p>

		<p>
			"Third right, fourth left," answered the assistant promptly, closing the
			door.
		</p>

		<p>
			"Smart fellow, that," observed Holmes as we walked away. "He is, in my
			judgment, the fourth smartest man in London, and for daring I am not sure
			that he has not a claim to be third."
		</p>

		<p>
			The road in which we found ourselves as we turned round the corner
			presented as great a contrast to the retired Saxe-Coburg Square as the
			front of a picture does to the back. It was one of the main arteries which
			conveyed the traffic of the City.
		</p>

		<p>
			"Let me see," said Holmes, standing at the corner and glancing along the
			line, "I should like just to remember the order of the houses here. It is
			a hobby of mine to have an exact knowledge of London. There is Mortimer's,
			the tobacconist, the little newspaper shop, the Coburg branch of the City
			and Suburban Bank
			<button
				class="inline bg-vintage-parchment-light border border-vintage-brown rounded px-1.5 py-0.5 text-[0.65rem] text-vintage-crimson hover:bg-vintage-crimson hover:text-vintage-parchment hover:border-vintage-crimson transition-colors whitespace-nowrap"
				onclick={() => goToLocation("bank")}
			>
				📍 The Bank
			</button>
			, the Vegetarian Restaurant, and McFarlane's carriage-building depot."
		</p>

		<p>
			My friend was an enthusiastic musician, being himself not only a very
			capable performer but a composer of no ordinary merit. All the afternoon
			he sat in the stalls wrapped in the most perfect happiness, gently waving
			his long, thin fingers in time to the music.
		</p>

		<p>
			"You want to go home, no doubt, Doctor," he remarked as we emerged. "And I
			have some business to do which will take some hours. This business at
			Coburg Square is serious."
		</p>

		<p>
			"A considerable crime is in contemplation. I shall want your help
			to-night. At what time?"
		</p>

		<p>"Ten will be early enough. I shall be at Baker Street at ten."</p>

		<p>
			"Very well. And, I say, Doctor, there may be some little danger, so kindly
			put your army revolver in your pocket."
		</p>

		<p>
			As I drove home to my house in Kensington
			<button
				class="inline bg-vintage-parchment-light border border-vintage-brown rounded px-1.5 py-0.5 text-[0.65rem] text-vintage-crimson hover:bg-vintage-crimson hover:text-vintage-parchment hover:border-vintage-crimson transition-colors whitespace-nowrap"
				onclick={() => goToLocation("watson")}
			>
				📍 Watson's House
			</button>
			I thought over it all, from the extraordinary story of the red-headed copier
			of the Encyclopaedia down to the visit to Saxe-Coburg Square, and the ominous
			words with which he had parted from me.
		</p>

		<p>
			It was a quarter-past nine when I started from home and made my way across
			the Park, and so through Oxford Street to Baker Street. Two hansoms were
			standing at the door, and as I entered the passage I heard the sound of
			voices from above.
		</p>

		<p>
			"Ha! Our party is complete," said Holmes, buttoning up his pea-jacket and
			taking his heavy hunting crop from the rack. "Watson, I think you know Mr.
			Jones, of Scotland Yard? Let me introduce you to Mr. Merryweather, who is
			to be our companion in to-night's adventure."
		</p>

		<p>
			"John Clay, the murderer, thief, smasher, and forger. He's a young man,
			Mr. Merryweather, but he is at the head of his profession, and I would
			rather have my bracelets on him than on any criminal in London."
		</p>

		<p>
			We rattled through an endless labyrinth of gas-lit streets until we
			emerged into Farringdon Street. Our cabs were dismissed, and, following
			the guidance of Mr. Merryweather, we passed down a narrow passage and
			through a side door. Within there was a small corridor, which ended in a
			very massive iron gate. This led down a flight of winding stone steps,
			which terminated at another formidable gate.
		</p>

		<p>
			"We are at present, Doctor—as no doubt you have divined—in the cellar of
			the City branch of one of the principal London banks. It is our French
			gold. We had occasion some months ago to strengthen our resources and
			borrowed for that purpose 30,000 napoleons from the Bank of France."
		</p>

		<p>
			What a time it seemed! My limbs were weary and stiff, yet my nerves were
			worked up to the highest pitch of tension. Suddenly my eyes caught the
			glint of a light.
		</p>

		<p>
			At first it was but a lurid spark upon the stone pavement. Then it
			lengthened out until it became a yellow line, and then, without any
			warning or sound, a gash seemed to open and a hand appeared, a white,
			almost womanly hand, which felt about in the centre of the little area of
			light.
		</p>

		<p>
			With a rending, tearing sound, one of the broad, white stones turned over
			upon its side and left a square, gaping hole. Over the edge there peeped a
			clean-cut, boyish face, which looked keenly about it.
		</p>

		<p class="font-semibold">
			"It's all clear. Have you the chisel and the bags? Great Scott! Jump,
			Archie, jump, and I'll swing for it!"
		</p>

		<p>
			Sherlock Holmes had sprung out and seized the intruder by the collar. The
			light flashed upon the barrel of a revolver, but Holmes' hunting crop came
			down on the man's wrist, and the pistol clinked upon the stone floor.
		</p>

		<p class="text-lg font-bold text-vintage-crimson text-center my-4">
			"It's no use, John Clay. You have no chance at all."
		</p>

		<p>
			"So I see," the other answered with the utmost coolness. "I fancy that my
			pal is all right, though I see you have got his coat-tails."
		</p>

		<p>"Your red-headed idea was very new and effective," said Holmes.</p>
	</article>
</div>
