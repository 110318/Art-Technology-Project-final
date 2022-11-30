#include <ArduinoJson.h>
 
StaticJsonDocument<48> doc;
int posX = 0;
int bt;
float rojo ;
int joysBt = 7;
int Xpin = A2;
int switchVal = 0;
 
void setup() {
  pinMode(Xpin,INPUT);
  pinMode(10,INPUT);
  pinMode(7,INPUT);
  pinMode(4, OUTPUT); 
 // digitalWrite(joysBt,HIGH);


  Serial.begin(9600);
  //Serial.println(F("DHTxx test!"));
}
 
void loop() {
  // Wait a few seconds between measurements (slow sensor).
  delay(100);
  posX = analogRead(Xpin);
  bt = digitalRead(7);
  rojo = digitalRead(10);

  if (rojo == 0) {
    digitalWrite(4,LOW);
    delay(1000);
    digitalWrite(10,LOW);
    digitalWrite(4,HIGH);
    delay(5000);
    digitalWrite(4,LOW);

  }

  float x = posX;
  float btn = bt;
  float Botonrojo = rojo;
  doc["JoystickBtn"] = btn;
  doc["PosX"] = x;
  doc["Botonrojo"] = Botonrojo;

 
  // Check if any reads failed and exit early (to try again).
  if (isnan(x) || isnan(btn) || isnan(Botonrojo)) {
    Serial.println(F("Failed"));
    return;
  }
 
  serializeJson(doc, Serial);
  Serial.println();
}