#include "thingProperties.h"

#define PHOTORESISTOR_PIN 34  
#define LED_PIN 5             
#define LIGHT_THRESHOLD 2000 

void setup() {
  Serial.begin(9600);

  initProperties();

  ArduinoCloud.begin(ArduinoIoTPreferredConnection);

  setDebugMessageLevel(2);
  ArduinoCloud.printDebugInfo();

  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  ArduinoCloud.update();
  
  int lightLevel = analogRead(PHOTORESISTOR_PIN); 
  Serial.print("Light Level: ");
  Serial.println(lightLevel);
  
  if (lightLevel < LIGHT_THRESHOLD) { 
    redLED = true;
    digitalWrite(LED_PIN, HIGH);
    ArduinoCloud.update();
  } else {
    redLED = false;
    digitalWrite(LED_PIN, LOW);
    ArduinoCloud.update();
  }
}

void onRedLEDChange() {
  digitalWrite(LED_PIN, redLED ? HIGH : LOW);
  Serial.print("Dashboard Update - LED: ");
  Serial.println(redLED);
}
