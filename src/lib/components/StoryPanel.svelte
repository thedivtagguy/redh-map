<script lang="ts">
	import { mapStates } from "$lib/config/mapStates.js";
	import jabezWilson from "$lib/assets/538px-The-strand-magazine-1891-08-the-red-headed-league-p190-illu.jpg";
	import holmesExamining from "$lib/assets/446px-The-strand-magazine-1891-08-the-red-headed-league-p192-illu.jpg";
	import fleetStreetCrowd from "$lib/assets/504px-The-strand-magazine-1891-08-the-red-headed-league-p193-illu.jpg";
	import holmesWatsonDiscussing from "$lib/assets/473px-The-strand-magazine-1891-08-the-red-headed-league-p194-illu.jpg";
	import wilsonCopying from "$lib/assets/336px-The-strand-magazine-1891-08-the-red-headed-league-p196-illu.jpg";
	import holmesCurled from "$lib/assets/318px-The-strand-magazine-1891-08-the-red-headed-league-p197-illu.jpg";
	import holmesInspector from "$lib/assets/380px-The-strand-magazine-1891-08-the-red-headed-league-p198-illu.jpg";
	import waitingDarkness from "$lib/assets/312px-The-strand-magazine-1891-08-the-red-headed-league-p199-illu.jpg";
	import clayEmerging from "$lib/assets/282px-The-strand-magazine-1891-08-the-red-headed-league-p201-illu.jpg";
	import holmesCaptures from "$lib/assets/414px-The-strand-magazine-1891-08-the-red-headed-league-p203-illu.jpg";

	let {
		onStateChange = () => {},
		onPathChange = () => {},
		onSwitchToMap = () => {},
	} = $props();

	function goToLocation(stateId: string) {
		const state = mapStates.find((s) => s.id === stateId);
		if (state) {
			onStateChange(state);
			onSwitchToMap();
		}
	}
</script>

<div
	class="flex flex-col h-full overflow-y-auto font-[var(--font-playfair)] scrollbar-thin scrollbar-thumb-vintage-brown scrollbar-track-transparent"
>
	<article
		class="p-4 text-[0.8rem] leading-relaxed text-vintage-navy space-y-4"
	>
		<header class="mb-6">
			<p class="text-[0.7rem] italic text-vintage-brown">
				<span class="text-sm font-bold">By Dr. John Watson,</span>
				<br />published by Arthur Conan Doyle
			</p>
		</header>

		<figure class="my-6 text-center">
			<img
				src={jabezWilson}
				alt="Victorian illustration of Mr. Jabez Wilson, a stout gentleman with striking fiery red hair, wearing a frock-coat and waistcoat"
				class="mx-auto max-w-full h-auto border-2 border-vintage-brown/30 shadow-lg"
				style="max-height: 400px; filter: sepia(0.2);"
			/>
			<figcaption class="text-[0.6rem] italic text-vintage-brown/70 mt-2">
				"Mr. Jabez Wilson."
			</figcaption>
		</figure>

		<section>
			<p
				class="first-letter:text-3xl first-letter:font-bold first-letter:text-vintage-crimson first-letter:float-left first-letter:mr-1"
			>
				I had called upon my friend, Mr. Sherlock Holmes, one day in the autumn
				of last year and found him in deep conversation with a very stout,
				florid-faced, elderly gentleman with fiery red hair.
				<button
					class="inline-flex items-center gap-1 ml-1 bg-vintage-parchment-dark border border-vintage-brown rounded px-1.5 py-0.5 text-[0.65rem] text-vintage-crimson hover:bg-vintage-crimson hover:text-vintage-parchment transition-colors whitespace-nowrap"
					onclick={() => goToLocation("baker-street")}
				>
					<span>📍</span> 221B Baker Street
				</button>
			</p>

			<p>
				"You could not possibly have come at a better time, my dear Watson," he
				said cordially. "This gentleman, Mr. Wilson, has been my partner and
				helper in many of my most successful cases, and I have no doubt that he
				will be of the utmost use to me in yours also."
			</p>

			<p>
				The stout gentleman half rose from his chair and gave a bob of greeting.
				Our visitor bore every mark of being an average commonplace British
				tradesman, obese, pompous, and slow. He wore rather baggy grey
				shepherd's check trousers, a not over-clean black frock-coat, unbuttoned
				in the front, and a drab waistcoat with a heavy brassy Albert chain.
				Altogether, look as I would, there was nothing remarkable about the man
				save his blazing red head.
			</p>

			<p>
				"Beyond the obvious facts that he has at some time done manual labour,
				that he takes snuff, that he is a Freemason, that he has been in China,
				and that he has done a considerable amount of writing lately, I can
				deduce nothing else," said Holmes.
			</p>

			<p>
				Mr. Jabez Wilson started up in his chair. "How, in the name of
				good-fortune, did you know all that, Mr. Holmes?" he asked.
			</p>

			<p>
				Holmes chuckled. "Your hands, my dear sir... The fish tattoo... The
				coin... But can you not find the advertisement, Mr. Wilson?"
			</p>
		</section>
		<figure class="my-6 text-center">
			<img
				src={holmesExamining}
				alt="Victorian illustration showing Sherlock Holmes carefully examining Mr. Wilson while Watson and Wilson look on in Holmes' Baker Street study"
				class="mx-auto max-w-full h-auto border-2 border-vintage-brown/30 shadow-lg"
				style="max-height: 400px; filter: sepia(0.2);"
			/>
			<figcaption class="text-[0.6rem] italic text-vintage-brown/70 mt-2">
				"What on earth does this mean?"
			</figcaption>
		</figure>

		<div
			class="my-6 bg-vintage-parchment-dark p-6 border-2 border-double border-vintage-brown/60 relative shadow-lg transform"
			style="box-shadow: 0 4px 6px -1px rgba(90, 74, 58, 0.3), 0 2px 4px -1px rgba(90, 74, 58, 0.2);"
		>
			<div
				class="absolute inset-0 border-2 border-vintage-brown/20 m-1 pointer-events-none"
			></div>

			<div class="border-b-2 border-vintage-brown/40 pb-3 mb-3">
				<h3
					class="text-center text-[0.9rem] font-bold uppercase tracking-wider text-vintage-navy-dark"
					style="font-variant: small-caps;"
				>
					Notice
				</h3>
			</div>
			<p
				class="font-serif text-[0.75rem] text-vintage-navy-dark leading-relaxed text-justify indent-4"
			>
				"TO THE RED-HEADED LEAGUE: On account of the bequest of the late Ezekiah
				Hopkins, of Lebanon, Pennsylvania, U.S.A., there is now another vacancy
				open which entitles a member of the League to a salary of £4 a week for
				purely nominal services. All red-headed men who are sound in body and
				mind and above the age of twenty-one years, are eligible. Apply in
				person on Monday, at eleven o'clock, to Duncan Ross, at the offices of
				the League, 7 Pope's Court, Fleet Street."
			</p>
			<div class="mt-4 text-center border-t border-vintage-brown/20 pt-3">
				<button
					class="inline-block bg-vintage-parchment border-2 border-vintage-brown rounded-sm px-3 py-1.5 text-[0.65rem] text-vintage-crimson hover:bg-vintage-crimson hover:text-vintage-parchment transition-colors font-bold tracking-wide shadow-sm"
					onclick={() => goToLocation("fleet-street")}
				>
					📍 Pope's Court, Fleet Street
				</button>
			</div>
		</div>

		<section class="space-y-4">
			<p>"What on earth does this mean?" I ejaculated.</p>

			<p>
				"Well, it is just as I have been telling you, Mr. Sherlock Holmes," said
				Jabez Wilson, mopping his forehead. "I have a small pawnbroker's
				business at Coburg Square, near the City.
				<button
					class="inline-flex items-center gap-1 ml-1 bg-vintage-parchment-dark border border-vintage-brown rounded px-1.5 py-0.5 text-[0.65rem] text-vintage-crimson hover:bg-vintage-crimson hover:text-vintage-parchment transition-colors whitespace-nowrap"
					onclick={() => goToLocation("saxe-coburg-square")}
				>
					<span>📍</span> Saxe-Coburg Square
				</button>
				It's not a very large affair, and of late years it has not done more than
				just give me a living. I used to be able to keep two assistants, but now I
				only keep one; and I would have a job to pay him but that he is willing to
				come for half wages so as to learn the business."
			</p>

			<p>"What is the name of this obliging youth?" asked Sherlock Holmes.</p>
			<figure class="my-6 text-center">
				<img
					src={fleetStreetCrowd}
					alt="Victorian illustration depicting Fleet Street and Pope's Court filled with dozens of red-headed men responding to the League advertisement"
					class="mx-auto max-w-full h-auto border-2 border-vintage-brown/30 shadow-lg"
					style="max-height: 400px; filter: sepia(0.2);"
				/>
				<figcaption class="text-[0.6rem] italic text-vintage-brown/70 mt-2">
					"The league has a vacancy."
				</figcaption>
			</figure>
			<p>
				"His name is Vincent Spaulding, and he's not such a youth, either. It's
				hard to say his age. I should not wish a smarter assistant, Mr. Holmes;
				and I know very well that he could better himself and earn twice what I
				am able to give him. But, after all, if he is satisfied, why should I
				put ideas in his head?"
			</p>

			<blockquote
				class="border-l-4 border-vintage-gold pl-3 italic text-vintage-brown"
			>
				"Oh, he has his faults, too," said Mr. Wilson. "Never was such a fellow
				for photography. Snapping away with a camera when he ought to be
				improving his mind, and then diving down into the cellar like a rabbit
				into its hole to develop his pictures. That is his main fault, but on
				the whole he's a good worker."
			</blockquote>

			<p>
				"Spaulding, he came down into the office just this day eight weeks, with
				this very paper in his hand, and he says: 'I wish to the Lord, Mr.
				Wilson, that I was a red-headed man.' He told me that if my hair would
				only change colour, here's a nice little crib all ready for me to step
				into. So I just ordered him to put up the shutters for the day and to
				come right away with me."
			</p>

			<p>
				"I never hope to see such a sight as that again, Mr. Holmes. From north,
				south, east, and west every man who had a shade of red in his hair had
				tramped into the city to answer the advertisement. Fleet Street was
				choked with red-headed folk, and Pope's Court looked like a coster's
				orange barrow."
			</p>
			<figure class="my-6 text-center">
				<img
					src={holmesWatsonDiscussing}
					alt="Victorian illustration of Duncan Ross congratulating Mr. Wilson after examining his red hair at the offices of the Red-Headed League"
					class="mx-auto max-w-full h-auto border-2 border-vintage-brown/30 shadow-lg"
					style="max-height: 400px; filter: sepia(0.2);"
				/>
				<figcaption class="text-[0.6rem] italic text-vintage-brown/70 mt-2">
					"He congratulated me warmly."
				</figcaption>
			</figure>

			<p>
				"However, when our turn came the little man was much more favourable to
				me than to any of the others. He closed the door as we entered, so that
				he might have a private word with us. He seized my hair in both his
				hands, and tugged until I yelled with the pain. 'There is water in your
				eyes,' said he as he released me. 'I perceive that all is as it should
				be.'"
			</p>

			<p>
				"The work? Is to copy out the 'Encyclopaedia Britannica.' You must find
				your own ink, pens, and blotting-paper, but we provide this table and
				chair. Will you be ready to-morrow?"
			</p>

			<p>
				"This went on day after day, Mr. Holmes, and on Saturday the manager
				came in and planked down four golden sovereigns for my week's work.
				Eight weeks passed away like this, and I had written about Abbots and
				Archery and Armour and Architecture and Attica. And then suddenly the
				whole business came to an end."
			</p>
		</section>

		<div
			class="border border-vintage-navy bg-vintage-parchment-light p-3 my-4 text-center"
		>
			<p class="font-bold text-sm">THE RED-HEADED LEAGUE</p>

			<p class="text-[0.7rem]">IS</p>

			<p class="font-bold">DISSOLVED</p>

			<p class="text-[0.65rem] text-vintage-brown mt-1">October 9, 1890</p>
		</div>

		<section class="space-y-4">
			<p>
				Sherlock Holmes and I surveyed this curt announcement and the rueful
				face behind it, until the comical side of the affair so completely
				overtopped every other consideration that we both burst out into a roar
				of laughter.
			</p>

			<p>
				"I went to the landlord," said Wilson, "He said that he had never heard
				of any such body. He said the red-headed man's name was William Morris.
				He was a solicitor and was using my room as a temporary convenience. He
				moved out yesterday to 17 King Edward Street, near St. Paul's."
			</p>

			<figure class="my-6 text-center">
				<img
					src={wilsonCopying}
					alt="Victorian illustration showing Mr. Wilson discovering the closed and locked door of the Red-Headed League office with a dissolution notice posted"
					class="mx-auto max-w-full h-auto border-2 border-vintage-brown/30 shadow-lg"
					style="max-height: 400px; filter: sepia(0.2);"
				/>
				<figcaption class="text-[0.6rem] italic text-vintage-brown/70 mt-2">
					"The door was shut and locked."
				</figcaption>
			</figure>

			<div class="text-center">
				<button
					class="inline-block bg-vintage-parchment-dark border border-vintage-brown rounded px-2 py-1 text-[0.65rem] text-vintage-crimson hover:bg-vintage-crimson hover:text-white transition-colors"
					onclick={() => goToLocation("king-edward-street")}
				>
					<span>📍</span> 17 King Edward Street
				</button>
			</div>

			<p>
				"I started off, Mr. Holmes, but when I got to that address it was a
				manufactory of artificial knee-caps, and no one in it had ever heard of
				either Mr. William Morris or Mr. Duncan Ross."
			</p>

			<p>
				Holmes questioned the client further about the assistant. "Small,
				stout-built, very quick in his ways, no hair on his face... Has a white
				splash of acid upon his forehead."
			</p>
			<p>
				Holmes sat up in his chair in considerable excitement. "I thought as
				much," said he. "That will do, Mr. Wilson. I shall be happy to give you
				an opinion upon the subject in the course of a day or two."
			</p>
		</section>

		<hr class="border-vintage-gold my-6 opacity-50" />

		<section class="space-y-4">
			<p>
				"Well, Watson," said Holmes when our visitor had left us, "what do you
				make of it all?"
			</p>
			<p>
				"I make nothing of it," I answered frankly. "It is a most mysterious
				business."
			</p>

			<figure class="my-6 text-center">
				<img
					src={holmesCurled}
					alt="Victorian illustration of Sherlock Holmes curled up in his chair at Baker Street, deep in thought while smoking his pipe during this three-pipe problem"
					class="mx-auto max-w-full h-auto border-2 border-vintage-brown/30 shadow-lg"
					style="max-height: 400px; filter: sepia(0.2);"
				/>
				<figcaption class="text-[0.6rem] italic text-vintage-brown/70 mt-2">
					"He curled himself up in his chair."
				</figcaption>
			</figure>
			<p>
				"To smoke," he answered. "It is quite a three pipe problem." He curled
				himself up in his chair... Suddenly he sprang out with the gesture of a
				man who has made up his mind.
			</p>

			<p>
				"Sarasate plays at the St. James's Hall this afternoon," he remarked.
				<button
					class="inline-flex items-center gap-1 ml-1 bg-vintage-parchment-dark border border-vintage-brown rounded px-1.5 py-0.5 text-[0.65rem] text-vintage-crimson hover:bg-vintage-crimson hover:text-vintage-parchment transition-colors whitespace-nowrap"
					onclick={() => goToLocation("st-james-hall")}
				>
					<span>📍</span> St. James's Hall
				</button>
				"What do you think, Watson? Could your patients spare you for a few hours?
				I am going through the City first, and we can have some lunch on the way."
			</p>

			<p>
				We travelled by the Underground as far as Aldersgate;
				<button
					class="inline-flex items-center gap-1 ml-1 bg-vintage-parchment-dark border border-vintage-brown rounded px-1.5 py-0.5 text-[0.65rem] text-vintage-crimson hover:bg-vintage-crimson hover:text-vintage-parchment transition-colors whitespace-nowrap"
					onclick={() => goToLocation("aldersgate")}
				>
					<span>📍</span> Aldersgate Stn.
				</button>
				and a short walk took us to Saxe-Coburg Square, the scene of the singular
				story which we had listened to in the morning.
			</p>

			<p>
				Sherlock Holmes stopped in front of it with his head on one side and
				looked it all over, with his eyes shining brightly between puckered
				lids. Finally he returned to the pawnbroker's, and, having thumped
				vigorously upon the pavement with his stick two or three times, he went
				up to the door and knocked.
			</p>

			<p>
				It was instantly opened by a bright-looking, clean-shaven young fellow,
				who asked him to step in. "Thank you," said Holmes, "I only wished to
				ask you how you would go from here to the Strand."
			</p>

			<p>
				"Third right, fourth left," answered the assistant promptly, closing the
				door.
			</p>

			<p>
				"Smart fellow, that," observed Holmes as we walked away. "He is, in my
				judgment, the fourth smartest man in London, and for daring I am not
				sure that he has not a claim to be third."
			</p>

			<p>
				"Why did you beat the pavement?"
				<br />
				"My dear doctor, this is a time for observation, not for talk."
			</p>
			<figure class="my-6 text-center">
				<img
					src={holmesInspector}
					alt="Victorian illustration showing the bright-looking young assistant Vincent Spaulding instantly opening the door when Holmes knocked at the pawnbroker's shop"
					class="mx-auto max-w-full h-auto border-2 border-vintage-brown/30 shadow-lg"
					style="max-height: 400px; filter: sepia(0.2);"
				/>
				<figcaption class="text-[0.6rem] italic text-vintage-brown/70 mt-2">
					"The door was instantly opened."
				</figcaption>
			</figure>

			<p>
				The road in which we found ourselves as we turned round the corner
				presented as great a contrast to the retired Saxe-Coburg Square as the
				front of a picture does to the back. It was one of the main arteries
				which conveyed the traffic of the City.
			</p>

			<p>
				"Let me see," said Holmes, standing at the corner. "I should like just
				to remember the order of the houses here. It is a hobby of mine to have
				an exact knowledge of London. There is Mortimer's, the tobacconist, the
				little newspaper shop, the Coburg branch of the City and Suburban Bank,
				the Vegetarian Restaurant, and McFarlane's carriage-building depot."
				<button
					class="block w-full mt-2 bg-vintage-parchment-dark border border-vintage-brown rounded px-2 py-1 text-[0.65rem] text-center text-vintage-crimson hover:bg-vintage-crimson hover:text-vintage-parchment transition-colors"
					onclick={() => goToLocation("bank")}
				>
					<span>📍</span> The City & Suburban Bank
				</button>
			</p>

			<figure class="my-6 text-center">
				<img
					src={waitingDarkness}
					alt="Victorian illustration of Holmes sitting in the concert hall stalls at St. James's Hall, enjoying Sarasate's violin performance"
					class="mx-auto max-w-full h-auto border-2 border-vintage-brown/30 shadow-lg"
					style="max-height: 400px; filter: sepia(0.2);"
				/>
				<figcaption class="text-[0.6rem] italic text-vintage-brown/70 mt-2">
					"All afternoon he sat in the stalls."
				</figcaption>
			</figure>

			<p>
				"You want to go home, no doubt, Doctor," he remarked as we emerged. "And
				I have some business to do which will take some hours. This business at
				Coburg Square is serious. A considerable crime is in contemplation."
			</p>

			<p>
				"I shall want your help to-night. Ten will be early enough. I shall be
				at Baker Street at ten."
			</p>
		</section>

		<section class="space-y-4">
			<p>
				As I drove home to my house in Kensington I thought over it all, from
				the extraordinary story of the red-headed copier of the "Encyclopaedia"
				down to the visit to Saxe-Coburg Square, and the ominous words with
				which he had parted from me.
				<button
					class="inline-flex items-center gap-1 ml-1 bg-vintage-parchment-dark border border-vintage-brown rounded px-1.5 py-0.5 text-[0.65rem] text-vintage-crimson hover:bg-vintage-crimson hover:text-vintage-parchment transition-colors whitespace-nowrap"
					onclick={() => goToLocation("watson")}
				>
					<span>📍</span> Watson's Home
				</button>
			</p>

			<p>
				It was a quarter-past nine when I started from home and made my way
				across the Park, and so through Oxford Street to Baker Street. On
				entering his room I found Holmes in animated conversation with two men,
				one of whom I recognised as Peter Jones, the official police agent,
				while the other was a long, thin, sad-faced man—Mr. Merryweather.
			</p>

			<p>
				"We're hunting in couples again, Doctor, you see," said Jones. "Our
				friend here is a wonderful man for starting a chase."
			</p>

			<p>
				"John Clay, the murderer, thief, smasher, and forger. He's a young man,
				Mr. Merryweather, but he is at the head of his profession, and I would
				rather have my bracelets on him than on any criminal in London," said
				Jones.
			</p>

			<p>
				We rattled through an endless labyrinth of gas-lit streets until we
				emerged into Farringdon Street.
				<button
					class="inline-flex items-center gap-1 ml-1 bg-vintage-parchment-dark border border-vintage-brown rounded px-1.5 py-0.5 text-[0.65rem] text-vintage-crimson hover:bg-vintage-crimson hover:text-vintage-parchment transition-colors whitespace-nowrap"
					onclick={() => goToLocation("bank")}
				>
					<span>📍</span> The Bank Cellars
				</button>
				We passed down a narrow passage and through a side door. Within there was
				a small corridor, which ended in a very massive iron gate. This led down a
				flight of winding stone steps, which terminated at another formidable gate.
			</p>

			<p>
				"We are at present, Doctor—as no doubt you have divined—in the cellar of
				the City branch of one of the principal London banks. It is our French
				gold," whispered the director. "We have had several warnings that an
				attempt might be made upon it."
			</p>

			<p>
				Holmes shot the slide across the front of his lantern and left us in
				pitch darkness. "They have but one retreat," whispered Holmes. "That is
				back through the house into Saxe-Coburg Square. I hope that you have
				done what I asked you, Jones?"
				<br />
				"I have an inspector and two officers waiting at the front door."
			</p>

			<figure class="my-6 text-center">
				<img
					src={clayEmerging}
					alt="Victorian illustration of Mr. Merryweather lighting a lantern in the dark bank cellar as the group waits in darkness for the thieves"
					class="mx-auto max-w-full h-auto border-2 border-vintage-brown/30 shadow-lg"
					style="max-height: 400px; filter: sepia(0.2);"
				/>
				<figcaption class="text-[0.6rem] italic text-vintage-brown/70 mt-2">
					"Mr. Merryweather stopped to light a lantern."
				</figcaption>
			</figure>

			<p>
				Suddenly my eyes caught the glint of a light. At first it was but a
				lurid spark upon the stone pavement. Then it lengthened out until it
				became a yellow line, and then, without any warning or sound, a gash
				seemed to open and a hand appeared, a white, almost womanly hand, which
				felt about in the centre of the little area of light.
			</p>

			<p>
				With a rending, tearing sound, one of the broad, white stones turned
				over upon its side and left a square, gaping hole. Over the edge there
				peeped a clean-cut, boyish face, which looked keenly about it.
			</p>

			<p class="font-bold text-vintage-navy-dark">
				"It's all clear," he whispered. "Have you the chisel and the bags? Great
				Scott! Jump, Archie, jump, and I'll swing for it!"
			</p>

			<p>
				Sherlock Holmes had sprung out and seized the intruder by the collar.
				The other dived down the hole, and I heard the sound of rending cloth as
				Jones clutched at his skirts. The light flashed upon the barrel of a
				revolver, but Holmes' hunting crop came down on the man's wrist, and the
				pistol clinked upon the stone floor.
			</p>

			<figure class="my-6 text-center">
				<img
					src={holmesCaptures}
					alt="Victorian illustration of Sherlock Holmes capturing John Clay as he emerges from the tunnel in the bank cellar, with Inspector Jones grabbing his accomplice"
					class="mx-auto max-w-full h-auto border-2 border-vintage-brown/30 shadow-lg"
					style="max-height: 400px; filter: sepia(0.2);"
				/>
				<figcaption class="text-[0.6rem] italic text-vintage-brown/70 mt-2">
					"It's no use, John Clay."
				</figcaption>
			</figure>

			<p>
				"It's no use, John Clay," said Holmes blandly. "You have no chance at
				all."
			</p>

			<p>
				"So I see," the other answered with the utmost coolness. "I fancy that
				my pal is all right, though I see you have got his coat-tails."
			</p>

			<p>"There are three men waiting for him at the door," said Holmes.</p>

			<p>
				"Oh, indeed! You seem to have done the thing very completely. I must
				compliment you."
			</p>
		</section>

		<hr class="border-vintage-gold my-6 opacity-50" />

		<section class="space-y-4">
			<p class="first-letter:text-xl font-bold">
				"You see, Watson," he explained in the early hours of the morning as we
				sat over a glass of whisky and soda in Baker Street.
			</p>

			<p>
				"It was perfectly obvious from the first that the only possible object
				of this rather fantastic business of the advertisement of the League,
				and the copying of the 'Encyclopaedia,' must be to get this not
				over-bright pawnbroker out of the way for a number of hours every day."
			</p>

			<p>
				"The method was no doubt suggested to Clay's ingenious mind by the
				colour of his accomplice's hair. From the time that I heard of the
				assistant having come for half wages, it was obvious to me that he had
				some strong motive for securing the situation."
			</p>

			<p>
				"I thought of the assistant's fondness for photography, and his trick of
				vanishing into the cellar. The cellar! There was the end of this tangled
				clue. I could think of nothing save that he was running a tunnel to some
				other building."
			</p>

			<p>
				"I surprised you by beating upon the pavement with my stick. I was
				ascertaining whether the cellar stretched out in front or behind. It was
				not in front. Then I rang the bell. I hardly looked at his face. His
				knees were what I wished to see. You must yourself have remarked how
				worn, wrinkled, and stained they were. They spoke of those hours of
				burrowing."
			</p>

			<p>
				"I walked round the corner, saw the City and Suburban Bank abutted on
				our friend's premises, and felt that I had solved my problem."
			</p>

			<p>
				"You reasoned it out beautifully," I exclaimed in unfeigned admiration.
				"It is so long a chain, and yet every link rings true."
			</p>

			<p>
				"It saved me from ennui," he answered, yawning. "Alas! I already feel it
				closing in upon me. My life is spent in one long effort to escape from
				the commonplaces of existence. These little problems help me to do so."
			</p>
		</section>

		<div class="h-12 text-center text-[0.6rem] text-vintage-brown/50 pt-4">
			- FINIS -
		</div>
	</article>
</div>
