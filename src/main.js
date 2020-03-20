import Animate from './Animate.svelte';
export { Animate };

export default function swipe(node, options = { threshX: 0, threshY: 0 }) {
   let x;
   let y;
   let initial = {
      x: undefined,
      y: undefined
   };
   let direction = {
      x: undefined,
      y: undefined
   };

   function handleMousedown(event) {
      x = event.clientX;
      y = event.clientY;
      initial.x = event.clientX;
      initial.y = event.clientY;

      node.dispatchEvent(
         new CustomEvent('swipeStart', {
            detail: { x, y }
         })
      );

      window.addEventListener('mousemove', handleMousemove);
      window.addEventListener('mouseup', handleMouseup);
   }

   function handleMousemove(event) {
      const dx = event.clientX - x;
      const dy = event.clientY - y;
      x = event.clientX;
      y = event.clientY;
      (direction.x =
         x - initial.x > options.threshX
            ? 'right'
            : initial.x - x > options.threshX
            ? 'left'
            : undefined),
         (direction.y =
            y - initial.y > options.threshY
               ? 'down'
               : initial.y - y > options.threshY
               ? 'up'
               : undefined);
      node.dispatchEvent(
         new CustomEvent('swipeMove', {
            detail: { x, y, dx, dy, initial, direction }
         })
      );
   }

   function handleMouseup(event) {
      x = event.clientX;
      y = event.clientY;
      if (initial.y - y >= options.threshY) {
         node.dispatchEvent(
            new CustomEvent('swipeUp', {
               detail: { x, y, initial, direction }
            })
         );
      }
      if (y - initial.y >= options.threshY) {
         node.dispatchEvent(
            new CustomEvent('swipeDown', {
               detail: { x, y, initial, direction }
            })
         );
      }
      if (initial.x - x >= options.threshX) {
         node.dispatchEvent(
            new CustomEvent('swipeRight', {
               detail: { x, y, initial, direction }
            })
         );
      }
      if (x - initial.x >= options.threshX) {
         node.dispatchEvent(
            new CustomEvent('swipeLeft', {
               detail: { x, y, initial, direction }
            })
         );
      }

      node.dispatchEvent(
         new CustomEvent('swipeEnd', {
            detail: { x, y, initial, direction }
         })
      );

      window.removeEventListener('mousemove', handleMousemove);
      window.removeEventListener('mouseup', handleMouseup);
   }

   node.addEventListener('mousedown', handleMousedown);

   return {
      destroy() {
         node.removeEventListener('mousedown', handleMousedown);
      }
   };
}
