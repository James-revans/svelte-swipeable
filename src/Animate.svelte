<script>
	import { spring } from 'svelte/motion';
    import swipe from 'svelte-swipeable';

    // Props
    export let stiffness = null;
    export let damping = null;
    export let willReturn = true;
    export let momentum = 0;
    export let options;
    export let swipeUp;
    export let swipeDown;
    export let swipeRight;
    export let swipeLeft;
    export let swipeStart;
    export let swipeMove;
    export let swipeEnd;

    // Local state
    let previousCoords = {
        x: 0,
        y: 0
    }
    const coords = spring({ x: 0, y: 0 }, {
        stiffness: 0,
        damping: 0
	});

    // Function handlers for each event
	function handleSwipeStart() {
        coords.stiffness = coords.damping = 1;

	}
	function handleSwipeMove(event) {
        previousCoords.x = $coords.x;
        previousCoords.y = $coords.y;
		coords.update($coords => ({
			x: $coords.x + event.detail.dx,
			y: $coords.y + event.detail.dy
		}));
	}
	function handleSwipeEnd(event) {
        coords.damping = damping ? damping : 1;
        if(willReturn) {
            coords.stiffness = stiffness ? stiffness : 0;
            coords.set({ x: 0, y: 0 });
        }
        else if(momentum > 0) {
            coords.stiffness = stiffness;
                coords.update($coords => ({ 
                    x: $coords.x + ($coords.x - previousCoords.x)*(momentum * 20), 
                    y: $coords.y + ($coords.y - previousCoords.y)*(momentum * 20), 
                }));
        }
    }
    export let direction;

    $: directions = {
        'vertical': `transform: translateY(${$coords.y}px)`,
        'horizontal': `transform: translateX(${$coords.x}px)`,
        'any': `transform: translate(${$coords.x}px, ${$coords.y}px)`,
        'up': function() {
            if($coords.y <= 0) {
                return `transform: translateY(${$coords.y}px)`
            }
        }(),
        'down': function() {
            if($coords.y >= 0) {
                return `transform: translateY(${$coords.y}px)`
            }
        }(),
        'right': function() {
            if($coords.x >= 0) {
                return `transform: translateX(${$coords.x}px)`
            }
        }(),

        'left': function() {
            if($coords.x <= 0) {
                return `transform: translateX(${$coords.x}px)`
            }
        }(),
    }

    $: movement = directions[direction];

</script>

<div class="container"
    use:swipe={options}
    on:swipeStart={swipeStart}
    on:swipeMove={swipeMove}
    on:swipeEnd={swipeEnd}
    on:swipeUp={swipeUp}
    on:swipeDown={swipeDown}
    on:swipeRight={swipeRight}
    on:swipeLeft={swipeLeft}
    style="{movement}"
>
    <slot></slot>
</div>

