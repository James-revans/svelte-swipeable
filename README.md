# svelte-swipeable

Lightweight library to handle swipe gestures in Svelte

[Animation Component demo ](https://svelte-swipeabe-demo.jamesevans.now.sh/)

### Installation

`npm i svelte-swipeable`

### Animation component

```javascript
import { Animate } from 'svelte-swipeable';
```
```html
 <Animate 
     direction=any 
     stiffness=0.2 
     damping=0.2 
     willReturn=true 
     momentum=0.2
     options={options}
     swipeUp={myFunction}>

     <div>Content</div>
    
 </Animate>       
```

#### Events

| Event      | Triggered                  |
| :--------- | :------------------------- |
| swipeUp    | After swiping up           |
| swipeDown  | After swiping down         |
| swipeRight | After swiping right        |
| swipeLeft  | After swiping left         |
| swipeStart | After mousedown on element |
| swipeMove  | After moving element       |
| swipeEnd   | After mouseup on element   |

#### Event Data

| Data      | Definition                                    |
| :-------- | :-------------------------------------------- |
| x         | Coordinate of new X                           |
| y         | Coordinate of new Y                           |
| initial   | Object containing initial x and y coordinates |
| direction | Object containing x direction and y direction |


```javascript
// Assuming a swipe up of 200px

function handleSwipe(event) {
   console.log(event.detail.initial.y); //0
   console.log(event.detail.y); //200
   console.log(event.detail.direction.y); //up
}
```

#### Options

These thresholds will take effect on all direction-specific events. Default is 0px.

```javascript
let options = {
   threshX: 100, // threshold in x before event is triggered (px)
   threshY: 200 // threshold in y before event is triggered (px)
};
```

### Svelte Action Usage

```javascript
import swipe from 'svelte-swipeable';
```

```html
<div use:swipe="{options}" on:swipeUp="{handleSwipe}">
   Content
</div>
```
