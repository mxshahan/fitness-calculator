import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import {
  Input,
  Form,
  Item,
  Label,
  Content,
  Container,
  Radio,
  Left,
  Right,
  ListItem,
  Button,
  Toast,
  Icon,
} from "native-base";
import { DEFAULT_COLOR, DEFAULT_COLOR_DARK } from "../constants/color";

const HomeScreen = ({ navigation }) => {
  const [unit, setUnit] = useState(0);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const convertFromDefault = (to) => {
    if (to === 1) {
      height && setHeight((Number(height) * 2.54).toFixed(2));
    } else {
      weight && setWeight((Number(weight) * 2.20462).toFixed(2));
    }
  };

  const convertFromMetric = (to) => {
    if (to === 0) {
      height && setHeight((Number(height) / 2.54).toFixed(2));
    } else {
      weight && setWeight((Number(weight) * 2.20462).toFixed(2));
      height && setHeight((Number(height) / 2.54).toFixed(2));
    }
  };

  const convertFromImperital = (to) => {
    if (to === 0) {
      weight && setWeight((Number(weight) / 2.20462).toFixed(2));
    } else {
      weight && setWeight((Number(weight) / 2.20462).toFixed(2));
      height && setHeight((Number(height) * 2.54).toFixed(2));
    }
  };

  const onChangeUnit = (u) => {
    console.log(Number(""));
    if (unit === 0) {
      convertFromDefault(u);
    } else if (unit === 1) {
      convertFromMetric(u);
    } else {
      convertFromImperital(u);
    }
    setUnit(u);
  };

  const onSubmit = () => {
    if (height && weight) {
      navigation.navigate("Details", {
        unit,
        height: Number(height),
        weight: Number(weight),
      });
    } else {
      Toast.show({
        text: "Please Enter Height & Weight",
        buttonText: "Okay",
        position: "bottom",
        duration: 10000,
      });
    }
  };

  return (
    <Container style={styles.container}>
      <Text style={styles.title}>Hey, What is your measurement today?</Text>
      <Content style={styles.content}>
        <Form>
          <View style={styles.formColumn}>
            <View style={{}}>
              <Text style={{ fontWeight: "bold" }}>Select Unit</Text>
            </View>
            <View style={styles.formInline}>
              <ListItem
                style={styles.listItem}
                noBorder
                onPress={() => onChangeUnit(0)}
              >
                <Radio
                  color={DEFAULT_COLOR}
                  selectedColor={DEFAULT_COLOR_DARK}
                  selected={unit === 0}
                  style={{ marginRight: 5 }}
                  onPress={() => onChangeUnit(0)}
                />
                <Text>Default</Text>
              </ListItem>
              <ListItem
                noBorder
                onPress={() => onChangeUnit(1)}
                style={styles.listItem}
              >
                <Radio
                  color={DEFAULT_COLOR}
                  selectedColor={DEFAULT_COLOR_DARK}
                  selected={unit === 1}
                  style={{ marginRight: 5 }}
                  onPress={() => onChangeUnit(1)}
                />
                <Text>Metric</Text>
              </ListItem>
              <ListItem
                noBorder
                onPress={() => onChangeUnit(2)}
                style={styles.listItem}
              >
                <Radio
                  color={DEFAULT_COLOR}
                  selectedColor={DEFAULT_COLOR_DARK}
                  selected={unit === 2}
                  style={{ marginRight: 5 }}
                  onPress={() => onChangeUnit(2)}
                />
                <Text>Imperital</Text>
              </ListItem>
            </View>
          </View>
          <View style={[styles.formInline, styles.between]}>
            <Item floatingLabel style={styles.formItem}>
              <Label style={styles.label}>
                Weight ({unit === 2 ? "lbs" : "kg"})
              </Label>
              <Input
                style={styles.input}
                value={String(weight)}
                keyboardType="numeric"
                onChangeText={(value) => setWeight(value)}
              />
            </Item>
            <Item floatingLabel style={styles.formItem}>
              <Label style={styles.label}>
                Height ({unit === 1 ? "cm" : "inch"})
              </Label>
              <Input
                style={styles.input}
                value={String(height)}
                keyboardType="numeric"
                onChangeText={(value) => setHeight(value)}
              />
            </Item>
          </View>

          <View
            style={[styles.formInline, styles.centered, styles.btnContainer]}
          >
            <Button iconLeft rounded info style={styles.btn} onPress={onSubmit}>
              <Icon style={styles.icon} name="calculator" />
              <Text style={styles.btnText}>CALCULATE</Text>
            </Button>
          </View>
        </Form>
      </Content>
    </Container>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    color: DEFAULT_COLOR,
    textAlign: "center",
    fontSize: 24,
    marginTop: 50,
    marginBottom: 50,
    letterSpacing: 1,
  },
  form: {},
  input: {
    marginTop: 10,
  },
  formInline: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  formColumn: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  formItem: {
    width: "45%",
    marginLeft: 5,
    marginRight: 5,
  },
  content: {
    margin: 25,
  },
  btn: {
    marginTop: 50,
    padding: 20,
  },
  btnText: {
    color: "white",
    marginLeft: 10,
  },
  btnContainer: {
    padding: 10,
  },
  icon: {
    marginLeft: 0,
  },
  listItem: {
    marginLeft: 0,
  },
  centered: {
    justifyContent: "center",
  },
  between: {
    justifyContent: "space-between",
  },
});
