import { LightningElement } from 'lwc';
export default class FireballCaster extends LightningElement {
   fireballClass = 'fireball';
   castFireball() {
       // Trigger animation by changing class
       this.fireballClass = 'fireball animate';
       // Reset so you can re-cast
       setTimeout(() => {
           this.fireballClass = 'fireball';
       }, 1000);
   }
}