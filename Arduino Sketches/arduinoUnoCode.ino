#define PHOTORESISTOR0_PIN A0  
#define PHOTORESISTOR1_PIN A1 
#define PHOTORESISTOR2_PIN A2  
#define PHOTORESISTOR3_PIN A3

#define OUT0 4  
#define OUT1 5
#define OUT2 6
#define OUT3 7

#define LIGHT_THRESHOLD 300  // Adjust this based on your voltage readings

void setup() {
  // Initialize serial communication for debugging
  Serial.begin(9600);
  
  // Set output pins
  pinMode(OUT0, OUTPUT);
  pinMode(OUT1, OUTPUT);
  pinMode(OUT2, OUTPUT);
  pinMode(OUT3, OUTPUT);
  
  // Set photoresistor pins as inputs (this is default for analog pins)
  pinMode(PHOTORESISTOR0_PIN, INPUT);
  pinMode(PHOTORESISTOR1_PIN, INPUT);
  pinMode(PHOTORESISTOR2_PIN, INPUT);
  pinMode(PHOTORESISTOR3_PIN, INPUT);
}

void loop() {
  // Read all photoresistor values
  int value0 = analogRead(PHOTORESISTOR0_PIN);
  int value1 = analogRead(PHOTORESISTOR1_PIN);
  int value2 = analogRead(PHOTORESISTOR2_PIN);
  int value3 = analogRead(PHOTORESISTOR3_PIN);
  
  // Set outputs based on threshold comparison
  digitalWrite(OUT0, value0 > LIGHT_THRESHOLD ? HIGH : LOW);
  digitalWrite(OUT1, value1 > LIGHT_THRESHOLD ? HIGH : LOW);
  digitalWrite(OUT2, value2 > LIGHT_THRESHOLD ? HIGH : LOW);
  digitalWrite(OUT3, value3 > LIGHT_THRESHOLD ? HIGH : LOW);
  
  // Print values for debugging (optional)
  Serial.print("Values: ");
  Serial.print(value0);
  Serial.print(", ");
  Serial.print(value1);
  Serial.print(", ");
  Serial.print(value2);
  Serial.print(", ");
  Serial.println(value3);
  
  // Small delay to stabilize readings
  delay(100);
}
