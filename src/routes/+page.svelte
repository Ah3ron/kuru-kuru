<script>
	import kuru_kuru from '$lib/assets/kuru_kuru.mp3';
	import Herta0 from '$lib/assets/herta_0.png';
	import Herta1 from '$lib/assets/herta_1.png';
	import Herta2 from '$lib/assets/herta_2.png';
	import Herta3 from '$lib/assets/herta_3.png';
	import Herta4 from '$lib/assets/herta_4.png';
	import Herta5 from '$lib/assets/herta_5.png';

	const frames = [Herta0, Herta1, Herta2, Herta3, Herta4, Herta5];
	let hertas = [];

	function createHerta() {
		const audio = new Audio(kuru_kuru);
		audio.loop = true;
		audio.volume = 0.25;
		audio.play();

		const newHerta = {
			id: Date.now(),
			x: Math.random() * (window.innerWidth - 100),
			y: Math.random() * (window.innerHeight - 100),
			rotation: 0,
			currentFrame: 0,
			direction: {
				x: (Math.random() - 0.5) * 5,
				y: (Math.random() - 0.5) * 5
			}
		};

		hertas = [...hertas, newHerta];
		animateHerta(newHerta);
		animateFrame(newHerta);
	}

	function animateFrame(herta) {
		const frameInterval = setInterval(() => {
			const index = hertas.findIndex((h) => h.id === herta.id);
			if (index === -1) {
				clearInterval(frameInterval);
				return;
			}

			const updatedHerta = { ...hertas[index] };
			updatedHerta.currentFrame = (updatedHerta.currentFrame + 1) % frames.length;

			hertas = hertas.map((h) => (h.id === herta.id ? updatedHerta : h));
		}, 60); // 0.06 seconds = 60 milliseconds
	}

	function animateHerta(herta) {
		function update() {
			const index = hertas.findIndex((h) => h.id === herta.id);
			if (index === -1) return;

			const updatedHerta = { ...hertas[index] };
			updatedHerta.x += herta.direction.x;
			updatedHerta.y += herta.direction.y;
			updatedHerta.rotation += 5;

			if (updatedHerta.x <= 0 || updatedHerta.x >= window.innerWidth - 100) {
				herta.direction.x *= -1;
				updatedHerta.x += herta.direction.x;
			}
			if (updatedHerta.y <= 0 || updatedHerta.y >= window.innerHeight - 100) {
				herta.direction.y *= -1;
				updatedHerta.y += herta.direction.y;
			}

			hertas = hertas.map((h) => (h.id === herta.id ? updatedHerta : h));
			requestAnimationFrame(update);
		}

		requestAnimationFrame(update);
	}
</script>

<div class="fixed inset-0 bg-[#161616]">
	{#each hertas as herta (herta.id)}
		<img
			src={frames[herta.currentFrame]}
			alt="Herta"
			class="absolute h-24 w-24"
			style="left: {herta.x}px; top: {herta.y}px; transform: rotate({herta.rotation}deg);"
		/>
	{/each}

	<div class=" flex h-screen w-full items-center justify-center">
		<div
			class="relative animate-gradient rounded-lg bg-[linear-gradient(to_right,#ee5396,#ff7eb6,#be95ff,#82cfff,#be95ff,#ff7eb6,#ee5396)] bg-[length:200%_auto] text-xl duration-300 hover:scale-110"
		>
			<button
				on:click={createHerta}
				class="m-1 rounded-lg bg-[#161616] px-8 py-3 transition-all active:bg-transparent"
			>
				<span
					class="animate-gradient rounded-lg bg-[linear-gradient(to_right,#ee5396,#ff7eb6,#be95ff,#82cfff,#be95ff,#ff7eb6,#ee5396)] bg-[length:200%_auto] bg-clip-text font-extrabold text-transparent active:bg-transparent active:text-[#161616]"
				>
					Click me!
				</span>
			</button>
		</div>
	</div>
</div>
