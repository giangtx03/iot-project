#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>
#include <math.h>

unsigned long previousMillis = 0;
const long blinkInterval = 500;

const char* ssid = "PTIT WIFI";
const char* password = "bachxuantran";
const char* mqtt_server = "172.20.10.3";
const int mqtt_port = 1884;
const char* mqtt_topic = "sensor/data";

bool isWarning = false;
WiFiClient espClient;
PubSubClient client(espClient);

#define DHT_PIN 13
#define QUANG_TRO_PIN 34
#define DHTTYPE DHT11
#define FAN_PIN 25
#define BULB_PIN 26
#define DEHUMIDIFIER_PIN 27
#define WARNING_PIN 32

const char* mqtt_user = "giangtx";
const char* mqtt_pass = "giang123";

DHT dht(DHT_PIN, DHTTYPE);

void setup_wifi() {
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}


void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] :");
  String message = "";
  for (int i = 0; i < length; i++) {
    message += (char)payload[i];
  }
  Serial.println(message);

  bool state = (message == "true");
  String deviceName = "";
  if (strcmp(topic, "device/fan") == 0) {
    digitalWrite(FAN_PIN, state);
    deviceName = "fan";
  }
  else if (strcmp(topic, "device/bulb") == 0) {
    digitalWrite(BULB_PIN, state);
    deviceName = "bulb";
  }
  else if (strcmp(topic, "device/dehumidifier") == 0) {
    digitalWrite(DEHUMIDIFIER_PIN, state);
    deviceName = "dehumidifier";
  }
  String topicName = "device/status/" + deviceName;
  String json = "{\"device\":\"" + deviceName + "\",\"status\":" + (state ? "true" : "false") + "}";

  client.publish(topicName.c_str(), json.c_str());
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    String clientId = "ESP32";
    clientId += String(random(0xffff), HEX);
    if (client.connect(clientId.c_str(), mqtt_user, mqtt_pass)) {
      Serial.println("connected");
      client.subscribe("device/fan");
      client.subscribe("device/bulb");
      client.subscribe("device/dehumidifier");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}

void setup() {
  // sets the pins as outputs:
  Serial.begin(115200);
  dht.begin();
  pinMode(FAN_PIN, OUTPUT);
  pinMode(BULB_PIN, OUTPUT);
  pinMode(DEHUMIDIFIER_PIN, OUTPUT);
  pinMode(WARNING_PIN, OUTPUT);
  setup_wifi();
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);
}

void loop() {
  if (!client.connected()) reconnect();
  client.loop();

  int humidity = round(dht.readHumidity());
  int temperature = round(dht.readTemperature());
  int light = ceil(analogRead(QUANG_TRO_PIN) / 4) + 1;
  int windSpeed = random(0, 91);

  String payload = "{";
      payload += "\"temperature\": " + String(temperature) + ",";
      payload += "\"humidity\": " + String(humidity) + ",";
      payload += "\"light_level\": " + String(light) + ",";
      payload += "\"wind_speed\": " + String(windSpeed) + ",";
      payload += "}";
  client.publish(mqtt_topic, payload.c_str());
  if (windSpeed > 50) {
    for(int i = 0; i < 20; i++) { 
      digitalWrite(WARNING_PIN, HIGH);
      delay(100);
      digitalWrite(WARNING_PIN, LOW);
      delay(100);
    }
  } else {
    digitalWrite(WARNING_PIN, LOW);
    delay(2000);
  }
}