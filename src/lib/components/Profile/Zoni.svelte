<script lang="ts">
	export let zoni: string;
	export let extraStyle: string;

	let titlos: string;
	let color1: string;
	let color2: string;
	let style: string;
	let dans: string = '_';

	if (zoni == '0') {
		color1 = 'White';
		color2 = 'White';
		style = 'border-black text-white';
	} else if (zoni == '1') {
		color1 = 'White';
		color2 = 'White';
		titlos = 'Άσπρη Ζώνη';
		style = 'border-black text-white';
	} else if (zoni == '2') {
		color1 = 'Gold';
		color2 = 'White';
		titlos = 'Μισή Κίτρινη Ζώνη';
		style = 'border-black text-white';
	} else if (zoni == '3') {
		color1 = 'Gold';
		color2 = 'Gold';
		titlos = 'Κίτρινη Ζώνη';
		style = 'border-black text-yellow-300';
	} else if (zoni == '4') {
		color1 = 'Green';
		color2 = 'Gold';
		titlos = 'Μισή Πράσινη Ζώνη';
		style = 'border-black text-yellow-300';
	} else if (zoni == '5') {
		color1 = 'Green';
		color2 = 'Green';
		titlos = 'Πράσινη Ζώνη';
		style = 'border-black text-green-700';
	} else if (zoni == '6') {
		color1 = 'Blue';
		color2 = 'Green';
		titlos = 'Μισή Μπλε Ζώνη';
		style = 'border-black text-green-700';
	} else if (zoni == '7') {
		color1 = 'Blue';
		color2 = 'Blue';
		titlos = 'Μπλε Ζώνη';
		style = 'border-black text-blue-900';
	} else if (zoni == '8') {
		color1 = 'Red';
		color2 = 'Blue';
		titlos = 'Μισή Κόκκινη Ζώνη';
		style = 'border-black text-blue-900';
	} else if (zoni == '9') {
		color1 = 'Red';
		color2 = 'Red';
		titlos = 'Κόκκινη Ζώνη';
		style = 'border-black text-red-500';
	} else if (zoni == '10') {
		color1 = 'Black';
		color2 = 'Red';
		titlos = 'Μισή Μαύρη Ζώνη';
		style = 'border-black text-red-500';
	} else if (zoni == '11') {
		color1 = 'Black';
		color2 = 'Black';
		titlos = 'Μαύρη Ζώνη';
		style = 'border-amber-500 text-black';
	} else if (zoni >= '12') {
		color1 = 'Black';
		color2 = 'Black';
		dans = (parseInt(zoni) - 11).toString();
		titlos = 'Μαύρη Ζώνη ( ' + dans + ' Dan )';
		style = 'border-amber-500 text-amber-500 font-bold';
	}
</script>

<div
	title={titlos}
	style="background: linear-gradient( {color1} 0%, {color1} 50%, {color2} 50%, {color2} 100%);"
	class="rounded-full border-2 {style} {extraStyle}"
>
	{dans}
</div>
