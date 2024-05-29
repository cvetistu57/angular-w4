import { Component } from '@angular/core';
import { TrafficLightComponent } from './traffic-light/traffic-light.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TrafficLightComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'crossroad';

  private mainInterval: any;
  verticalColor:string = 'green';
  horizontalColor: string = 'red';
  accBtnActive:boolean = false;
  isAccident:boolean = false;
  isButtonDisabled:boolean = false;

  ngOnInit(): void {
    this.startLightsInterval();
  }

  clearLightsInterval(){
    clearInterval(this.mainInterval);
  }

  startLightsInterval(){
    if (!this.isAccident) {
      this.mainInterval = setInterval(() => {
        let newVerticalColor = 
          this.verticalColor === 'red' ? 'green' : 'red';
          let newHorizontalColor = 
          this.horizontalColor === 'red' ? 'green' : 'red';

          this.changeToYellow(newVerticalColor, newHorizontalColor);
      }, 5000);
    }
  }

  changeToYellow(newVerticalColor:string, newHorizontalColor:string){
    this.verticalColor = 'yellow';
    this.horizontalColor = 'yellow';
    this.clearLightsInterval();

    setTimeout(() => {
      this.verticalColor = newVerticalColor;
      this.horizontalColor = newHorizontalColor;
      this.startLightsInterval();
    }, 2000);
  }

  processAccident(){
    if (!this.isAccident) {
      this.isAccident = true;
      this.isButtonDisabled = true;
      this.clearLightsInterval();

      const toggleYellow = () => {
        if (this.horizontalColor === 'yellow' && this.verticalColor === 'yellow') {
          this.horizontalColor = 'off';
          this.verticalColor = 'off'
        } else {
          this.horizontalColor = 'yellow';
          this.verticalColor = 'yellow';
        }
      };

      let blinkInterval = setInterval(toggleYellow, 500);

      setTimeout(() => {
        clearInterval(blinkInterval);
        this.isAccident = false;
        this.resetLights();
        this.startLightsInterval();

        setTimeout(() => {
          this.isButtonDisabled = false;
        }, 10000);
      },10000);
    }
  }
  
  resetLights(){
    this.verticalColor = 'red';
    this.horizontalColor = 'green';
  }

  ngOnDestroy(): void {
    this.clearLightsInterval();
  }

  onAccidentBtnCLicked(){
    this.isAccident = true;
    this.accBtnActive = false;

    setTimeout(() => {
      this.accBtnActive = false;
    }, 10000);

    setTimeout(() => {
      this.accBtnActive = true;
    }, 20000);
  }
}
