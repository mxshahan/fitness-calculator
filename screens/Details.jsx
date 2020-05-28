import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Badge,
  Container,
  Content,
  Card,
  CardItem,
  H3,
  Body,
  Button,
  Icon,
} from "native-base";

import { StyleSheet } from "react-native";
import {
  DEFAULT_COLOR,
  DEFAULT_COLOR_DARK,
  SUCCESS_COLOR,
  WARNING_COLOR,
  DANGER_COLOR,
} from "../constants/color";

const DetailsScreen = ({ route, navigation }) => {
  const [ans, setAns] = useState(0);
  useEffect(() => {
    console.log(route.params);
    if (route.params) {
      let value = 0;
      const { unit, height, weight } = route.params;
      if (unit === 0) {
        // kg/inch^2
        value = weight / Math.pow(height * 0.0254, 2);
        console.log("0", value);
      } else if (unit === 1) {
        // kg/cm^2
        value = weight / Math.pow(height / 100, 2);

        console.log("1", value);
      } else {
        // lbs/inch^s
        value = 703 * (weight / Math.pow(height, 2));

        console.log("2", value);
      }
      setAns(value.toFixed(1));
    }
  }, [route.params]);

  let message = "";
  let color = SUCCESS_COLOR;
  if (ans <= 16) {
    color = DANGER_COLOR;
    message =
      "Ops, you are not fit yet. Try eat some food and perform regular excercise";
  } else if (ans > 16 && ans <= 18.5) {
    color = WARNING_COLOR;
    message =
      "Ah, your body is not fully fit but you are very close. Try eat food and excercise regularly";
  } else if (ans > 18.5 && ans <= 25) {
    color = SUCCESS_COLOR;
    message =
      "Congratulation, your measurement is accurate. You are fit today.";
  } else if (ans > 25 && ans <= 30) {
    color = WARNING_COLOR;
    message = "Ah, buddy keep yourself fit. loose some weight to feel better";
  } else {
    color = DANGER_COLOR;
    message =
      "Ops :( You are too much overweight. To feel better loose your weight";
  }

  return (
    <Container>
      <Content>
        <View style={styles.heading}>
          <Text style={styles.headingText}>Your BMI Score: </Text>
          <Badge style={{backgroundColor: color}}>
            <Text style={{ fontWeight: "bold", }}>{ans}</Text>
          </Badge>
        </View>

        <View style={styles.cardContainer}>
          <Card style={styles.card}>
            <CardItem header style={[styles.cardItem, styles.cardHeader]}>
              <H3 style={styles.h3}>BMI DATA</H3>
              <View style={styles.tr}>
                <Text style={styles.th}>BMI Range</Text>
                <Text style={styles.th}>Category</Text>
              </View>
            </CardItem>

            <CardItem header style={[styles.cardItem, styles.cardBody]}>
              <Body>
                <View style={styles.tbody}>
                  <View style={[styles.tr, styles.bellow16(ans)]}>
                    <Text style={styles.td}>Less than 16</Text>
                    <Text style={styles.td}>Severely Underweight</Text>
                  </View>
                </View>
                <View style={styles.tbody}>
                  <View style={[styles.tr, styles.from16To18(ans)]}>
                    <Text style={styles.td}>From 16 to 18.5</Text>
                    <Text style={styles.td}>Underweight</Text>
                  </View>
                  <View style={[styles.tr, styles.from18To25(ans)]}>
                    <Text style={styles.td}>From 18.5 to 25</Text>
                    <Text style={styles.td}>Normal</Text>
                  </View>
                  <View style={[styles.tr, styles.from25To30(ans)]}>
                    <Text style={styles.td}>From 25 to 30</Text>
                    <Text style={styles.td}>Overweight</Text>
                  </View>
                  <View style={[styles.tr, styles.above30(ans)]}>
                    <Text style={styles.td}>30 or above</Text>
                    <Text style={styles.td}>Obese class</Text>
                  </View>
                </View>
              </Body>
            </CardItem>
          </Card>

          <View style={[styles.formInline, styles.message]}>
            <Text style={styles.messageText(ans)}>{message}</Text>
          </View>
          <View style={styles.formInline}>
            <Button rounded info style={styles.btn}>
              <Icon style={styles.icon} name="arrowleft" type="AntDesign" />
              <Text onPress={() => navigation.goBack()}>GO BACK</Text>
            </Button>
          </View>
        </View>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  heading: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    padding: 10,
    borderWidth: 1,
    // width: 200,
    borderColor: DEFAULT_COLOR,
    borderRadius: 100,
  },
  headingText: {
    color: DEFAULT_COLOR,
  },
  thead: {},
  tbody: {
    overflow: "hidden",
    flex: 1,
  },
  formInline: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  btn: {
    marginTop: 20,
  },
  tr: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  th: {
    width: "50%",
    color: "white",
    textAlign: "center",
    borderWidth: 1,
    padding: 10,
    borderColor: DEFAULT_COLOR_DARK,
    borderRightWidth: 0.5,
    borderLeftWidth: 0.5,
  },
  td: {
    width: "50%",
    textAlign: "center",
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    borderColor: DEFAULT_COLOR_DARK,
    borderRightWidth: 0.5,
    borderLeftWidth: 0.5,
    borderTopWidth: 1,
    fontSize: 12,
    textTransform: "uppercase",
  },

  h3: {
    backgroundColor: DEFAULT_COLOR_DARK,
    color: "white",
    width: "100%",
    padding: 10,
    textAlign: "center",
  },
  cardContainer: {
    margin: 10,
  },
  card: {
    borderRadius: 10,
    overflow: "hidden",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 0.5,
    borderLeftWidth: 0.5,
    borderColor: DEFAULT_COLOR,
  },
  cardItem: {
    paddingBottom: 0,
    paddingRight: 0,
    paddingLeft: 0,
    paddingTop: 0,
    flex: 1,
    flexDirection: "column",
  },
  cardHeader: {
    backgroundColor: DEFAULT_COLOR,
  },
  icon: {
    marginRight: 0,
  },
  cardBody: {},
  bellow16: (ans) => {
    if (ans <= 16) {
      return {
        backgroundColor: DANGER_COLOR,
      };
    }
  },
  above30: (ans) => {
    if (ans > 30) {
      return {
        backgroundColor: DANGER_COLOR,
      };
    }
  },
  from16To18: (ans) => {
    if (ans > 16 && ans <= 18.5) {
      return {
        backgroundColor: WARNING_COLOR,
      };
    }
  },
  from18To25: (ans) => {
    if (ans > 18.5 && ans <= 25) {
      return {
        backgroundColor: SUCCESS_COLOR,
      };
    }
  },
  from25To30: (ans) => {
    if (ans > 25 && ans <= 30) {
      return {
        backgroundColor: WARNING_COLOR,
      };
    }
  },
  message: {
    marginTop: 20,
  },
  messageText: (ans) => {
    let color = SUCCESS_COLOR;
    if (ans <= 16 || ans > 30) {
      color = DANGER_COLOR;
    } else if ((ans > 16 && ans <= 18.5) || (ans > 25 && ans <= 30)) {
      color = WARNING_COLOR;
    }
    return {
      color,
    };
  },
});

export default DetailsScreen;
